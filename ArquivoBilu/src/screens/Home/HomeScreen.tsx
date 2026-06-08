import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { getAstronomyPicture } from "../../services/nasaApi";
import { Colors } from "../../theme/colors";
import { Apod } from "../../types/apod";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// ─── Dados dos destaques ─────────────────────────────────────────────────────

const FEATURED = [
  {
    id: "mars",
    screen: "Universo",
    label: "PLANETA EM DESTAQUE",
    name: "Marte",
    subtitle: "O Planeta Vermelho",
    image:
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=220&fit=crop&auto=format",
    accent: "#EF4444",
    badge: "Terrestre",
  },
  {
    id: "saturn",
    screen: "Universo",
    label: "PLANETA EM DESTAQUE",
    name: "Saturno",
    subtitle: "O Senhor dos Anéis",
    image:
      "https://images.unsplash.com/photo-1614728263952-84ea256f9d4d?w=400&h=220&fit=crop&auto=format",
    accent: "#D4A017",
    badge: "Gasoso",
  },
  {
    id: "andromeda",
    screen: "Universo",
    label: "GALÁXIA EM DESTAQUE",
    name: "Andrômeda",
    subtitle: "M31 • 2,5M Anos-Luz",
    image:
      "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400&h=220&fit=crop&auto=format",
    accent: "#A855F7",
    badge: "Galáxia Espiral",
  },
  {
    id: "betelgeuse",
    screen: "Universo",
    label: "ESTRELA EM DESTAQUE",
    name: "Betelgeuse",
    subtitle: "Alpha Orionis",
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=220&fit=crop&auto=format",
    accent: "#FB923C",
    badge: "Supergigante",
  },
];

const TRENDING = [
  { id: "kepler", name: "Kepler-452b", type: "Exoplaneta", emoji: "🌍", color: "#22C55E", screen: "Universo" },
  { id: "eagle", name: "Nebulosa da Águia", type: "Nebulosa", emoji: "🌫️", color: "#A855F7", screen: "Universo" },
  { id: "saturn", name: "Saturno", type: "Planeta", emoji: "🪐", color: "#D4A017", screen: "Universo" },
  { id: "sirius", name: "Sirius A", type: "Estrela", emoji: "⭐", color: "#DBEAFE", screen: "Universo" },
  { id: "whirlpool", name: "Galáxia do Redemoinho", type: "Galáxia", emoji: "🌌", color: "#6366F1", screen: "Universo" },
];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

function Star({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.9, duration: 1500 + delay * 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.15, duration: 1500 + delay * 300, useNativeDriver: true }),
      ])
    );
    const timeout = setTimeout(() => anim.start(), delay * 200);
    return () => { clearTimeout(timeout); anim.stop(); };
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#FFFFFF",
        opacity,
      }}
    />
  );
}

function StarField() {
  const stars = useRef(
    Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * SCREEN_WIDTH,
      y: Math.random() * 700,
      size: Math.random() * 1.8 + 0.4,
      delay: Math.random() * 5,
    }))
  ).current;

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {stars.map((s) => (
        <Star key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />
      ))}
    </View>
  );
}

function NeonBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 100,
        backgroundColor: accent + "22",
        borderWidth: 1,
        borderColor: accent + "66",
        marginBottom: 6,
      }}
    >
      <Text style={{ color: accent, fontSize: 9, fontWeight: "700", letterSpacing: 0.8 }}>
        {label}
      </Text>
    </View>
  );
}

function GlassCard({
  children,
  accent,
  onPress,
  style,
}: {
  children: React.ReactNode;
  accent?: string;
  onPress?: () => void;
  style?: object;
}) {
  const borderColor = accent ? accent + "33" : "rgba(255,255,255,0.1)";

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={onPress}
        style={[styles.glassCard, { borderColor }, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.glassCard, { borderColor }, style]}>
      {children}
    </View>
  );
}

