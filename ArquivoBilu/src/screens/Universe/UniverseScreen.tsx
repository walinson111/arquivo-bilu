import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { getBodies } from "../../services/solarSystemApi";

// ─── Dados visuais dos planetas ───────────────────────────────────────────────

const PLANET_VISUALS: Record<string, { emoji: string; accent: string; label: string }> = {
  mercury:  { emoji: "☿",  accent: "#94A3B8", label: "Rochoso"   },
  venus:    { emoji: "♀",  accent: "#D4A017", label: "Nublado"   },
  earth:    { emoji: "🌍", accent: "#22C55E", label: "Habitável" },
  mars:     { emoji: "🔴", accent: "#EF4444", label: "Desértico" },
  jupiter:  { emoji: "🪐", accent: "#FB923C", label: "Gasoso"    },
  saturn:   { emoji: "💫", accent: "#D4A017", label: "Anelado"   },
  uranus:   { emoji: "🔵", accent: "#38BDF8", label: "Gelado"    },
  neptune:  { emoji: "🌊", accent: "#6366F1", label: "Gelado"    },
};

function getPlanetVisual(id: string) {
  return PLANET_VISUALS[id.toLowerCase()] ?? { emoji: "🪐", accent: Colors.nebulaPurple, label: "Planeta" };
}

// ─── Card do Sistema Solar 3D ─────────────────────────────────────────────────

function SolarSystemCard({ onPress }: { onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.96)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, speed: 14, bounciness: 6, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.solarCard, { opacity: pressed ? 0.88 : 1 }]}
        android_ripple={{ color: Colors.cosmicBlue + "22" }}
      >
        {/* Fundo decorativo com planetas em miniatura */}
        <View style={styles.solarCardBg} pointerEvents="none">
          {["🪐", "🌍", "🔴", "🌊"].map((emoji, i) => (
            <Text
              key={i}
              style={[
                styles.bgEmoji,
                { right: 12 + i * 30, top: 8 + (i % 2) * 14, opacity: 0.18 + i * 0.06, fontSize: 28 - i * 3 },
              ]}
            >
              {emoji}
            </Text>
          ))}
        </View>

        <View style={styles.solarCardContent}>
          {/* Ícone e badge */}
          <View style={styles.solarCardLeft}>
            <View style={styles.solarIconWrap}>
              <Text style={styles.solarIcon}>🌌</Text>
            </View>
            <View style={styles.solarBadge}>
              <Text style={styles.solarBadgeText}>3D</Text>
            </View>
          </View>

          {/* Texto */}
          <View style={styles.solarCardBody}>
            <Text style={styles.solarTitle}>Sistema Solar</Text>
            <Text style={styles.solarSub}>
              Explore os planetas em visualização tridimensional interativa
            </Text>
          </View>

          {/* Seta */}
          <View style={styles.solarArrowWrap}>
            <Ionicons name="chevron-forward" size={20} color={Colors.cosmicBlue} />
          </View>
        </View>

        {/* Linha de brilho inferior */}
        <View style={styles.solarGlowLine} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Card de planeta ──────────────────────────────────────────────────────────

