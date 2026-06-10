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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { navigate } from "../../navigation/navigationRef";
import { getAstronomyPicture } from "../../services/nasaApi";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import type { Apod } from "../../types/apod";
import { FEATURED_HOME as FEATURED, TRENDING_HOME as TRENDING } from "../../constants/homeData";

const { width: SCREEN_W } = Dimensions.get("window");

// ─── Campo de estrelas ────────────────────────────────────────────────────────

function BlinkingStar({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0.15)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.9, duration: 1500 + delay * 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.15, duration: 1500 + delay * 300, useNativeDriver: true }),
      ])
    );
    const t = setTimeout(() => anim.start(), delay * 200);
    return () => { clearTimeout(t); anim.stop(); };
  }, []);
  return <Animated.View style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: size / 2, backgroundColor: "#FFF", opacity }} />;
}

function StarField() {
  const stars = useRef(Array.from({ length: 55 }, (_, i) => ({ id: i, x: Math.random() * SCREEN_W, y: Math.random() * 700, size: Math.random() * 1.8 + 0.4, delay: Math.random() * 5 }))).current;
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {stars.map(s => <BlinkingStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
    </View>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function FeaturedCard({ item, onPress }: { item: typeof FEATURED[0]; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.featuredCard, { borderColor: item.accent + "33", opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.featuredImgWrap}>
        <Image source={{ uri: item.image }} style={styles.featuredImg} resizeMode="cover" />
        <LinearGradient colors={["transparent", "rgba(2,6,23,0.92)"]} style={StyleSheet.absoluteFillObject} locations={[0.35, 1]} />
        <View style={[styles.featuredBadge, { backgroundColor: item.accent + "22", borderColor: item.accent + "55" }]}>
          <Text style={[styles.featuredBadgeText, { color: item.accent }]}>{item.badge}</Text>
        </View>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={[styles.featuredLabel, { color: item.accent }]}>{item.label}</Text>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredSub}>{item.subtitle}</Text>
      </View>
    </Pressable>
  );
}

function TrendingRow({ item, onPress, isLast }: { item: typeof TRENDING[0]; onPress: () => void; isLast: boolean }) {
  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.trendRow, { opacity: pressed ? 0.75 : 1 }]}>
        <View style={[styles.trendIcon, { backgroundColor: item.accent + "18", borderColor: item.accent + "30" }]}>
          <Text style={styles.trendEmoji}>{item.emoji}</Text>
        </View>
        <View style={styles.trendText}>
          <Text style={styles.trendName}>{item.name}</Text>
          <Text style={styles.trendType}>{item.type}</Text>
        </View>
        <Text style={styles.trendArrow}>›</Text>
      </Pressable>
      {!isLast && <View style={styles.trendDivider} />}
    </>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function HomeScreen() {
  const [apod,         setApod]         = useState<Apod | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [apodExpanded, setApodExpanded] = useState(false);
  const insets   = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim= useRef(new Animated.Value(20)).current;

  useEffect(() => { loadApod(); }, []);

  async function loadApod() {
    try {
      setLoading(true); setError("");
      const data = await getAstronomyPicture();
      setApod(data);
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    } catch {
      setError("Falha ao conectar com a NASA.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <StarField />
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={styles.loadingText}>CONECTANDO À NASA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <StarField />
        <Text style={{ fontSize: 36, marginBottom: 16 }}>🛸</Text>
        <Text style={styles.errorTitle}>Sinal perdido</Text>
        <Text style={styles.errorSub}>{error}</Text>
        <Pressable onPress={loadApod} style={styles.retryBtn}>
          <Text style={styles.retryText}>TENTAR NOVAMENTE</Text>
        </Pressable>
      </View>
    );
  }

  const isVideo  = apod?.media_type === "video";
  const today    = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const stardate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StarField />
      <View style={[styles.glowOrb, { top: -60, right: -80, width: 280, height: 280, backgroundColor: Colors.cosmicBlue + "0F" }]} />
      <View style={[styles.glowOrb, { bottom: 120, left: -80, width: 200, height: 200, backgroundColor: Colors.nebulaPurple + "0C" }]} />

      <Animated.ScrollView
        style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.stardate}>STARDATE {stardate}</Text>
            <Text style={styles.appTitle}>ARQUIVO BILU</Text>
          </View>
          <View style={styles.headerBadge}>
            <View style={styles.headerDot} />
            <Text style={styles.headerBadgeText}>AO VIVO</Text>
          </View>
        </View>

        {/* APOD */}
        <View style={styles.apodWrap}>
          <View style={[styles.apodCard, { borderColor: Colors.cosmicBlue + "33" }]}>
            <View style={styles.apodImgWrap}>
              {!isVideo ? (
                <Image source={{ uri: apod?.url }} style={styles.apodImg} resizeMode="cover" />
              ) : (
                <View style={styles.apodVideoPlaceholder}>
                  <Text style={{ fontSize: 40 }}>🎬</Text>
                  <Text style={styles.apodVideoText}>Vídeo NASA disponível</Text>
                </View>
              )}
              <LinearGradient colors={["transparent", "rgba(2,6,23,0.6)", "rgba(2,6,23,0.97)"]} style={StyleSheet.absoluteFillObject} locations={[0.2, 0.6, 1]} />
              <View style={styles.apodBadge}>
                <View style={styles.apodBadgeDot} />
                <Text style={styles.apodBadgeText}>FOTO ASTRONÔMICA DO DIA</Text>
              </View>
              <View style={styles.apodOverlay}>
                <Text style={styles.apodTitle} numberOfLines={2}>{apod?.title}</Text>
                <Text style={styles.apodDate}>{today}</Text>
              </View>
            </View>
            {apod?.explanation && (
              <Pressable onPress={() => setApodExpanded(v => !v)} style={styles.apodExplanation}>
                <Text style={styles.apodExplanationText} numberOfLines={apodExpanded ? undefined : 3}>{apod.explanation}</Text>
                <Text style={[styles.apodExpandBtn, { color: Colors.cosmicBlue }]}>{apodExpanded ? "Mostrar menos ↑" : "Ler mais ↓"}</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Destaques */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.biluGreen }]}>✦ DESTAQUES</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
            {FEATURED.map(item => (
              <FeaturedCard key={item.id} item={item} onPress={() => navigate(item.screen, item.params)} />
            ))}
          </ScrollView>
        </View>

        {/* Em Alta */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: Colors.cosmicBlue }]}>✦ EM ALTA AGORA</Text>
            <Pressable onPress={() => navigate("Tabs", { screen: "Universo" })}>
              <Text style={styles.seeAll}>Ver tudo →</Text>
            </Pressable>
          </View>
          <View style={[styles.card, { borderColor: "rgba(255,255,255,0.08)" }]}>
            {TRENDING.map((item, i) => (
              <TrendingRow key={item.id} item={item} onPress={() => navigate(item.screen, item.params)} isLast={i === TRENDING.length - 1} />
            ))}
          </View>
        </View>

        {/* CTA Arquivos */}
        <View style={styles.sectionWrap}>
          <Pressable onPress={() => navigate("Tabs", { screen: "Arquivos" })} style={({ pressed }) => [styles.ctaCard, { opacity: pressed ? 0.85 : 1 }]}>
            <View style={styles.ctaGlow} />
            <View style={styles.ctaContent}>
              <View style={styles.ctaLeft}>
                <Text style={styles.ctaEmoji}>👽</Text>
              </View>
              <View style={styles.ctaText}>
                <Text style={styles.ctaEyebrow}>CASOS DOCUMENTADOS</Text>
                <Text style={styles.ctaTitle}>Arquivos Alienígenas</Text>
                <Text style={styles.ctaSub}>7 casos reais · 2 classificados</Text>
              </View>
              <View style={styles.ctaArrow}>
                <Text style={[styles.ctaArrowText, { color: Colors.biluGreen }]}>›</Text>
              </View>
            </View>
            <View style={styles.ctaGlowLine} />
          </Pressable>
        </View>

      </Animated.ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:     { flex: 1, backgroundColor: Colors.background },
  centered: { flex: 1, backgroundColor: Colors.background, justifyContent: "center", alignItems: "center", padding: 24 },
  glowOrb:  { position: "absolute", borderRadius: 999 },

  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 },
  stardate:        { fontFamily: Fonts.orbitron, color: Colors.textSecondary, fontSize: 9, letterSpacing: 1.5, marginBottom: 4 },
  appTitle:        { fontFamily: Fonts.orbitron, color: Colors.text, fontSize: 22, letterSpacing: 2 },
  headerBadge:     { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: Colors.biluGreen + "40", backgroundColor: Colors.biluGreen + "10" },
  headerDot:       { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.biluGreen },
  headerBadgeText: { fontFamily: Fonts.orbitron, fontSize: 8, color: Colors.biluGreen, letterSpacing: 1.5 },

  apodWrap:            { marginHorizontal: 16, marginBottom: 8 },
  apodCard:            { borderRadius: 18, borderWidth: 1, backgroundColor: "rgba(30,41,59,0.55)", overflow: "hidden" },
  apodImgWrap:         { height: 210, position: "relative" },
  apodImg:             { width: "100%", height: "100%" },
  apodVideoPlaceholder:{ flex: 1, backgroundColor: Colors.surface, alignItems: "center", justifyContent: "center", gap: 8 },
  apodVideoText:       { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 13 },
  apodBadge:           { position: "absolute", top: 12, left: 12, flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 100, borderWidth: 1, borderColor: Colors.cosmicBlue + "55", backgroundColor: "rgba(2,6,23,0.65)" },
  apodBadgeDot:        { width: 5, height: 5, borderRadius: 3, backgroundColor: Colors.cosmicBlue },
  apodBadgeText:       { fontFamily: Fonts.orbitron, fontSize: 7, color: Colors.cosmicBlue, letterSpacing: 1.5 },
  apodOverlay:         { position: "absolute", bottom: 0, left: 0, right: 0, padding: 14 },
  apodTitle:           { fontFamily: Fonts.orbitronBlack, color: Colors.text, fontSize: 15, lineHeight: 22, marginBottom: 4 },
  apodDate:            { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 11 },
  apodExplanation:     { padding: 14, paddingTop: 12, gap: 8 },
  apodExplanationText: { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 13, lineHeight: 20 },
  apodExpandBtn:       { fontFamily: Fonts.spaceGroteskMedium, fontSize: 12 },

  sectionWrap:   { marginBottom: 20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, marginBottom: 12 },
  sectionTitle:  { fontFamily: Fonts.orbitron, fontSize: 10, letterSpacing: 2 },
  seeAll:        { fontFamily: Fonts.spaceGroteskMedium, color: Colors.cosmicBlue, fontSize: 12 },

  featuredScroll:    { paddingLeft: 16, paddingRight: 4 },
  featuredCard:      { width: 170, marginRight: 12, borderRadius: 16, borderWidth: 1, backgroundColor: "rgba(30,41,59,0.55)", overflow: "hidden" },
  featuredImgWrap:   { height: 105, position: "relative" },
  featuredImg:       { width: "100%", height: "100%" },
  featuredBadge:     { position: "absolute", top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 100, borderWidth: 1 },
  featuredBadgeText: { fontFamily: Fonts.orbitron, fontSize: 7, letterSpacing: 0.8 },
  featuredInfo:      { padding: 10, gap: 2 },
  featuredLabel:     { fontFamily: Fonts.orbitron, fontSize: 8, letterSpacing: 1.2 },
  featuredName:      { fontFamily: Fonts.orbitronBlack, color: Colors.text, fontSize: 14, lineHeight: 18 },
  featuredSub:       { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 11 },

  card:        { marginHorizontal: 16, backgroundColor: "rgba(30,41,59,0.55)", borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  trendRow:    { flexDirection: "row", alignItems: "center", gap: 12, padding: 13 },
  trendIcon:   { width: 40, height: 40, borderRadius: 12, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  trendEmoji:  { fontSize: 18 },
  trendText:   { flex: 1, gap: 2 },
  trendName:   { fontFamily: Fonts.spaceGroteskBold, color: Colors.text, fontSize: 14 },
  trendType:   { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 11 },
  trendArrow:  { color: Colors.textSecondary, fontSize: 22 },
  trendDivider:{ height: 1, backgroundColor: "rgba(255,255,255,0.05)", marginHorizontal: 13 },

  ctaCard:     { marginHorizontal: 16, borderRadius: 18, borderWidth: 1, borderColor: Colors.biluGreen + "35", backgroundColor: "rgba(15,23,42,0.9)", overflow: "hidden" },
  ctaGlow:     { position: "absolute", top: -40, left: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: Colors.biluGreen, opacity: 0.06 },
  ctaContent:  { flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  ctaLeft:     { width: 56, height: 56, borderRadius: 16, backgroundColor: Colors.biluGreen + "15", borderWidth: 1, borderColor: Colors.biluGreen + "30", alignItems: "center", justifyContent: "center" },
  ctaEmoji:    { fontSize: 28 },
  ctaText:     { flex: 1, gap: 3 },
  ctaEyebrow:  { fontFamily: Fonts.orbitron, fontSize: 8, color: Colors.biluGreen, letterSpacing: 2 },
  ctaTitle:    { fontFamily: Fonts.orbitronBlack, color: Colors.text, fontSize: 15, letterSpacing: 0.3 },
  ctaSub:      { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, fontSize: 12 },
  ctaArrow:    { width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.biluGreen + "12", borderWidth: 1, borderColor: Colors.biluGreen + "28", alignItems: "center", justifyContent: "center" },
  ctaArrowText:{ fontSize: 22, lineHeight: 26 },
  ctaGlowLine: { height: 1, backgroundColor: Colors.biluGreen, opacity: 0.15 },

  loadingText: { fontFamily: Fonts.orbitron, color: Colors.textSecondary, fontSize: 10, letterSpacing: 2, marginTop: 14 },
  errorTitle:  { fontFamily: Fonts.orbitron, color: Colors.text, fontSize: 16, marginBottom: 8 },
  errorSub:    { fontFamily: Fonts.spaceGrotesk, color: Colors.textSecondary, textAlign: "center", lineHeight: 20, marginBottom: 24 },
  retryBtn:    { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: Colors.biluGreen + "66", backgroundColor: Colors.biluGreen + "15" },
  retryText:   { fontFamily: Fonts.orbitron, color: Colors.biluGreen, fontSize: 11, letterSpacing: 1 },
});