function FeaturedCard({ item, onPress }: { item: typeof FEATURED[0]; onPress: () => void }) {
  return (
    <GlassCard onPress={onPress} style={{ width: 175, marginRight: 12 }}>
      <View style={{ height: 105, overflow: "hidden", borderRadius: 14 }}>
        <Image source={{ uri: item.image }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
        <LinearGradient
          colors={["transparent", "rgba(2,6,23,0.85)"]}
          style={StyleSheet.absoluteFillObject}
          locations={[0.4, 1]}
        />
        <View style={{ position: "absolute", top: 8, left: 8 }}>
          <NeonBadge label={item.badge} accent={item.accent} />
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{ color: item.accent, fontSize: 8, fontWeight: "700", letterSpacing: 1.2, marginBottom: 2 }}>
          {item.label}
        </Text>
        <Text style={{ color: Colors.text, fontSize: 14, fontWeight: "700", lineHeight: 18 }}>
          {item.name}
        </Text>
        <Text style={{ color: Colors.textSecondary, fontSize: 11, marginTop: 2 }}>
          {item.subtitle}
        </Text>
      </View>
    </GlassCard>
  );
}

function TrendingRow({ item, onPress, isLast }: { item: typeof TRENDING[0]; onPress: () => void; isLast: boolean }) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.trendRow}>
        <View style={[styles.trendIcon, { backgroundColor: item.color + "1A", borderColor: item.color + "33" }]}>
          <Text style={{ fontSize: 18 }}>{item.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ color: Colors.text, fontSize: 14, fontWeight: "600" }}>{item.name}</Text>
          <Text style={{ color: Colors.textSecondary, fontSize: 11 }}>{item.type}</Text>
        </View>
        <Text style={{ color: Colors.textSecondary, fontSize: 20, marginRight: 4 }}>›</Text>
      </TouchableOpacity>
      {!isLast && <View style={styles.trendDivider} />}
    </>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function HomeScreen() {
  const [apod, setApod] = useState<Apod | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  // Animação de entrada do conteúdo
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    loadApod();
  }, []);

  async function loadApod() {
    try {
      setLoading(true);
      const data = await getAstronomyPicture();
      setApod(data);
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    } catch {
      setError("Falha ao carregar dados da NASA.");
    } finally {
      setLoading(false);
    }
  }

  // ── Loading ──
  if (loading) {
    return (
      <View style={styles.centered}>
        <StarField />
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={{ color: Colors.textSecondary, marginTop: 12, fontSize: 12, letterSpacing: 1 }}>
          CONECTANDO À NASA...
        </Text>
      </View>
    );
  }

  // ── Erro ──
  if (error) {
    return (
      <View style={styles.centered}>
        <StarField />
        <Text style={{ fontSize: 36, marginBottom: 16 }}>🛸</Text>
        <Text style={{ color: Colors.text, fontSize: 16, fontWeight: "600", marginBottom: 8 }}>
          Sinal perdido
        </Text>
        <Text style={{ color: Colors.textSecondary, textAlign: "center", lineHeight: 20 }}>
          {error}
        </Text>
        <TouchableOpacity onPress={loadApod} style={styles.retryBtn}>
          <Text style={{ color: Colors.biluGreen, fontWeight: "700", fontSize: 13, letterSpacing: 0.5 }}>
            TENTAR NOVAMENTE
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isVideo = apod?.media_type === "video";
  const today = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <View style={styles.root}>
      <StarField />

      {/* Glows de ambiente */}
      <View style={[styles.glowOrb, { top: -60, right: -80, width: 280, height: 280, backgroundColor: Colors.cosmicBlue + "10" }]} />
      <View style={[styles.glowOrb, { bottom: 120, left: -80, width: 200, height: 200, backgroundColor: Colors.nebulaPurple + "0D" }]} />

      <Animated.ScrollView
        style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* ── Cabeçalho ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.stardate}>STARDATE {new Date().toISOString().slice(0, 10).replace(/-/g, ".")}</Text>
            <Text style={styles.appTitle}>ARQUIVO BILU</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Text style={{ fontSize: 18 }}>🔍</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero: Foto Astronômica do Dia ── */}
        <View style={{ marginHorizontal: 16, marginBottom: 16 }}>
          <GlassCard accent={Colors.cosmicBlue}>
            <View style={{ height: 200, overflow: "hidden", borderRadius: 14 }}>
              {!isVideo ? (
                <Image
                  source={{ uri: apod?.url }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.videoPlaceholder]}>
                  <Text style={{ fontSize: 40 }}>🎬</Text>
                  <Text style={{ color: Colors.textSecondary, marginTop: 8, fontSize: 12 }}>
                    Vídeo disponível
                  </Text>
                </View>
              )}
              <LinearGradient
                colors={["transparent", "rgba(2,6,23,0.6)", "rgba(2,6,23,0.97)"]}
                style={StyleSheet.absoluteFillObject}
                locations={[0.2, 0.6, 1]}
              />
              <View style={styles.heroText}>
                <NeonBadge label="FOTO ASTRONÔMICA DO DIA" accent={Colors.cosmicBlue} />
                <Text style={styles.heroTitle} numberOfLines={2}>
                  {apod?.title}
                </Text>
                <Text style={styles.heroDate}>{today}</Text>
              </View>
            </View>
          </GlassCard>
        </View>

        {/* ── Seção: Destaques ── */}
        <View style={{ marginBottom: 20 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.biluGreen }]}>✦ DESTAQUES</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 4 }}
          >
            {FEATURED.map((item) => (
              <FeaturedCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate(item.screen as never)}
              />
            ))}
          </ScrollView>
        </View>

        {/* ── Seção: Em alta ── */}
        <View style={{ marginHorizontal: 16, marginBottom: 20 }}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.cosmicBlue }]}>✦ EM ALTA AGORA</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Universo" as never)}>
              <Text style={{ color: Colors.cosmicBlue, fontSize: 12 }}>Ver tudo →</Text>
            </TouchableOpacity>
          </View>
          <GlassCard>
            {TRENDING.map((item, i) => (
              <TrendingRow
                key={item.id}
                item={item}
                onPress={() => navigation.navigate(item.screen as never)}
                isLast={i === TRENDING.length - 1}
              />
            ))}
          </GlassCard>
        </View>

        {/* ── CTA: Arquivo OVNI ── */}
        <View style={{ marginHorizontal: 16 }}>
          <GlassCard accent={Colors.biluGreen} onPress={() => navigation.navigate("Arquivos" as never)}>
            <View style={styles.ctaInner}>
              <View style={styles.ctaIcon}>
                <Text style={{ fontSize: 26 }}>📡</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.ctaTitle, { color: Colors.biluGreen }]}>ARQUIVO OVNI</Text>
                <Text style={styles.ctaSubtitle}>Casos documentados de UAPs</Text>
              </View>
              <Text style={{ color: Colors.biluGreen, fontSize: 22 }}>›</Text>
            </View>
          </GlassCard>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  glowOrb: {
    position: "absolute",
    borderRadius: 999,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
  },
  stardate: {
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  appTitle: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: 2,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.cosmicBlue + "1E",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "40",
    alignItems: "center",
    justifyContent: "center",
  },

  // Glass card
  glassCard: {
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  // Hero
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(2,6,23,0.45)",
  },
  heroText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    paddingBottom: 16,
  },
  heroTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  heroDate: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  videoPlaceholder: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  // Sections
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.8,
  },

  // Trending
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
  },
  trendIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  trendDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 12,
  },

  // CTA
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    backgroundColor: "rgba(0,255,157,0.06)",
  },
  ctaIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.biluGreen + "22",
    borderWidth: 1,
    borderColor: Colors.biluGreen + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  ctaTitle: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
  },
  ctaSubtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },

  // Retry
  retryBtn: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "66",
    backgroundColor: Colors.biluGreen + "15",
  },
});