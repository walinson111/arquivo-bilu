import { useNavigation } from "@react-navigation/native";
import { Canvas, useFrame, useThree } from "@react-three/fiber/native";
import { Asset } from "expo-asset";
import { useEffect, useRef, useState, Suspense } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import * as THREE from "three";

import { Colors } from "../../theme/colors";
import { solarSystemStyles as styles } from "./SolarSystemScreen.styles";
import { Fonts } from "../../theme/fonts";
import { useLoader } from "@react-three/fiber/native";
import { TextureLoader } from "expo-three";
import { SOLAR_SYSTEM_BODIES } from "../../services/solarSystemApi";
import { getBodyImage } from "../../constants/bodyImages";


// ─── Dados dos planetas ───────────────────────────────────────────────────────

const PLANET_DATA = [
  {
    id: "mercury",
    name: "Mercúrio",
    radius: 0.18,
    orbitRadius: 2.2,
    orbitSpeed: 1.6,
    rotationSpeed: 0.004,
    color: "#94A3B8",
    accent: "#94A3B8",
    emoji: "☿",
    texture: require("../../../assets/textures/mercury.jpg"),
  },
  {
    id: "venus",
    name: "Vênus",
    radius: 0.28,
    orbitRadius: 3.0,
    orbitSpeed: 1.17,
    rotationSpeed: 0.002,
    color: "#D4A017",
    accent: "#D4A017",
    emoji: "♀",
    texture: require("../../../assets/textures/venus.jpg"),
  },
  {
    id: "earth",
    name: "Terra",
    radius: 0.3,
    orbitRadius: 4.0,
    orbitSpeed: 1.0,
    rotationSpeed: 0.008,
    color: "#22C55E",
    accent: "#22C55E",
    emoji: "🌍",
    texture: require("../../../assets/textures/earth.jpg"),
  },
  {
    id: "mars",
    name: "Marte",
    radius: 0.22,
    orbitRadius: 5.2,
    orbitSpeed: 0.80,
    rotationSpeed: 0.007,
    color: "#EF4444",
    accent: "#EF4444",
    emoji: "🔴",
    texture: require("../../../assets/textures/mars.jpg"),
  },
  {
    id: "jupiter",
    name: "Júpiter",
    radius: 0.65,
    orbitRadius: 7.2,
    orbitSpeed: 0.43,
    rotationSpeed: 0.02,
    color: "#FB923C",
    accent: "#FB923C",
    emoji: "🪐",
    texture: require("../../../assets/textures/jupiter.jpg"),
  },
  {
    id: "saturn",
    name: "Saturno",
    radius: 0.55,
    orbitRadius: 9.4,
    orbitSpeed: 0.32,
    rotationSpeed: 0.018,
    color: "#D4A017",
    accent: "#D4A017",
    emoji: "💫",
    texture: require("../../../assets/textures/saturn.jpg"),
    hasRings: true,
  },
  {
    id: "uranus",
    name: "Urano",
    radius: 0.42,
    orbitRadius: 11.4,
    orbitSpeed: 0.23,
    rotationSpeed: 0.012,
    color: "#38BDF8",
    accent: "#38BDF8",
    emoji: "🔵",
    texture: require("../../../assets/textures/uranus.jpg"),
  },
  {
    id: "neptune",
    name: "Netuno",
    radius: 0.40,
    orbitRadius: 13.2,
    orbitSpeed: 0.18,
    rotationSpeed: 0.01,
    color: "#6366F1",
    accent: "#6366F1",
    emoji: "🌊",
    texture: require("../../../assets/textures/neptune.jpg"),
  },
];

// ─── Anel de Saturno ──────────────────────────────────────────────────────────

