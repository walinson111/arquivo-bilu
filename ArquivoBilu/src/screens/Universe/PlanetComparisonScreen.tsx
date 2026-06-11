import { useNavigation } from "@react-navigation/native";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Canvas, useFrame, useLoader } from "@react-three/fiber/native";
import { TextureLoader, THREE } from "expo-three";
import { Asset } from "expo-asset";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { PLANET_TEXTURES } from "../../constants/textures";
import { getBodies } from "../../services/solarSystemApi";
import type { CelestialBody } from "../../services/solarSystemApi";
import type { PlanetComparisonProps } from "../../navigation/types";

// ─── Dados extras que não estão na API (temperaturas médias) ──────────────────

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

// ─── Planeta 3D ───────────────────────────────────────────────────────────────

function PlanetMesh({
  texturePath,
  scale,
  position,
  speed = 0.004,
}: {
  texturePath: number;
  scale: number;
  position: [number, number, number];
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useLoader(
    TextureLoader,
    Asset.fromModule(texturePath).uri
  ) as THREE.Texture;

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += speed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function PlanetScene({
  leftPlanet,
  rightPlanet,
}: {
  leftPlanet: CelestialBody;
  rightPlanet: CelestialBody;
}) {
  const EARTH_RADIUS = 6371;

  const scaleFor = (p: CelestialBody) => {
    if (p.meanRadius == null) return 1;
    const ratio = p.meanRadius / EARTH_RADIUS;
    return Math.max(0.25, Math.min(Math.log2(ratio + 1) + 0.5, 4.5));
  };

  const leftScale  = scaleFor(leftPlanet);
  const rightScale = scaleFor(rightPlanet);
  const maxScale   = Math.max(leftScale, rightScale);
  const norm       = 2.2 / maxScale;

  const leftTex  = PLANET_TEXTURES[leftPlanet.id.toLowerCase()]  ?? PLANET_TEXTURES.earth;
  const rightTex = PLANET_TEXTURES[rightPlanet.id.toLowerCase()] ?? PLANET_TEXTURES.earth;

  return (
    <>
      <ambientLight intensity={1.8} />
      <pointLight position={[10, 10, 10]} intensity={25} />
      <pointLight position={[-8, -5, 8]}  intensity={8} color="#4488ff" />
      <Suspense fallback={null}>
        <PlanetMesh
          texturePath={leftTex}
          scale={leftScale * norm}
          position={[-3.2, 0, 0]}
          speed={0.005}
        />
        <PlanetMesh
          texturePath={rightTex}
          scale={rightScale * norm}
          position={[3.2, 0, 0]}
          speed={0.003}
        />
      </Suspense>
    </>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

function PlanetPicker({
  selected,
  onSelect,
  accent,
  label,
  planets,
}: {
  selected: CelestialBody;
  onSelect: (p: CelestialBody) => void;
  accent: string;
  label: string;
  planets: CelestialBody[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.pickerWrap}>
      <Text style={[styles.pickerLabel, { color: accent }]}>{label}</Text>
      <TouchableOpacity
        onPress={() => setOpen((v) => !v)}
        style={[styles.pickerBtn, { borderColor: accent + "55" }]}
        activeOpacity={0.8}
      >
        <Text style={styles.pickerBtnText} numberOfLines={1}>
          {selected.englishName}
        </Text>
        <Text style={{ color: accent, fontSize: 12 }}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={[styles.pickerDropdown, { borderColor: accent + "33" }]}>
          {planets.map((p) => (
            <TouchableOpacity
              key={p.id}
              onPress={() => { onSelect(p); setOpen(false); }}
              style={[
                styles.pickerItem,
                p.id === selected.id && { backgroundColor: accent + "22" },
              ]}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.pickerItemText,
                p.id === selected.id && { color: accent },
              ]}>
                {p.englishName}
              </Text>
              {p.id === selected.id && (
                <Text style={{ color: accent, fontSize: 11 }}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Linha de stat com barra comparativa ──────────────────────────────────────

function StatRow({
  label,
  leftVal,
  rightVal,
  leftRaw,
  rightRaw,
  leftAccent,
  rightAccent,
  unit,
}: {
  label: string;
  leftVal: string;
  rightVal: string;
  leftRaw: number;
  rightRaw: number;
  leftAccent: string;
  rightAccent: string;
  unit?: string;
}) {
  const max = Math.max(leftRaw, rightRaw, 0.001);
  const leftPct  = (leftRaw  / max) * 100;
  const rightPct = (rightRaw / max) * 100;

  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <View style={styles.statBars}>
        {/* Esquerda */}
        <View style={styles.statSide}>
          <Text style={[styles.statVal, { color: leftAccent }]}>{leftVal}{unit ? ` ${unit}` : ""}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${leftPct}%` as any, backgroundColor: leftAccent }]} />
          </View>
        </View>

        {/* Divisor */}
        <View style={styles.statDivider} />

        {/* Direita */}
        <View style={[styles.statSide, styles.statSideRight]}>
          <Text style={[styles.statVal, { color: rightAccent }]}>{rightVal}{unit ? ` ${unit}` : ""}</Text>
          <View style={styles.barTrack}>
            <View style={[styles.barFillRight, { width: `${rightPct}%` as any, backgroundColor: rightAccent }]} />
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtOrbit(days: number | null): string {
  if (days == null) return "—";
  if (days < 366) return `${days.toFixed(1)} dias`;
  return `${(days / 365.25).toFixed(2)} anos`;
}

function fmtRotation(hours: number | null): string {
  if (hours == null) return "—";
  const retrograde = hours < 0;
  const abs = Math.abs(hours);
  const label = abs < 24 ? `${abs.toFixed(1)} h` : `${(abs / 24).toFixed(2)} d`;
  return retrograde ? `${label} ↺` : label;
}

function getPlanetAccent(id: string): string {
  const accents: Record<string, string> = {
    mercury: "#B0B0C0",
    venus:   "#E8C97E",
    earth:   "#4DA6FF",
    mars:    "#E8704A",
    jupiter: "#C88B5A",
    saturn:  "#E4C97A",
    uranus:  "#72D9DE",
    neptune: "#5B7FD4",
    pluto:   "#A0A0C0",
    eris:    "#C0C0D0",
    makemake:"#D4B090",
    haumea:  "#90B0C0",
    ceres:   "#A09880",
  };
  return accents[id.toLowerCase()] ?? Colors.biluGreen;
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function PlanetComparisonScreen({ route }: PlanetComparisonProps) {
  const insets     = useSafeAreaInsets();
  const navigation = useNavigation();

  const [allPlanets, setAllPlanets] = useState<CelestialBody[]>([]);
  const [leftPlanet,  setLeftPlanet]  = useState<CelestialBody | null>(null);
  const [rightPlanet, setRightPlanet] = useState<CelestialBody | null>(null);

  useEffect(() => {
    getBodies().then((bodies) => {
      const planets = bodies.filter(
        (b: CelestialBody) => b.bodyType === "planet" || b.bodyType === "dwarf_planet"
      );
      setAllPlanets(planets);
      const initial = route.params?.planet ?? planets.find((p: CelestialBody) => p.id === "earth") ?? planets[0];
      const other   = planets.find((p: CelestialBody) => p.id !== initial.id) ?? planets[1];
      setLeftPlanet(initial);
      setRightPlanet(other);
    });
  }, []);

  if (!leftPlanet || !rightPlanet) {
    return (
      <View style={[styles.root, { alignItems: "center", justifyContent: "center" }]}>
        <Text style={{ color: Colors.textSecondary, fontFamily: Fonts.spaceGrotesk }}>
          Carregando planetas…
        </Text>
      </View>
    );
  }

  function swapPlanets() {
    setLeftPlanet(rightPlanet);
    setRightPlanet(leftPlanet);
  }

  const EARTH_R    = 6371;
  const leftAccent  = getPlanetAccent(leftPlanet.id);
  const rightAccent = getPlanetAccent(rightPlanet.id);
  const leftExtra   = PLANET_EXTRA[leftPlanet.id]  ?? null;
  const rightExtra  = PLANET_EXTRA[rightPlanet.id] ?? null;
  const leftRatio   = leftPlanet.meanRadius  != null ? leftPlanet.meanRadius  / EARTH_R : null;
  const rightRatio  = rightPlanet.meanRadius != null ? rightPlanet.meanRadius / EARTH_R : null;

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      {/* ── Seletores ── */}
      <View style={styles.selectorsRow}>
        <PlanetPicker
          selected={leftPlanet}
          onSelect={setLeftPlanet}
          accent={leftAccent}
          label="PLANETA A"
          planets={allPlanets}
        />

        <TouchableOpacity onPress={swapPlanets} style={styles.swapBtn} activeOpacity={0.7}>
          <Text style={styles.swapIcon}>⇄</Text>
        </TouchableOpacity>

        <PlanetPicker
          selected={rightPlanet}
          onSelect={setRightPlanet}
          accent={rightAccent}
          label="PLANETA B"
          planets={allPlanets}
        />
      </View>

      {/* ── Nomes ── */}
      <View style={styles.namesRow}>
        <Text style={[styles.planetName, { color: leftAccent }]} numberOfLines={1}>
          {leftPlanet.englishName}
        </Text>
        <Text style={styles.vsText}>VS</Text>
        <Text style={[styles.planetName, { color: rightAccent }]} numberOfLines={1}>
          {rightPlanet.englishName}
        </Text>
      </View>

      {/* ── Canvas 3D ── */}
      <View style={styles.canvasWrap}>
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <PlanetScene leftPlanet={leftPlanet} rightPlanet={rightPlanet} />
        </Canvas>

        {/* Labels sobre os planetas */}
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.canvasLabels}>
            <View style={[styles.canvasTag, { borderColor: leftAccent + "55" }]}>
              <Text style={[styles.canvasTagText, { color: leftAccent }]}>
                {leftRatio != null ? `${leftRatio.toFixed(2)}× Terra` : leftPlanet.englishName}
              </Text>
            </View>
            <View style={[styles.canvasTag, { borderColor: rightAccent + "55" }]}>
              <Text style={[styles.canvasTagText, { color: rightAccent }]}>
                {rightRatio != null ? `${rightRatio.toFixed(2)}× Terra` : rightPlanet.englishName}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Tabela de stats ── */}
      <ScrollView
        style={styles.statsScroll}
        contentContainerStyle={styles.statsContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho da tabela */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderLabel}>DADO</Text>
          <View style={styles.tableHeaderSides}>
            <Text style={[styles.tableHeaderSide, { color: leftAccent }]} numberOfLines={1}>
              {leftPlanet.englishName}
            </Text>
            <Text style={[styles.tableHeaderSide, { color: rightAccent, textAlign: "right" }]} numberOfLines={1}>
              {rightPlanet.englishName}
            </Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <StatRow
            label="Raio"
            leftVal={leftPlanet.meanRadius != null ? leftPlanet.meanRadius.toLocaleString("pt-BR") : "—"}
            rightVal={rightPlanet.meanRadius != null ? rightPlanet.meanRadius.toLocaleString("pt-BR") : "—"}
            leftRaw={leftPlanet.meanRadius   ?? 0}
            rightRaw={rightPlanet.meanRadius ?? 0}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
            unit="km"
          />
          <View style={styles.statDividerH} />

          <StatRow
            label="Gravidade"
            leftVal={leftPlanet.gravity  != null ? `${leftPlanet.gravity}` : "—"}
            rightVal={rightPlanet.gravity != null ? `${rightPlanet.gravity}` : "—"}
            leftRaw={leftPlanet.gravity   ?? 0}
            rightRaw={rightPlanet.gravity ?? 0}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
            unit="m/s²"
          />
          <View style={styles.statDividerH} />

          <StatRow
            label="Densidade"
            leftVal={leftPlanet.density  != null ? `${leftPlanet.density}` : "—"}
            rightVal={rightPlanet.density != null ? `${rightPlanet.density}` : "—"}
            leftRaw={leftPlanet.density   ?? 0}
            rightRaw={rightPlanet.density ?? 0}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
            unit="g/cm³"
          />
          <View style={styles.statDividerH} />

          <StatRow
            label="Órbita"
            leftVal={fmtOrbit(leftPlanet.sideralOrbit)}
            rightVal={fmtOrbit(rightPlanet.sideralOrbit)}
            leftRaw={leftPlanet.sideralOrbit   ?? 0}
            rightRaw={rightPlanet.sideralOrbit ?? 0}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
          />
          <View style={styles.statDividerH} />

          <StatRow
            label="Rotação"
            leftVal={fmtRotation(leftPlanet.sideralRotation)}
            rightVal={fmtRotation(rightPlanet.sideralRotation)}
            leftRaw={Math.abs(leftPlanet.sideralRotation  ?? 0)}
            rightRaw={Math.abs(rightPlanet.sideralRotation ?? 0)}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
          />
          <View style={styles.statDividerH} />

          <StatRow
            label="Luas"
            leftVal={String(leftPlanet.moons?.length  ?? 0)}
            rightVal={String(rightPlanet.moons?.length ?? 0)}
            leftRaw={leftPlanet.moons?.length   ?? 0}
            rightRaw={rightPlanet.moons?.length ?? 0}
            leftAccent={leftAccent}
            rightAccent={rightAccent}
          />

          {(leftExtra || rightExtra) && (
            <>
              <View style={styles.statDividerH} />
              <StatRow
                label="Temp. Média"
                leftVal={leftExtra  ? `${leftExtra.avgTemp > 0 ? "+" : ""}${leftExtra.avgTemp}°C` : "—"}
                rightVal={rightExtra ? `${rightExtra.avgTemp > 0 ? "+" : ""}${rightExtra.avgTemp}°C` : "—"}
                leftRaw={leftExtra  ? leftExtra.avgTemp  + 300 : 0}
                rightRaw={rightExtra ? rightExtra.avgTemp + 300 : 0}
                leftAccent={leftAccent}
                rightAccent={rightAccent}
              />
              <View style={styles.statDividerH} />
              <StatRow
                label="Dist. do Sol"
                leftVal={leftExtra  ? `${leftExtra.distanceAU} UA` : "—"}
                rightVal={rightExtra ? `${rightExtra.distanceAU} UA` : "—"}
                leftRaw={leftExtra  ? leftExtra.distanceAU  : 0}
                rightRaw={rightExtra ? rightExtra.distanceAU : 0}
                leftAccent={leftAccent}
                rightAccent={rightAccent}
              />
            </>
          )}
        </View>

        {/* Rodapé com luas */}
        {(leftPlanet.moons?.length || rightPlanet.moons?.length) ? (
          <View style={styles.moonsCard}>
            <Text style={styles.moonsTitle}>🌙 Luas</Text>
            <View style={styles.moonsRow}>
              <View style={styles.moonsSide}>
                <Text style={[styles.moonsPlanet, { color: leftAccent }]}>{leftPlanet.englishName}</Text>
                {(leftPlanet.moons ?? []).slice(0, 6).map((m) => (
                  <Text key={m.moon} style={styles.moonName}>{m.moon}</Text>
                ))}
                {(leftPlanet.moons?.length ?? 0) > 6 && (
                  <Text style={styles.moonMore}>+{(leftPlanet.moons?.length ?? 0) - 6} mais</Text>
                )}
                {!leftPlanet.moons?.length && (
                  <Text style={styles.moonName}>Nenhuma</Text>
                )}
              </View>
              <View style={styles.moonsDivider} />
              <View style={[styles.moonsSide, styles.moonsSideRight]}>
                <Text style={[styles.moonsPlanet, { color: rightAccent }]}>{rightPlanet.englishName}</Text>
                {(rightPlanet.moons ?? []).slice(0, 6).map((m) => (
                  <Text key={m.moon} style={[styles.moonName, { textAlign: "right" }]}>{m.moon}</Text>
                ))}
                {(rightPlanet.moons?.length ?? 0) > 6 && (
                  <Text style={[styles.moonMore, { textAlign: "right" }]}>+{(rightPlanet.moons?.length ?? 0) - 6} mais</Text>
                )}
                {!rightPlanet.moons?.length && (
                  <Text style={[styles.moonName, { textAlign: "right" }]}>Nenhuma</Text>
                )}
              </View>
            </View>
          </View>
        ) : null}
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

  // ── Seletores ──────────────────────────────────────────────────────────────
  selectorsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 8,
    zIndex: 100,
  },
  pickerWrap: {
    flex: 1,
    zIndex: 100,
  },
  pickerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  pickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(30,41,59,0.8)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  pickerBtnText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },
  pickerDropdown: {
    position: "absolute",
    top: 66,
    left: 0,
    right: 0,
    backgroundColor: "rgba(15,23,42,0.98)",
    borderWidth: 1,
    borderRadius: 12,
    zIndex: 200,
    overflow: "hidden",
    maxHeight: 260,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  pickerItemText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // ── Swap ───────────────────────────────────────────────────────────────────
  swapBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(30,41,59,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  swapIcon: {
    fontSize: 18,
    color: Colors.textSecondary,
  },

  // ── Nomes ─────────────────────────────────────────────────────────────────
  namesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  planetName: {
    fontFamily: Fonts.orbitron,
    fontSize: 15,
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  vsText: {
    fontFamily: Fonts.orbitron,
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // ── Canvas ────────────────────────────────────────────────────────────────
  canvasWrap: {
    height: 220,
    marginHorizontal: 0,
  },
  canvasLabels: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
  },
  canvasTag: {
    backgroundColor: "rgba(2,6,23,0.75)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  canvasTagText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
  },

  // ── Stats ─────────────────────────────────────────────────────────────────
  statsScroll: {
    flex: 1,
  },
  statsContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  tableHeaderLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    width: 80,
  },
  tableHeaderSides: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeaderSide: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 1,
    flex: 1,
  },

  statsCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  statRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
    width: 68,
    letterSpacing: 0.2,
  },
  statBars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statSide: {
    flex: 1,
    gap: 4,
  },
  statSideRight: {
    alignItems: "flex-end",
  },
  statVal: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 11,
  },
  barTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  barFillRight: {
    height: 4,
    borderRadius: 2,
    alignSelf: "flex-end",
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  statDividerH: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 14,
  },

  // ── Luas ──────────────────────────────────────────────────────────────────
  moonsCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
  },
  moonsTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  moonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  moonsSide: {
    flex: 1,
    gap: 4,
  },
  moonsSideRight: {
    alignItems: "flex-end",
  },
  moonsDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  moonsPlanet: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 12,
    marginBottom: 4,
  },
  moonName: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  moonMore: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
    color: Colors.textSecondary,
    opacity: 0.6,
    marginTop: 2,
  },
});