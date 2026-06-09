import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import type { Star } from "../../services/solarSystemApi";

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, unit, accent }: { label: string; value: string | number; unit?: string; accent: string }) {
  return (
    <View style={[styles.statCard, { borderColor: accent + "25" }]}>
      <Text style={[styles.statValue, { color: accent }]}>
        {value ?? "—"}
        {unit ? <Text style={styles.statUnit}> {unit}</Text> : null}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Barra de comparação com o Sol ────────────────────────────────────────────

function SolarCompareBar({
  label,
  value,
  max,
  unit,
  accent,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  accent: string;
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const percent = Math.min((value / max) * 100, 100);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percent,
      duration: 900,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.compareRow}>
      <View style={styles.compareHeader}>
        <Text style={styles.compareLabel}>{label}</Text>
        <Text style={[styles.compareValue, { color: accent }]}>
          {value >= 1000
            ? value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })
            : value}
          {" "}{unit}
        </Text>
      </View>
      <View style={styles.compareTrack}>
        <Animated.View
          style={[
            styles.compareFill,
            {
              backgroundColor: accent,
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        {/* Marcador do Sol */}
        <View style={[styles.solarMarker, { left: `${Math.min((1 / max) * 100, 100)}%` as any }]} />
      </View>
      <Text style={styles.compareHint}>☀️ = referência solar</Text>
    </View>
  );
}

// ─── Pulsação do hero ─────────────────────────────────────────────────────────

function StarHero({ star }: { star: Star }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0.15)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.06, duration: 2200, useNativeDriver: true }),
          Animated.timing(glowAnim,  { toValue: 0.32, duration: 2200, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.0, duration: 2200, useNativeDriver: true }),
          Animated.timing(glowAnim,  { toValue: 0.15, duration: 2200, useNativeDriver: false }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.heroSection}>
      {/* Glow externo animado */}
      <Animated.View style={[styles.heroGlow, { backgroundColor: star.accent, opacity: glowAnim }]} />

      {/* Emoji da estrela com pulso */}
      <Animated.View style={[styles.heroOrb, { borderColor: star.accent + "55", transform: [{ scale: pulseAnim }] }]}>
        <Text style={styles.heroEmoji}>{star.emoji}</Text>
      </Animated.View>

      {/* Badge de classe */}
      <View style={[styles.classBadge, { backgroundColor: star.accent + "1A", borderColor: star.accent + "44" }]}>
        <Text style={[styles.classBadgeText, { color: star.accent }]}>{star.starClass}</Text>
      </View>

      <Text style={styles.starName}>{star.name}</Text>
      <Text style={styles.constellation}>✦ {star.constellation} · {star.spectralType}</Text>
      <Text style={styles.description}>{star.description}</Text>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function StarDetailsScreen({ route }: any) {
  const { star }: { star: Star } = route.params;
  const navigation = useNavigation();
  const insets     = useSafeAreaInsets();

  const distanceDisplay =
    star.distanceLy < 1
      ? `${(star.distanceLy * 63241).toFixed(0)} UA`
      : star.distanceLy >= 1000
      ? `${(star.distanceLy / 1000).toFixed(2)} kly`
      : `${star.distanceLy} al`;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>ESTRELAS</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <StarHero star={star} />

        {/* Grid de stats */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>CARACTERÍSTICAS</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Temperatura" value={star.surfaceTemp.toLocaleString("pt-BR")} unit="K" accent={star.accent} />
          <StatCard label="Distância" value={distanceDisplay} accent={star.accent} />
          <StatCard label="Mag. Absoluta" value={star.absoluteMag} accent={star.accent} />
        </View>
        <View style={styles.statsGrid}>
          <StatCard label="Massa" value={star.mass} unit="M☉" accent={star.accent} />
          <StatCard label="Raio" value={star.radius} unit="R☉" accent={star.accent} />
          {star.age != null
            ? <StatCard label="Idade" value={star.age} unit="Ga" accent={star.accent} />
            : <StatCard label="Luminosidade" value={star.luminosity.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} unit="L☉" accent={star.accent} />
          }
        </View>

        {/* Comparação com o Sol */}
        {star.id !== "sun" && (
          <>
            <Text style={[styles.sectionTitle, { color: star.accent }]}>COMPARAÇÃO COM O SOL</Text>
            <View style={[styles.compareCard, { borderColor: star.accent + "25" }]}>
              <SolarCompareBar
                label="Raio"
                value={star.radius}
                max={Math.max(star.radius * 1.2, 2)}
                unit="R☉"
                accent={star.accent}
              />
              <View style={styles.compareDivider} />
              <SolarCompareBar
                label="Massa"
                value={star.mass}
                max={Math.max(star.mass * 1.2, 2)}
                unit="M☉"
                accent={star.accent}
              />
              <View style={styles.compareDivider} />
              <SolarCompareBar
                label="Luminosidade"
                value={star.luminosity}
                max={Math.max(star.luminosity * 1.1, 2)}
                unit="L☉"
                accent={star.accent}
              />
            </View>
          </>
        )}

        {/* Curiosidade */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>CURIOSIDADE</Text>
        <View style={[styles.curiosityCard, { borderColor: star.accent + "30", borderLeftColor: star.accent }]}>
          <Text style={styles.curiosityEmoji}>💡</Text>
          <Text style={styles.curiosityText}>{star.curiosity}</Text>
        </View>

        {/* Info orbital */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>DADOS ESTELARES</Text>
        <View style={[styles.infoCard, { borderColor: star.accent + "25" }]}>
          {[
            { label: "Tipo Espectral",    value: star.spectralType },
            { label: "Classe Estelar",    value: star.starClass },
            { label: "Constelação",       value: star.constellation },
            { label: "Temperatura",       value: `${star.surfaceTemp.toLocaleString("pt-BR")} K` },
            { label: "Distância da Terra", value: distanceDisplay },
            ...(star.age != null ? [{ label: "Idade", value: `${star.age} bilhões de anos` }] : []),
          ].map((row, i) => (
            <View
              key={row.label}
              style={[styles.infoRow, i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" }]}
            >
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },

  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  headerLabel: { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.textSecondary, letterSpacing: 2 },

  // Hero
  heroSection: { alignItems: "center", paddingVertical: 32, gap: 12, position: "relative" },
  heroGlow:    { position: "absolute", top: 20, width: 200, height: 200, borderRadius: 100, transform: [{ scale: 1.5 }] },
  heroOrb:     {
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: "rgba(30,41,59,0.6)",
    borderWidth: 1.5,
    alignItems: "center", justifyContent: "center",
  },
  heroEmoji:   { fontSize: 72 },
  classBadge:  { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 100, borderWidth: 1 },
  classBadgeText: { fontFamily: Fonts.spaceGroteskBold, fontSize: 11, letterSpacing: 0.8 },
  starName:    { fontFamily: Fonts.orbitron, fontSize: 30, color: Colors.text, letterSpacing: 1, textAlign: "center" },
  constellation: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary, letterSpacing: 0.5 },
  description: { fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 4 },

  sectionTitle: { fontFamily: Fonts.orbitron, fontSize: 10, letterSpacing: 2.5, marginBottom: 12, marginTop: 16 },

  // Stats
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  statCard:  { flex: 1, minWidth: "28%", backgroundColor: "rgba(30,41,59,0.55)", borderRadius: 14, borderWidth: 1, padding: 14, gap: 4 },
  statValue: { fontFamily: Fonts.orbitron, fontSize: 15, fontWeight: "700" },
  statUnit:  { fontFamily: Fonts.spaceGrotesk, fontSize: 10, color: Colors.textSecondary },
  statLabel: { fontFamily: Fonts.spaceGrotesk, fontSize: 11, color: Colors.textSecondary },

  // Comparação
  compareCard: { backgroundColor: "rgba(30,41,59,0.55)", borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 4, gap: 14 },
  compareRow:  { gap: 6 },
  compareHeader: { flexDirection: "row", justifyContent: "space-between" },
  compareLabel:  { fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary },
  compareValue:  { fontFamily: Fonts.spaceGroteskBold, fontSize: 12 },
  compareTrack:  { height: 6, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "visible", position: "relative" },
  compareFill:   { height: "100%", borderRadius: 3 },
  solarMarker:   { position: "absolute", top: -3, width: 2, height: 12, backgroundColor: "rgba(255,255,255,0.4)", borderRadius: 1 },
  compareHint:   { fontFamily: Fonts.spaceGrotesk, fontSize: 10, color: Colors.textSecondary, opacity: 0.5 },
  compareDivider:{ height: 1, backgroundColor: "rgba(255,255,255,0.05)" },

  // Curiosidade
  curiosityCard: {
    flexDirection: "row", gap: 12, alignItems: "flex-start",
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 14, borderWidth: 1,
    borderLeftWidth: 3, padding: 16, marginBottom: 4,
  },
  curiosityEmoji: { fontSize: 20, marginTop: 1 },
  curiosityText:  { flex: 1, fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.text, lineHeight: 22 },

  // Info card
  infoCard: { backgroundColor: "rgba(30,41,59,0.55)", borderRadius: 14, borderWidth: 1, marginBottom: 24, overflow: "hidden" },
  infoRow:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  infoLabel:{ fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary },
  infoValue:{ fontFamily: Fonts.spaceGroteskBold, fontSize: 13, color: Colors.text },
});