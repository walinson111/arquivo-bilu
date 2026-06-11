import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { useRef } from "react";
import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";
import { PLANET_TEXTURES } from "../../constants/textures";
import type { PlanetDetailsProps, UniverseStackParamList } from "../../navigation/types";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { SOLAR_SYSTEM_BODIES } from "../../services/solarSystemApi";

type NavProp = NativeStackNavigationProp<UniverseStackParamList, "PlanetDetails">;

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

function StatCard({ label, value, unit, accent }: {
  label: string;
  value: number | null;
  unit?: string;
  accent: string;
}) {
  return (
    <View style={[styles.statCard, { borderColor: accent + "25" }]}>
      <Text style={[styles.statValue, { color: accent }]}>
        {value ?? "—"}
        {value != null && unit && <Text style={styles.statUnit}> {unit}</Text>}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Preview 3D ───────────────────────────────────────────────────────────────

function PlanetPreview({ planetId }: { planetId: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texturePath = PLANET_TEXTURES[planetId] ?? PLANET_TEXTURES.earth;
  const texture = useLoader(
    TextureLoader,
    Asset.fromModule(texturePath).uri
  ) as THREE.Texture;

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 48, 48] as [number, number, number]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const EARTH_RADIUS = 6371;

function getEarthComparison(radius: number) {
  const ratio = radius / EARTH_RADIUS;
  return {
    radiusRatio: ratio.toFixed(2),
    volumeRatio: Math.pow(ratio, 3).toFixed(0),
  };
}

// ─── Tela Principal ───────────────────────────────────────────────────────────

export function PlanetDetailsScreen({ route }: PlanetDetailsProps) {
  // Se o planeta veio com dados incompletos (ex: da tela Sistema Solar 3D),
  // busca o objeto completo nos dados estáticos.
  const rawPlanet = route.params.planet;
  const planet = (rawPlanet.gravity == null && rawPlanet.density == null)
    ? (SOLAR_SYSTEM_BODIES.find((b) => b.id === rawPlanet.id) ?? rawPlanet)
    : rawPlanet;
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const visual = getPlanetVisual(planet.id);
  const comparison = planet.meanRadius != null
    ? getEarthComparison(planet.meanRadius)
    : null;

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorited = isFavorite(planet.id);

  const displayName = planet.englishName;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Botão favoritar flutuante */}
      <Pressable
        onPress={() => toggleFavorite({
          id: planet.id,
          name: displayName,
          type: "planet",
          emoji: visual.emoji,
          accent: visual.accent,
          subtitle: visual.label,
          savedAt: Date.now(),
        })}
        style={[styles.favBtn, { borderColor: favorited ? visual.accent + "88" : "rgba(255,255,255,0.15)" }]}
        accessibilityLabel={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Text style={{ fontSize: 22 }}>{favorited ? "♥" : "♡"}</Text>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Hero do planeta */}
        <View style={styles.heroSection}>
          <View style={[styles.planetGlow, { backgroundColor: visual.accent }]} />

          <View style={[styles.planetViewer, { borderColor: visual.accent + "44" }]}>
            <Canvas camera={{ position: [0, 0, 3] as [number, number, number] }}>
              <ambientLight intensity={2} />
              <pointLight position={[5, 5, 5] as [number, number, number]} intensity={10} />
              <PlanetPreview planetId={planet.id} />
            </Canvas>
          </View>

          <View style={[styles.typeBadge, { backgroundColor: visual.accent + "1A", borderColor: visual.accent + "44" }]}>
            <Text style={[styles.typeBadgeText, { color: visual.accent }]}>
              {visual.label}
            </Text>
          </View>

          <Text style={styles.planetName}>{displayName}</Text>
          <Text style={styles.planetDescription}>{visual.description}</Text>
        </View>

        {/* Características */}
        <Text style={[styles.sectionTitle, { color: visual.accent }]}>CARACTERÍSTICAS</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Gravidade"  value={planet.gravity}    unit="m/s²"  accent={visual.accent} />
          <StatCard label="Densidade"  value={planet.density}    unit="g/cm³" accent={visual.accent} />
          <StatCard label="Raio Médio" value={planet.meanRadius} unit="km"    accent={visual.accent} />
        </View>

        {/* Detalhes orbitais */}
        <Text style={[styles.sectionTitle, { color: visual.accent }]}>DETALHES ORBITAIS</Text>
        <View style={[styles.infoCard, { borderColor: visual.accent + "25" }]}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Período Orbital</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>
              {planet.sideralOrbit ?? "—"} dias
            </Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" }]}>
            <Text style={styles.infoLabel}>Período de Rotação</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>
              {planet.sideralRotation ?? "—"} horas
            </Text>
          </View>
          <View style={[styles.infoRow, { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" }]}>
            <Text style={styles.infoLabel}>Luas Conhecidas</Text>
            <Text style={[styles.infoValue, { color: Colors.text }]}>
              {planet.moons?.length ?? 0}
            </Text>
          </View>
        </View>

        {/* Comparação com a Terra */}
        {comparison && (
          <>
            <Text style={[styles.sectionTitle, { color: "#22C55E" }]}>COMPARAÇÃO COM A TERRA</Text>
            <View style={styles.compareCard}>
              <Text style={styles.compareTitle}>🌍 Terra vs {displayName}</Text>
              <Text style={styles.compareText}>{comparison.radiusRatio}x o raio da Terra</Text>
              <Text style={styles.compareText}>{comparison.volumeRatio} Terras caberiam dentro dele</Text>
              <TouchableOpacity
                style={styles.compareButton}
                activeOpacity={0.8}
                accessibilityLabel="Ver comparação 3D com a Terra"
                onPress={() => navigation.navigate("PlanetComparison", { planet })}
              >
                <Text style={styles.compareButtonText}>Ver em 3D</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  heroSection: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 12,
    position: "relative",
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    minWidth: "28%",
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    fontWeight: "700",
  },
  statUnit: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
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
  planetViewer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: "hidden",
    borderWidth: 1.5,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  planetGlow: {
    position: "absolute",
    top: 35,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.22,
    transform: [{ scale: 1.4 }],
  },
  compareCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  compareTitle: {
    color: Colors.text,
    fontSize: 16,
    marginBottom: 10,
    fontFamily: Fonts.orbitron,
  },
  compareText: {
    color: Colors.textSecondary,
    marginBottom: 8,
    fontFamily: Fonts.spaceGrotesk,
  },
  compareButton: {
    marginTop: 12,
    backgroundColor: "#22C55E",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  compareButtonText: {
    color: "#000",
    fontFamily: Fonts.spaceGroteskBold,
  },
  favBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(2,6,23,0.75)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});