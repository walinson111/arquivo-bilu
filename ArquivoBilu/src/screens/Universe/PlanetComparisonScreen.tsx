import { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { PLANET_TEXTURES } from "../../constants/textures";
import type { PlanetComparisonProps } from "../../navigation/types";

const EARTH_RADIUS = 6371;

function PlanetMesh({
  texturePath,
  scale,
  position,
}: {
  texturePath: number;
  scale: number;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(
    TextureLoader,
    Asset.fromModule(texturePath).uri
  ) as THREE.Texture;

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.003;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export function PlanetComparisonScreen({ route }: PlanetComparisonProps) {
  const { planet } = route.params;
  const insets = useSafeAreaInsets();

  const scale = useMemo(() => {
    if (planet.meanRadius == null) return 1;
    const ratio = planet.meanRadius / EARTH_RADIUS;
    return Math.max(0.4, Math.min(Math.log2(ratio + 1) + 1, 5));
  }, [planet.meanRadius]);

  const planetTexture = PLANET_TEXTURES[planet.id.toLowerCase()] ?? PLANET_TEXTURES.earth;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <Text style={styles.title}>🌍 Terra vs {planet.englishName}</Text>

      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={20} />
        <PlanetMesh texturePath={PLANET_TEXTURES.earth} scale={1}     position={[-3, 0, 0] as [number, number, number]} />
        <PlanetMesh texturePath={planetTexture}          scale={scale} position={[3, 0, 0]  as [number, number, number]} />
      </Canvas>

      <View style={styles.info}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Terra</Text>
          <Text style={styles.infoValue}>6.371 km</Text>
        </View>
        <View style={[styles.infoRow, styles.infoRowBorder]}>
          <Text style={styles.infoLabel}>{planet.englishName}</Text>
          <Text style={styles.infoValue}>
            {planet.meanRadius?.toLocaleString("pt-BR")} km
          </Text>
        </View>
        <View style={[styles.infoRow, styles.infoRowBorder]}>
          <Text style={styles.infoLabel}>Proporção</Text>
          <Text style={[styles.infoValue, { color: Colors.biluGreen }]}>
            {(planet.meanRadius != null ? (planet.meanRadius / EARTH_RADIUS).toFixed(2) : "—")}x maior
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Fonts.orbitron,
    color: Colors.text,
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  info: {
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  infoRowBorder: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  infoLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 13,
    color: Colors.text,
  },
});