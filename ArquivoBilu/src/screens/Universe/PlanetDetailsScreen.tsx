import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

// ─── Dados visuais ────────────────────────────────────────────────────────────

const PLANET_VISUALS: Record<string, { emoji: string; accent: string; label: string; description: string }> = {
  mercury: { emoji: "☿",  accent: "#94A3B8", label: "Rochoso",   description: "O menor planeta do Sistema Solar e o mais próximo do Sol. Suas temperaturas variam de -180°C a 430°C." },
  venus:   { emoji: "♀",  accent: "#D4A017", label: "Nublado",   description: "O planeta mais quente do Sistema Solar, com atmosfera densa de CO₂ e chuvas de ácido sulfúrico." },
  earth:   { emoji: "🌍", accent: "#22C55E", label: "Habitável", description: "Nosso lar. O único planeta conhecido a abrigar vida, com água líquida na superfície e atmosfera protetora." },
  mars:    { emoji: "🔴", accent: "#EF4444", label: "Desértico", description: "O Planeta Vermelho. Com vulcões extintos e vales imensos, é o principal candidato à colonização humana." },
  jupiter: { emoji: "🪐", accent: "#FB923C", label: "Gasoso",    description: "O maior planeta do Sistema Solar. Sua Grande Mancha Vermelha é uma tempestade que dura séculos." },
  saturn:  { emoji: "💫", accent: "#D4A017", label: "Anelado",   description: "Famoso por seus anéis de gelo e rocha. Tem 83 luas conhecidas, incluindo Titã, com atmosfera densa." },
  uranus:  { emoji: "🔵", accent: "#38BDF8", label: "Gelado",    description: "Um gigante de gelo que orbita o Sol de lado. Suas temperaturas chegam a -224°C, as mais frias do Sistema Solar." },
  neptune: { emoji: "🌊", accent: "#6366F1", label: "Gelado",    description: "O planeta mais distante. Ventos de até 2.100 km/h fazem dele o lugar com as tempestades mais violentas do Sistema Solar." },
};

function getPlanetVisual(id: string) {
  return PLANET_VISUALS[id.toLowerCase()] ?? {
    emoji: "🪐",
    accent: Colors.nebulaPurple,
    label: "Planeta",
    description: "Corpo celeste que orbita o Sol.",
  };
}

// ─── Componente de estatística ────────────────────────────────────────────────

function StatCard({ label, value, unit, accent }: { label: string; value: string | number; unit?: string; accent: string }) {
  return (
    <View style={[styles.statCard, { borderColor: accent + "25" }]}>
      <Text style={[styles.statValue, { color: accent }]}>
        {value ?? "—"}
        {unit && <Text style={styles.statUnit}> {unit}</Text>}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Tela ─────────────────────────────────────────────────────────────────────

export function PlanetDetailsScreen({ route }: any) {
  const { planet } = route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const visual = getPlanetVisual(planet.id);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Cabeçalho com botão voltar */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>SISTEMA SOLAR</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero do planeta */}
        <View style={styles.heroSection}>
          <View style={[styles.emojiCircle, { backgroundColor: visual.accent + "18", borderColor: visual.accent + "33" }]}>
            <Text style={styles.heroEmoji}>{visual.emoji}</Text>
          </View>

          <View style={[styles.typeBadge, { backgroundColor: visual.accent + "1A", borderColor: visual.accent + "44" }]}>
            <Text style={[styles.typeBadgeText, { color: visual.accent }]}>{visual.label}</Text>
          </View>

          <Text style={styles.planetName}>{planet.englishName}</Text>
          <Text style={styles.planetDescription}>{visual.description}</Text>
        </View>

        {/* Grid de estatísticas */}
        <Text style={[styles.sectionTitle, { color: visual.accent }]}>✦ DADOS DO PLANETA</Text>

        <View style={styles.statsGrid}>
          <StatCard label="Gravidade" value={planet.gravity} unit="m/s²" accent={visual.accent} />
          <StatCard label="Densidade" value={planet.density} unit="g/cm³" accent={visual.accent} />
          <StatCard label="Massa (exp)" value={planet.mass?.massExponent ?? "—"} unit="kg" accent={visual.accent} />
          <StatCard label="Vol. (exp)" value={planet.vol?.volExponent ?? "—"} unit="km³" accent={visual.accent} />
          <StatCard label="Inclinação axial" value={planet.axialTilt?.toFixed(1) ?? "—"} unit="°" accent={visual.accent} />
          <StatCard label="Período orbital" value={planet.sideralOrbit?.toFixed(0) ?? "—"} unit="dias" accent={visual.accent} />
        </View>

        {/* Informações extras */}
        {(planet.discoveredBy || planet.discoveryDate) && (
          <>
            <Text style={[styles.sectionTitle, { color: visual.accent }]}>✦ DESCOBERTA</Text>
            <View style={[styles.infoCard, { borderColor: visual.accent + "22" }]}>
              {planet.discoveredBy && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Descoberto por</Text>
                  <Text style={[styles.infoValue, { color: visual.accent }]}>{planet.discoveredBy}</Text>
                </View>
              )}
              {planet.discoveryDate && (
                <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" }]}>
                  <Text style={styles.infoLabel}>Data</Text>
                  <Text style={[styles.infoValue, { color: visual.accent }]}>{planet.discoveryDate}</Text>
                </View>
              )}
            </View>
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // Hero
  heroSection: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 12,
  },
  emojiCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroEmoji: {
    fontSize: 54,
  },
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },
  planetName: {
    fontFamily: Fonts.orbitron,
    fontSize: 30,
    color: Colors.text,
    letterSpacing: 1,
    textAlign: "center",
  },
  planetDescription: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },

  // Seção
  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 4,
  },

  // Grid de stats
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontFamily: Fonts.orbitron,
    fontSize: 18,
    fontWeight: "700",
  },
  statUnit: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  // Info card
  infoCard: {
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  infoLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 13,
  },
});