import { useNavigation } from "@react-navigation/native";
import { JSX, Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";

import { Colors } from "../../theme/colors";
import { planetComparisonStyles as styles } from "./PlanetComparisonScreen.styles";
import { Fonts } from "../../theme/fonts";
import { PLANET_TEXTURES } from "../../constants/textures";
import { getBodyImage } from "../../constants/bodyImages";
import { getBodies, getStars, SOLAR_SYSTEM_BODIES } from "../../services/solarSystemApi";
import type { CelestialBody, Star } from "../../services/solarSystemApi";
import type { PlanetComparisonProps } from "../../navigation/types";

// ─── Tipo unificado para comparação ──────────────────────────────────────────

type CompareItem =
  | { kind: "body"; data: CelestialBody }
  | { kind: "star"; data: Star };

function itemId(item: CompareItem)   { return item.data.id; }
function itemName(item: CompareItem) { return item.kind === "body" ? item.data.englishName : item.data.name; }

// ─── Dados extras ─────────────────────────────────────────────────────────────

const PLANET_EXTRA: Record<string, { avgTemp: number; distanceAU: number }> = {
  mercury: { avgTemp: 167,  distanceAU: 0.39  },
  venus:   { avgTemp: 464,  distanceAU: 0.72  },
  earth:   { avgTemp: 15,   distanceAU: 1.0   },
  mars:    { avgTemp: -65,  distanceAU: 1.52  },
  jupiter: { avgTemp: -110, distanceAU: 5.2   },
  saturn:  { avgTemp: -140, distanceAU: 9.58  },
  uranus:  { avgTemp: -195, distanceAU: 19.2  },
  neptune: { avgTemp: -200, distanceAU: 30.05 },
  pluto:   { avgTemp: -225, distanceAU: 39.5  },
};

// ─── Acento de cor ────────────────────────────────────────────────────────────

function getAccent(item: CompareItem): string {
  if (item.kind === "star") {
    // cor pela temperatura da estrela
    const t = item.data.surfaceTemp;
    if (t > 30000) return "#A0C0FF"; // azul
    if (t > 10000) return "#C0D0FF"; // branco-azul
    if (t > 7500)  return "#FFFFFF"; // branco
    if (t > 6000)  return "#FFF4C2"; // amarelo-branco
    if (t > 5200)  return "#FFE87C"; // amarelo
    if (t > 3700)  return "#FFAA44"; // laranja
    return "#FF6644";                // vermelho
  }
  const accents: Record<string, string> = {
    mercury: "#B0B0C0", venus: "#E8C97E", earth: "#4DA6FF",
    mars: "#E8704A", jupiter: "#C88B5A", saturn: "#E4C97A",
    uranus: "#72D9DE", neptune: "#5B7FD4", pluto: "#A0A0C0",
    eris: "#C0C0D0", makemake: "#D4B090", haumea: "#90B0C0",
    ceres: "#A09880", vesta: "#B8B0A0", pallas: "#A0A8B0",
    hygiea: "#909898", apophis: "#886050",
    halley: "#88AACC", churyumov: "#99AABB",
    "hale-bopp": "#AACCEE", encke: "#8899AA",
  };
  return accents[item.data.id.toLowerCase()] ?? Colors.biluGreen;
}

// ─── Raio em km para escala visual ───────────────────────────────────────────

const EARTH_RADIUS_KM = 6371;
const SUN_RADIUS_KM   = 695700;

function getRadiusKm(item: CompareItem): number | null {
  if (item.kind === "star") {
    return item.data.radius * SUN_RADIUS_KM;
  }
  return item.data.meanRadius ?? null;
}

// ─── Malha 3D: planeta com textura ───────────────────────────────────────────

function PlanetMesh({ texturePath, scale, position, speed = 0.004 }: {
  texturePath: number;
  scale: number;
  position: [number, number, number];
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(TextureLoader, Asset.fromModule(texturePath).uri) as THREE.Texture;
  useFrame(() => { if (meshRef.current) meshRef.current.rotation.y += speed; });
  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// ─── Malha 3D: estrela brilhante ─────────────────────────────────────────────

function StarMesh({ color, scale, position }: {
  color: string;
  scale: number;
  position: [number, number, number];
}) {
  const meshRef  = useRef<THREE.Mesh>(null);
  const glowRef  = useRef<THREE.Mesh>(null);
  const t        = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    const pulse = 1 + Math.sin(t.current * 2) * 0.04;
    if (meshRef.current) meshRef.current.rotation.y += 0.003;
    if (glowRef.current) glowRef.current.scale.setScalar(pulse * 1.35 * scale);
  });

  const c = new THREE.Color(color);

  return (
    <group position={position}>
      {/* núcleo */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={c} emissive={c} emissiveIntensity={1.6} roughness={0.3} />
      </mesh>
      {/* halo */}
      <mesh ref={glowRef} scale={scale * 1.35}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.4} transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}

// ─── Malha 3D: corpo irregular (asteroide / cometa) ──────────────────────────

function IrregularMesh({ color, scale, position }: {
  color: string;
  scale: number;
  position: [number, number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1, 2);
    const pos = geo.attributes.position;
    const rng = mulberry32(42);
    for (let i = 0; i < pos.count; i++) {
      const jitter = 0.22 + rng() * 0.18;
      pos.setX(i, pos.getX(i) * jitter + pos.getX(i) * (1 - jitter));
      pos.setY(i, pos.getY(i) * (0.7 + rng() * 0.3));
      pos.setZ(i, pos.getZ(i) * jitter + pos.getZ(i) * (1 - jitter));
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.006;
      meshRef.current.rotation.x += 0.002;
    }
  });

  const c = new THREE.Color(color);

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial color={c} roughness={0.9} metalness={0.1} />
    </mesh>
  );
}