function SaturnRings({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[radius * 1.35, radius * 2.1, 64]} />
      <meshStandardMaterial
        color="#C9A84C"
        side={THREE.DoubleSide}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

// ─── Órbita (círculo) ─────────────────────────────────────────────────────────

function OrbitRing({ radius }: { radius: number }) {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 128; i++) {
    const angle = (i / 128) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <primitive
      object={new THREE.LineLoop(
        geometry,
        new THREE.LineBasicMaterial({ color: "#FFFFFF", transparent: true, opacity: 0.06 })
      )}
    />
  );
}

// ─── Patch global: silencia pixelStorei no expo-gl ───────────────────────────
//
// O expo-gl não suporta UNPACK_FLIP_Y_WEBGL nem UNPACK_PREMULTIPLY_ALPHA_WEBGL.
// O Three.js chama pixelStorei com esses parâmetros antes de todo texImage2D,
// o que gera erros e impede as texturas de carregar.
//
// A solução: monkey-patch no contexto GL logo após o Canvas ser criado,
// fazendo pixelStorei ignorar silenciosamente os parâmetros não suportados.
// Os valores UNPACK_ALIGNMENT (3553) e PACK_ALIGNMENT (3333) são os únicos
// realmente suportados pelo expo-gl e continuam funcionando normalmente.

const EXPO_GL_UNSUPPORTED_PIXEL_STORE_PARAMS = new Set([
  0x9240, // UNPACK_FLIP_Y_WEBGL
  0x9241, // UNPACK_PREMULTIPLY_ALPHA_WEBGL
  0x9242, // UNPACK_COLORSPACE_CONVERSION_WEBGL
]);

function patchExpoGlPixelStorei(gl: any) {
  if (gl.__pixelStoreiPatched) return;
  const original = gl.pixelStorei.bind(gl);
  gl.pixelStorei = (pname: number, param: any) => {
    if (EXPO_GL_UNSUPPORTED_PIXEL_STORE_PARAMS.has(pname)) return;
    original(pname, param);
  };
  gl.__pixelStoreiPatched = true;
}

// ─── Hook: carrega textura com THREE.TextureLoader após patch do GL ───────────

// ─── Hook Corrigido: Carrega a textura de forma nativa e segura para Mobile ───

// ─── Hook Híbrido Corrigido ──────────────────────────────────────────────────

// ─── Hook Híbrido Corrigido e Unificado ──────────────────────────────────────

// ─── Hook Híbrido Unificado e Simplificado ───────────────────────────────────



// ─── Componente Planet com Fallback de Segurança à Prova de Falhas ──────────