function PlanetCard({ item, index, onPress }: { item: any; index: number; onPress: () => void }) {
  const visual = getPlanetVisual(item.id);
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const gravityPercent = Math.min(Math.round((item.gravity / 25) * 100), 100);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, { borderColor: visual.accent + "30", opacity: pressed ? 0.85 : 1 }]}
        android_ripple={{ color: visual.accent + "22" }}
      >
        {/* Emoji e nome */}
        <View style={styles.cardLeft}>
          <View style={[styles.emojiWrap, { backgroundColor: visual.accent + "18", borderColor: visual.accent + "33" }]}>
            <Text style={styles.emoji}>{visual.emoji}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.planetName}>{item.englishName}</Text>
            <View style={[styles.badge, { backgroundColor: visual.accent + "1A", borderColor: visual.accent + "44" }]}>
              <Text style={[styles.badgeText, { color: visual.accent }]}>{visual.label}</Text>
            </View>
          </View>

          {/* Barra de gravidade */}
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Gravidade</Text>
            <Text style={[styles.statValue, { color: visual.accent }]}>
              {item.gravity ?? "—"} m/s²
            </Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${gravityPercent}%` as any, backgroundColor: visual.accent }]} />
          </View>
        </View>

        {/* Seta */}
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ alignSelf: "center" }} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function UniverseScreen() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const navigation = useNavigation<any>();

  async function loadPlanets() {
    try {
      setLoading(true);
      setError(false);
      const bodies = await getBodies();
      const onlyPlanets = bodies.filter((b: any) => b.isPlanet);
      const ORDER = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
      onlyPlanets.sort((a: any, b: any) => {
        const ai = ORDER.indexOf(a.id.toLowerCase());
        const bi = ORDER.indexOf(b.id.toLowerCase());
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      setPlanets(onlyPlanets);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPlanets(); }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={styles.loadingText}>MAPEANDO PLANETAS...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>🛸</Text>
        <Text style={styles.errorTitle}>Sinal perdido</Text>
        <Pressable onPress={loadPlanets} style={styles.retryBtn}>
          <Text style={styles.retryText}>TENTAR NOVAMENTE</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerLabel}>EXPLORADOR</Text>
              <Text style={styles.headerTitle}>Universo</Text>
              <Text style={styles.headerSub}>{planets.length} planetas mapeados</Text>
            </View>

            {/* Card Sistema Solar 3D */}
            <SolarSystemCard
              onPress={() => navigation.navigate("SolarSystem")}
            />

            {/* Divisor de seção */}
            <View style={styles.sectionDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>PLANETAS</Text>
              <View style={styles.dividerLine} />
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <PlanetCard
            item={item}
            index={index}
            onPress={() => navigation.navigate("PlanetDetails", { planet: item })}
          />
        )}
      />
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 28,
    color: Colors.text,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // ─ Card Sistema Solar ─
  solarCard: {
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "40",
    backgroundColor: "rgba(14, 28, 54, 0.70)",
    overflow: "hidden",
  },
  solarCardBg: {
    ...StyleSheet.absoluteFillObject,
  },
  bgEmoji: {
    position: "absolute",
  },
  solarCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },
  solarCardLeft: {
    alignItems: "center",
    gap: 6,
  },
  solarIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.cosmicBlue + "18",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "35",
    alignItems: "center",
    justifyContent: "center",
  },
  solarIcon: {
    fontSize: 28,
  },
  solarBadge: {
    backgroundColor: Colors.cosmicBlue + "20",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "55",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  solarBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.cosmicBlue,
    letterSpacing: 1.5,
  },
  solarCardBody: {
    flex: 1,
    gap: 4,
  },
  solarTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  solarSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  solarArrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.cosmicBlue + "15",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "30",
    alignItems: "center",
    justifyContent: "center",
  },
  solarGlowLine: {
    height: 1,
    backgroundColor: Colors.cosmicBlue,
    opacity: 0.18,
  },

  // ─ Divisor ─
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  dividerText: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // Lista
  list: {
    paddingBottom: 32,
  },

  // Card planeta
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  cardLeft: {
    flexShrink: 0,
  },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  planetName: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 15,
    color: Colors.text,
    letterSpacing: 0.5,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },

  // Barra de gravidade
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statValue: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
  },
  barTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
  },

  // Loading / erro
  loadingText: {
    fontFamily: Fonts.orbitron,
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 14,
  },
  errorTitle: {
    fontFamily: Fonts.orbitron,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 20,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "66",
    backgroundColor: Colors.biluGreen + "15",
  },
  retryText: {
    fontFamily: Fonts.orbitron,
    color: Colors.biluGreen,
    fontSize: 11,
    letterSpacing: 1,
  },
});