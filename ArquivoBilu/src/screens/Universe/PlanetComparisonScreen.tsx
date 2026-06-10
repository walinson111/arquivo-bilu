import { useMemo, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei/native";

import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";



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
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export function PlanetComparisonScreen({ route }: any) {
  const { planet } = route.params;

  const textureMap: Record<string, number> = {
    mercury: require("../../../assets/textures/mercury.jpg"),
    venus: require("../../../assets/textures/venus.jpg"),
    earth: require("../../../assets/textures/earth.jpg"),
    mars: require("../../../assets/textures/mars.jpg"),
    jupiter: require("../../../assets/textures/jupiter.jpg"),
    saturn: require("../../../assets/textures/saturn.jpg"),
    uranus: require("../../../assets/textures/uranus.jpg"),
    neptune: require("../../../assets/textures/neptune.jpg"),
  };

  const scale = useMemo(() => {
    const ratio = planet.meanRadius / EARTH_RADIUS;

    return Math.max(
      0.4,
      Math.min(
        Math.log2(ratio + 1) + 1,
        5
      )
    );
  }, [planet]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🌍 Terra vs {planet.name}
      </Text>

      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={2} />

        <pointLight
          position={[10, 10, 10]}
          intensity={20}
        />

        <PlanetMesh
          texturePath={textureMap.earth}
          scale={1}
          position={[-3, 0, 0]}
        />

        <PlanetMesh
          texturePath={
            textureMap[
              planet.id.toLowerCase()
            ]
          }
          scale={scale}
          position={[3, 0, 0]}
        />


      </Canvas>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Terra: 6.371 km
        </Text>

        <Text style={styles.infoText}>
          {planet.name}:{" "}
          {planet.meanRadius.toLocaleString()} km
        </Text>

        <Text style={styles.infoText}>
          {(planet.meanRadius / EARTH_RADIUS).toFixed(2)}
          x maior que a Terra
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
  },

  title: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  info: {
    padding: 20,
  },

  infoText: {
    color: "white",
    fontSize: 15,
    marginBottom: 8,
  },
});