function Planet({
  data,
  paused,
  onPress,
}: {
  data: typeof PLANET_DATA[0];
  paused: boolean;
  onPress: (id: string, name: string, accent: string, emoji: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef(Math.random() * Math.PI * 2);

  const textureUri = Asset.fromModule(data.texture).uri;

  const texture = useLoader(
    TextureLoader,
    textureUri
  ) as THREE.Texture;

  useFrame((_, delta) => {
    if (paused) return;

    angleRef.current += delta * data.orbitSpeed * 0.3;

    if (groupRef.current) {
      groupRef.current.position.x =
        Math.cos(angleRef.current) * data.orbitRadius;

      groupRef.current.position.z =
        Math.sin(angleRef.current) * data.orbitRadius;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerDown={() =>
          onPress(data.id, data.name, data.accent, data.emoji)
        }
      >
        <sphereGeometry args={[data.radius, 48, 48]} />

        <meshStandardMaterial map={texture} />
      </mesh>

      {"hasRings" in data &&
        data.hasRings && (
          <SaturnRings radius={data.radius} />
        )}
    </group>
  );
}


function TestPlanet() {
  const uri = Asset.fromModule(
    require("../../../assets/textures/earth.jpg")
  ).uri;

  console.log("URI", uri);

  const texture = useLoader(
    TextureLoader,
    uri
  ) as THREE.Texture;

  console.log("TEXTURE", texture);

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
// ─── Sol ──────────────────────────────────────────────────────────────────────

function SunMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    TextureLoader,
    Asset.fromModule(require("../../../assets/textures/sun.jpg")).uri
  ) as THREE.Texture;

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.0, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissiveMap={texture}
        emissive="#FF6A00"
        emissiveIntensity={0.55}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function Sun() {
  return (
    <Suspense fallback={
      <mesh>
        <sphereGeometry args={[1.0, 48, 48]} />
        <meshStandardMaterial color="#FDB813" emissive="#F97316" emissiveIntensity={1.2} roughness={1} metalness={0} />
      </mesh>
    }>
      <SunMesh />
    </Suspense>
  );
}

// ─── Campo de estrelas ────────────────────────────────────────────────────────

function StarField() {
  const count = 800;
  const positions = useRef(
    new Float32Array(
      Array.from({ length: count * 3 }, () => (Math.random() - 0.5) * 200)
    )
  ).current;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#FFFFFF" transparent opacity={0.6} />
    </points>
  );
}

// ─── Câmera controlada por pan/zoom ───────────────────────────────────────────

function CameraController({ phi, theta, zoom }: { phi: number; theta: number; zoom: number }) {
  const { camera } = useThree();

  useFrame(() => {
    const x = zoom * Math.sin(phi) * Math.cos(theta);
    const y = zoom * Math.cos(phi);
    const z = zoom * Math.sin(phi) * Math.sin(theta);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Cena completa ────────────────────────────────────────────────────────────

function SolarScene({
  phi,
  theta,
  zoom,
  paused,
  onPlanetPress,
}: {
  phi: number;
  theta: number;
  zoom: number;
  paused: boolean;
  onPlanetPress: (id: string, name: string, accent: string, emoji: string) => void;
}) {
  return (
    <>
      <CameraController phi={phi} theta={theta} zoom={zoom} />

      <ambientLight intensity={1.8} />

      <pointLight
        position={[0, 0, 0]}
        intensity={6}
        distance={120}
        decay={1.0}
        color="#FFF5E0"
      />

      <hemisphereLight
        args={["#FFF5E0", "#1E293B", 0.8]}
      />

      <StarField />

      <Sun />

      {PLANET_DATA.map((p) => (
        <OrbitRing
          key={`orbit-${p.id}`}
          radius={p.orbitRadius}
        />
      ))}

      {PLANET_DATA.map((p) => (
        <Planet
          key={p.id}
          data={p}
          paused={paused}
          onPress={onPlanetPress}
        />
      ))}
    </>
  );
}

// ─── Tooltip do planeta selecionado ──────────────────────────────────────────

function PlanetTooltip({
  name,
  accent,
  emoji,
  planetId,
  onDetails,
  onClose,
}: {
  name: string;
  accent: string;
  emoji: string;
  planetId: string;
  onDetails: () => void;
  onClose: () => void;
}) {
  const anim = useRef(new Animated.Value(0)).current;
  const bodyImage = getBodyImage(planetId);

  useEffect(() => {
    Animated.spring(anim, { toValue: 1, useNativeDriver: true, speed: 16, bounciness: 8 }).start();
  }, [name]);

  return (
    <Animated.View
      style={[
        styles.tooltip,
        { borderColor: accent + "55", transform: [{ scale: anim }], opacity: anim },
      ]}
    >
      <View style={[styles.tooltipImgWrap, { borderColor: accent + "44", backgroundColor: accent + "18" }]}>
        {bodyImage ? (
          <Image source={bodyImage} style={styles.tooltipImg} resizeMode="cover" />
        ) : (
          <Text style={styles.tooltipEmoji}>{emoji}</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.tooltipName, { color: accent }]}>{name}</Text>
        <Text style={styles.tooltipHint}>Toque para ver detalhes</Text>
      </View>
      <Pressable
        onPress={onDetails}
        style={[styles.tooltipBtn, { backgroundColor: accent + "22", borderColor: accent + "55" }]}
      >
        <Text style={[styles.tooltipBtnText, { color: accent }]}>VER →</Text>
      </Pressable>
      <Pressable onPress={onClose} style={styles.tooltipClose}>
        <Text style={{ color: Colors.textSecondary, fontSize: 16 }}>✕</Text>
      </Pressable>
    </Animated.View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function SolarSystemScreen() {
  const navigation = useNavigation<any>();

  const [phi, setPhi] = useState(1.1);
  const [theta, setTheta] = useState(0.5);
  const [zoom, setZoom] = useState(22);

  const lastTouch = useRef({ x: 0, y: 0 });
  const lastPinchDist = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<{ id: string; name: string; accent: string; emoji: string } | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (e) => {
        const touches = e.nativeEvent.touches;
        if (touches.length === 1) {
          lastTouch.current = { x: touches[0].pageX, y: touches[0].pageY };
        }
      },

      onPanResponderMove: (e) => {
        const touches = e.nativeEvent.touches;

        if (touches.length === 2) {
          const dx = touches[0].pageX - touches[1].pageX;
          const dy = touches[0].pageY - touches[1].pageY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (lastPinchDist.current !== null) {
            const delta = lastPinchDist.current - dist;
            setZoom((z) => Math.max(6, Math.min(40, z + delta * 0.06)));
          }
          lastPinchDist.current = dist;
          return;
        }

        lastPinchDist.current = null;

        if (touches.length === 1) {
          const dx = touches[0].pageX - lastTouch.current.x;
          const dy = touches[0].pageY - lastTouch.current.y;
          lastTouch.current = { x: touches[0].pageX, y: touches[0].pageY };
          setTheta((t) => t - dx * 0.008);
          setPhi((p) => Math.max(0.2, Math.min(Math.PI - 0.2, p + dy * 0.008)));
        }
      },

      onPanResponderRelease: () => {
        lastPinchDist.current = null;
      },
    })
  ).current;

  function handlePlanetPress(id: string, name: string, accent: string, emoji: string) {
    setSelected({ id, name, accent, emoji });
    setPaused(true);
  }

  function handleCloseTooltip() {
    setSelected(null);
    setPaused(false);
  }

  function handleGoToDetails() {
    if (!selected) return;
    const fullPlanet = SOLAR_SYSTEM_BODIES.find((p) => p.id === selected.id);
    if (!fullPlanet) return;
    navigation.navigate("Universo", {
      screen: "PlanetDetails",
      params: { planet: fullPlanet },
    });
    handleCloseTooltip();
  }

return (
    <View style={styles.root}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
<Canvas
  camera={{ position: [0, 0, 4], fov: 55 }}
  style={{ flex: 1 }}
>
          {/* O PULO DO GATO: O Suspense captura a Promise {<pending>} e espera ela resolver */}
          <Suspense fallback={null}>
            <SolarScene
              phi={phi}
              theta={theta}
              zoom={zoom}
              paused={paused}
              onPlanetPress={handlePlanetPress}
            />
          </Suspense>
        </Canvas>
      </View>

      {/* ... Resto dos seus botões e cabeçalhos continuam iguais ... */}

      <View style={styles.header} pointerEvents="none">
        <Text style={styles.headerLabel}>SIMULAÇÃO 3D</Text>
        <Text style={styles.headerTitle}>Sistema Solar</Text>
      </View>

      <View style={styles.hints} pointerEvents="none">
        <Text style={styles.hintText}>👆 Arraste para girar  •  🤏 Pinça para zoom</Text>
      </View>

      <Pressable
        onPress={() => { setPaused((p) => !p); setSelected(null); }}
        style={[styles.pauseBtn, { borderColor: paused ? Colors.biluGreen + "66" : "rgba(255,255,255,0.15)" }]}
      >
        <Text style={{ fontSize: 18 }}>{paused ? "▶" : "⏸"}</Text>
      </Pressable>

      {selected && (
        <PlanetTooltip
          name={selected.name}
          accent={selected.accent}
          emoji={selected.emoji}
          planetId={selected.id}
          onDetails={handleGoToDetails}
          onClose={handleCloseTooltip}
        />
      )}
    </View>
  );
}