// seed determinístico para manter forma constante
function mulberry32(seed: number) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Cena 3D unificada ───────────────────────────────────────────────────────

function CompareScene({ left, right }: { left: CompareItem; right: CompareItem }) {
  const scaleFor = (item: CompareItem) => {
    const r = getRadiusKm(item);
    if (r == null) return 1;
    const ratio = r / EARTH_RADIUS_KM;
    return Math.max(0.25, Math.min(Math.log2(ratio + 1) + 0.5, 4.5));
  };

  const ls = scaleFor(left);
  const rs = scaleFor(right);
  const norm = 2.2 / Math.max(ls, rs);

  function renderBody(item: CompareItem, scale: number, pos: [number, number, number]) {
    const id = item.data.id.toLowerCase();
    const bodyType = item.kind === "body" ? item.data.bodyType : null;
    const accent = getAccent(item);

    if (item.kind === "star") {
      return <StarMesh key={id} color={accent} scale={scale} position={pos} />;
    }
    if (bodyType === "asteroid" || bodyType === "comet") {
      return <IrregularMesh key={id} color={accent} scale={scale} position={pos} />;
    }
    if (PLANET_TEXTURES[id]) {
      return <PlanetMesh key={id} texturePath={PLANET_TEXTURES[id]} scale={scale} position={pos} speed={0.004} />;
    }
    // sem textura 3D: esfera colorida com a cor accent do corpo
    return (
      <mesh key={id} position={pos} scale={scale}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color={new THREE.Color(accent)} roughness={0.8} metalness={0.1} />
      </mesh>
    );
  }

  return (
    <>
      <ambientLight intensity={1.8} />
      <pointLight position={[10, 10, 10]} intensity={25} />
      <pointLight position={[-8, -5, 8]}  intensity={8} color="#4488ff" />
      <Suspense fallback={null}>
        {renderBody(left,  ls * norm, [-3.2, 0, 0])}
        {renderBody(right, rs * norm, [ 3.2, 0, 0])}
      </Suspense>
    </>
  );
}

// ─── Picker ───────────────────────────────────────────────────────────────────

