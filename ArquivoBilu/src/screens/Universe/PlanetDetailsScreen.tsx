import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { layoutStyles } from "../../theme/styles";
import { planetDetailsStyles as styles } from "./PlanetDetailsScreen.styles";
import { Fonts } from "../../theme/fonts";
import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { useRef } from "react";
import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";
import { PLANET_TEXTURES } from "../../constants/textures";
import { getBodyImage } from "../../constants/bodyImages";
import { SOLAR_SYSTEM_BODIES } from "../../services/solarSystemApi";
import type { PlanetDetailsProps } from "../../navigation/types";
import { useFavoritesContext } from "../../context/FavoritesContext";


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

// ─── Tela Principal ───────────────────────────────────────────────────────────

export function PlanetDetailsScreen({ route }: PlanetDetailsProps) {
  const rawPlanet = route.params.planet;
  const planet = (rawPlanet.gravity == null && rawPlanet.density == null)
    ? (SOLAR_SYSTEM_BODIES.find((b) => b.id === rawPlanet.id) ?? rawPlanet)
    : rawPlanet;
  const insets = useSafeAreaInsets();
  const visual = getPlanetVisual(planet.id);

  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorited = isFavorite(planet.id);

  const displayName = planet.englishName;

  return (
    <View style={[layoutStyles.root, { paddingTop: insets.top }]}>
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
            {PLANET_TEXTURES[planet.id] ? (
              <Canvas camera={{ position: [0, 0, 3] as [number, number, number] }}>
                <ambientLight intensity={2} />
                <pointLight position={[5, 5, 5] as [number, number, number]} intensity={10} />
                <PlanetPreview planetId={planet.id} />
              </Canvas>
            ) : getBodyImage(planet.id) ? (
              <Image
                source={getBodyImage(planet.id)!}
                style={styles.planetImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.planetEmojiWrap}>
                <Text style={styles.planetEmoji}>{visual.emoji}</Text>
              </View>
            )}
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


      </ScrollView>
    </View>
  );
}