function ItemPicker({ selected, onSelect, accent, label, items }: {
  selected: CompareItem;
  onSelect: (i: CompareItem) => void;
  accent: string;
  label: string;
  items: CompareItem[];
}) {
  const [open, setOpen] = useState(false);

  const groups: { title: string; entries: CompareItem[] }[] = [
    { title: "Planetas",       entries: items.filter(i => i.kind === "body" && i.data.bodyType === "planet") },
    { title: "Planetas Anões", entries: items.filter(i => i.kind === "body" && i.data.bodyType === "dwarf_planet") },
    { title: "Asteroides",     entries: items.filter(i => i.kind === "body" && i.data.bodyType === "asteroid") },
    { title: "Cometas",        entries: items.filter(i => i.kind === "body" && i.data.bodyType === "comet") },
    { title: "Estrelas",       entries: items.filter(i => i.kind === "star") },
  ].filter(g => g.entries.length > 0);

  return (
    <View style={styles.pickerWrap}>
      <Text style={[styles.pickerLabel, { color: accent }]}>{label}</Text>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        style={[styles.pickerBtn, { borderColor: accent + "55" }]}
        activeOpacity={0.8}
      >
        <Text style={styles.pickerBtnText} numberOfLines={1}>{itemName(selected)}</Text>
        <Text style={{ color: accent, fontSize: 12 }}>▼</Text>
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.modalOverlay} onPress={() => setOpen(false)} />
        <View style={[styles.modalSheet, { borderColor: accent + "33" }]}>
          <View style={styles.modalHandle} />
          <Text style={[styles.modalTitle, { color: accent }]}>{label}</Text>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
            {groups.map(g => (
              <View key={g.title}>
                <Text style={styles.pickerGroupTitle}>{g.title}</Text>
                {g.entries.map(item => (
                  <TouchableOpacity
                    key={itemId(item)}
                    onPress={() => { onSelect(item); setOpen(false); }}
                    style={[styles.pickerItem, itemId(item) === itemId(selected) && { backgroundColor: accent + "22" }]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.pickerItemText, itemId(item) === itemId(selected) && { color: accent }]}>
                      {itemName(item)}
                    </Text>
                    {itemId(item) === itemId(selected) && <Text style={{ color: accent, fontSize: 11 }}>✓</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

// ─── Linha de stat ────────────────────────────────────────────────────────────

function StatRow({ label, leftVal, rightVal, leftRaw, rightRaw, leftAccent, rightAccent, unit }: {
  label: string; leftVal: string; rightVal: string;
  leftRaw: number; rightRaw: number;
  leftAccent: string; rightAccent: string; unit?: string;
}) {
  const max = Math.max(leftRaw, rightRaw, 0.001);
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBars}>
        <View style={styles.statSide}>
          <Text style={[styles.statVal, { color: leftAccent }]}>{leftVal}{unit ? ` ${unit}` : ""}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${(leftRaw / max) * 100}%` as any, backgroundColor: leftAccent }]} />
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={[styles.statSide, styles.statSideRight]}>
          <Text style={[styles.statVal, { color: rightAccent }]}>{rightVal}{unit ? ` ${unit}` : ""}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFillRight, { width: `${(rightRaw / max) * 100}%` as any, backgroundColor: rightAccent }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Helpers de formato ───────────────────────────────────────────────────────

function fmtOrbit(days: number | null): string {
  if (days == null) return "—";
  if (days < 366) return `${days.toFixed(1)} dias`;
  return `${(days / 365.25).toFixed(2)} anos`;
}
function fmtRotation(hours: number | null): string {
  if (hours == null) return "—";
  const abs = Math.abs(hours);
  const label = abs < 24 ? `${abs.toFixed(1)} h` : `${(abs / 24).toFixed(2)} d`;
  return hours < 0 ? `${label} ↺` : label;
}
function fmtNum(v: number | null, decimals = 2): string {
  return v != null ? v.toLocaleString("pt-BR", { maximumFractionDigits: decimals }) : "—";
}

// ─── Tabela de stats dinâmica por tipo ────────────────────────────────────────

function StatsTable({ left, right }: { left: CompareItem; right: CompareItem }) {
  const la = getAccent(left);
  const ra = getAccent(right);

  // stats comuns a todos
  const radiusL = getRadiusKm(left);
  const radiusR = getRadiusKm(right);

  const rows: JSX.Element[] = [];

  rows.push(
    <StatRow key="raio"
      label="Raio" unit="km"
      leftVal={fmtNum(radiusL, 0)} rightVal={fmtNum(radiusR, 0)}
      leftRaw={radiusL ?? 0}       rightRaw={radiusR ?? 0}
      leftAccent={la} rightAccent={ra}
    />
  );

  if (left.kind === "body" && right.kind === "body") {
    // corpo vs corpo
    const l = left.data; const r = right.data;
    rows.push(<View key="d1" style={styles.statDividerH} />);
    rows.push(<StatRow key="grav" label="Gravidade" unit="m/s²"
      leftVal={fmtNum(l.gravity)} rightVal={fmtNum(r.gravity)}
      leftRaw={l.gravity ?? 0}    rightRaw={r.gravity ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d2" style={styles.statDividerH} />);
    rows.push(<StatRow key="dens" label="Densidade" unit="g/cm³"
      leftVal={fmtNum(l.density)} rightVal={fmtNum(r.density)}
      leftRaw={l.density ?? 0}    rightRaw={r.density ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d3" style={styles.statDividerH} />);
    rows.push(<StatRow key="orb" label="Órbita"
      leftVal={fmtOrbit(l.sideralOrbit)} rightVal={fmtOrbit(r.sideralOrbit)}
      leftRaw={l.sideralOrbit ?? 0}      rightRaw={r.sideralOrbit ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d4" style={styles.statDividerH} />);
    rows.push(<StatRow key="rot" label="Rotação"
      leftVal={fmtRotation(l.sideralRotation)} rightVal={fmtRotation(r.sideralRotation)}
      leftRaw={Math.abs(l.sideralRotation ?? 0)} rightRaw={Math.abs(r.sideralRotation ?? 0)}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d5" style={styles.statDividerH} />);
    rows.push(<StatRow key="luas" label="Luas"
      leftVal={String(l.moons?.length ?? 0)} rightVal={String(r.moons?.length ?? 0)}
      leftRaw={l.moons?.length ?? 0}         rightRaw={r.moons?.length ?? 0}
      leftAccent={la} rightAccent={ra} />);
    const le = PLANET_EXTRA[l.id]; const re = PLANET_EXTRA[r.id];
    if (le || re) {
      rows.push(<View key="d6" style={styles.statDividerH} />);
      rows.push(<StatRow key="temp" label="Temp. Média"
        leftVal={le ? `${le.avgTemp > 0 ? "+" : ""}${le.avgTemp}°C` : "—"}
        rightVal={re ? `${re.avgTemp > 0 ? "+" : ""}${re.avgTemp}°C` : "—"}
        leftRaw={le ? le.avgTemp + 300 : 0} rightRaw={re ? re.avgTemp + 300 : 0}
        leftAccent={la} rightAccent={ra} />);
      rows.push(<View key="d7" style={styles.statDividerH} />);
      rows.push(<StatRow key="dist" label="Dist. Sol" unit="UA"
        leftVal={le ? `${le.distanceAU}` : "—"} rightVal={re ? `${re.distanceAU}` : "—"}
        leftRaw={le ? le.distanceAU : 0}         rightRaw={re ? re.distanceAU : 0}
        leftAccent={la} rightAccent={ra} />);
    }
  } else {
    // ao menos um é estrela — mostra stats de estrela
    const getStarData = (item: CompareItem) => item.kind === "star" ? item.data : null;
    const ls = getStarData(left);
    const rs = getStarData(right);
    const lMass = ls ? ls.mass * 1.989e30 / 5.972e24 : (left.kind === "body" ? null : null); // em massas terrestres
    const rMass = rs ? rs.mass * 1.989e30 / 5.972e24 : null;

    rows.push(<View key="d1" style={styles.statDividerH} />);
    rows.push(<StatRow key="lum" label="Luminosidade" unit="L☉"
      leftVal={ls ? fmtNum(ls.luminosity) : "—"} rightVal={rs ? fmtNum(rs.luminosity) : "—"}
      leftRaw={ls?.luminosity ?? 0} rightRaw={rs?.luminosity ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d2" style={styles.statDividerH} />);
    rows.push(<StatRow key="mass" label="Massa" unit="M☉"
      leftVal={ls ? fmtNum(ls.mass) : "—"} rightVal={rs ? fmtNum(rs.mass) : "—"}
      leftRaw={ls?.mass ?? 0} rightRaw={rs?.mass ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d3" style={styles.statDividerH} />);
    rows.push(<StatRow key="temp" label="Temp. Sup." unit="K"
      leftVal={ls ? fmtNum(ls.surfaceTemp, 0) : "—"} rightVal={rs ? fmtNum(rs.surfaceTemp, 0) : "—"}
      leftRaw={ls?.surfaceTemp ?? 0} rightRaw={rs?.surfaceTemp ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d4" style={styles.statDividerH} />);
    rows.push(<StatRow key="dist" label="Distância" unit="a.l."
      leftVal={ls ? fmtNum(ls.distanceLy) : "—"} rightVal={rs ? fmtNum(rs.distanceLy) : "—"}
      leftRaw={ls?.distanceLy ?? 0} rightRaw={rs?.distanceLy ?? 0}
      leftAccent={la} rightAccent={ra} />);
    rows.push(<View key="d5" style={styles.statDividerH} />);
    rows.push(<StatRow key="age" label="Idade" unit="Ga"
      leftVal={ls?.age != null ? fmtNum(ls.age) : "—"} rightVal={rs?.age != null ? fmtNum(rs.age) : "—"}
      leftRaw={ls?.age ?? 0} rightRaw={rs?.age ?? 0}
      leftAccent={la} rightAccent={ra} />);
  }

  return <View style={styles.statsCard}>{rows}</View>;
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function PlanetComparisonScreen({ route }: PlanetComparisonProps) {
  const insets = useSafeAreaInsets();

  const [allItems, setAllItems]     = useState<CompareItem[]>([]);
  const [leftItem,  setLeftItem]    = useState<CompareItem | null>(null);
  const [rightItem, setRightItem]   = useState<CompareItem | null>(null);

  useEffect(() => {
    Promise.all([getBodies(), getStars()]).then(([bodies, stars]) => {
      const bodyItems: CompareItem[] = bodies.map(b => ({ kind: "body", data: b }));
      const starItems: CompareItem[] = stars.map(s => ({ kind: "star", data: s }));
      const all = [...bodyItems, ...starItems];
      setAllItems(all);

      const initial = route.params?.planet
        ? all.find(i => i.kind === "body" && i.data.id === route.params!.planet!.id) ?? all[0]
        : all.find(i => i.kind === "body" && (i.data as CelestialBody).id === "earth") ?? all[0];
      const other = all.find(i => itemId(i) !== itemId(initial)) ?? all[1];
      setLeftItem(initial);
      setRightItem(other);
    });
  }, []);

  if (!leftItem || !rightItem) {
    return (
      <View style={[styles.root, { alignItems: "center", justifyContent: "center" }]}>
        <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.spaceGrotesk }}>Carregando…</Text>
      </View>
    );
  }

  const leftAccent  = getAccent(leftItem);
  const rightAccent = getAccent(rightItem);
  const leftR  = getRadiusKm(leftItem);
  const rightR = getRadiusKm(rightItem);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* Seletores */}
      <View style={styles.selectorsRow}>
        <ItemPicker selected={leftItem}  onSelect={setLeftItem}  accent={leftAccent}  label="ITEM A" items={allItems} />
        <TouchableOpacity onPress={() => { setLeftItem(rightItem); setRightItem(leftItem); }} style={styles.swapBtn} activeOpacity={0.7}>
          <Text style={styles.swapIcon}>⇄</Text>
        </TouchableOpacity>
        <ItemPicker selected={rightItem} onSelect={setRightItem} accent={rightAccent} label="ITEM B" items={allItems} />
      </View>

      {/* Nomes */}
      <View style={styles.namesRow}>
        <Text style={[styles.planetName, { color: leftAccent }]} numberOfLines={1}>{itemName(leftItem)}</Text>
        <Text style={styles.vsText}>VS</Text>
        <Text style={[styles.planetName, { color: rightAccent }]} numberOfLines={1}>{itemName(rightItem)}</Text>
      </View>

      {/* Canvas 3D */}
      <View style={styles.canvasWrap}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <CompareScene left={leftItem} right={rightItem} />
        </Canvas>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.canvasLabels}>
            <View style={[styles.canvasTag, { borderColor: leftAccent + "55" }]}>
              <Text style={[styles.canvasTagText, { color: leftAccent }]}>
                {leftR != null ? `${(leftR / EARTH_RADIUS_KM).toFixed(2)}× Terra` : itemName(leftItem)}
              </Text>
            </View>
            <View style={[styles.canvasTag, { borderColor: rightAccent + "55" }]}>
              <Text style={[styles.canvasTagText, { color: rightAccent }]}>
                {rightR != null ? `${(rightR / EARTH_RADIUS_KM).toFixed(2)}× Terra` : itemName(rightItem)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabela de stats */}
      <ScrollView style={styles.statsScroll} contentContainerStyle={styles.statsContent} showsVerticalScrollIndicator={false}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderLabel}>DADO</Text>
          <View style={styles.tableHeaderSides}>
            <Text style={[styles.tableHeaderSide, { color: leftAccent }]} numberOfLines={1}>{itemName(leftItem)}</Text>
            <Text style={[styles.tableHeaderSide, { color: rightAccent, textAlign: "right" }]} numberOfLines={1}>{itemName(rightItem)}</Text>
          </View>
        </View>

        <StatsTable left={leftItem} right={rightItem} />

        {/* Luas — só para corpos */}
        {leftItem.kind === "body" && rightItem.kind === "body" &&
         ((leftItem.data.moons?.length ?? 0) > 0 || (rightItem.data.moons?.length ?? 0) > 0) && (
          <View style={styles.moonsCard}>
            <Text style={styles.moonsTitle}>🌙 Luas</Text>
            <View style={styles.moonsRow}>
              <View style={styles.moonsSide}>
                <Text style={[styles.moonsPlanet, { color: leftAccent }]}>{itemName(leftItem)}</Text>
                {(leftItem.data.moons ?? []).slice(0, 6).map(m => (
                  <Text key={m.moon} style={styles.moonName}>{m.moon}</Text>
                ))}
                {(leftItem.data.moons?.length ?? 0) > 6 && (
                  <Text style={styles.moonMore}>+{(leftItem.data.moons?.length ?? 0) - 6} mais</Text>
                )}
                {!leftItem.data.moons?.length && <Text style={styles.moonName}>Nenhuma</Text>}
              </View>
              <View style={styles.moonsDivider} />
              <View style={[styles.moonsSide, styles.moonsSideRight]}>
                <Text style={[styles.moonsPlanet, { color: rightAccent }]}>{itemName(rightItem)}</Text>
                {(rightItem.data.moons ?? []).slice(0, 6).map(m => (
                  <Text key={m.moon} style={[styles.moonName, { textAlign: "right" }]}>{m.moon}</Text>
                ))}
                {(rightItem.data.moons?.length ?? 0) > 6 && (
                  <Text style={[styles.moonMore, { textAlign: "right" }]}>+{(rightItem.data.moons?.length ?? 0) - 6} mais</Text>
                )}
                {!rightItem.data.moons?.length && <Text style={[styles.moonName, { textAlign: "right" }]}>Nenhuma</Text>}
              </View>
            </View>
          </View>
        )}

        {/* Info estrela */}
        {(leftItem.kind === "star" || rightItem.kind === "star") && (
          <View style={[styles.moonsCard, { marginTop: 0 }]}>
            <Text style={styles.moonsTitle}>✦ Classe Estelar</Text>
            <View style={styles.moonsRow}>
              {[leftItem, rightItem].map((item, idx) => (
                <View key={idx} style={[styles.moonsSide, idx === 1 && styles.moonsSideRight]}>
                  {item.kind === "star" ? (
                    <>
                      <Text style={[styles.moonsPlanet, { color: getAccent(item) }]}>{item.data.name}</Text>
                      <Text style={styles.moonName}>{item.data.starClass}</Text>
                      <Text style={styles.moonName}>Tipo {item.data.spectralType}</Text>
                      <Text style={styles.moonName}>{item.data.constellation}</Text>
                    </>
                  ) : (
                    <Text style={[styles.moonName, idx === 1 && { textAlign: "right" }]}>—</Text>
                  )}
                </View>
              ))}
              <View style={styles.moonsDivider} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

