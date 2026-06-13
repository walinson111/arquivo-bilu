import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Image,
  Pressable,

  Text,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { feedbackStyles, layoutStyles } from "../../theme/styles";
import { universeStyles as styles } from "./UniverseScreen.styles";
import { Fonts } from "../../theme/fonts";
import { getBodies, getStars } from "../../services/solarSystemApi";
import type { CelestialBody, Star } from "../../services/solarSystemApi";
import { getBodyImage } from "../../constants/bodyImages";
import { LinearGradient } from "expo-linear-gradient";

// ─── Dados visuais por ID ─────────────────────────────────────────────────────

const BODY_VISUALS: Record<string, { emoji: string; accent: string; label: string }> = {
  mercury:  { emoji: "☿",  accent: "#94A3B8", label: "Rochoso"    },
  venus:    { emoji: "♀",  accent: "#D4A017", label: "Nublado"    },
  earth:    { emoji: "🌍", accent: "#22C55E", label: "Habitável"  },
  mars:     { emoji: "🔴", accent: "#EF4444", label: "Desértico"  },
  jupiter:  { emoji: "🪐", accent: "#FB923C", label: "Gasoso"     },
  saturn:   { emoji: "💫", accent: "#D4A017", label: "Anelado"    },
  uranus:   { emoji: "🔵", accent: "#38BDF8", label: "Gelado"     },
  neptune:  { emoji: "🌊", accent: "#6366F1", label: "Gelado"     },
  pluto:    { emoji: "🩵", accent: "#93C5FD", label: "Plutiniano" },
  eris:     { emoji: "⚪", accent: "#CBD5E1", label: "Disco Esp." },
  makemake: { emoji: "🟤", accent: "#B45309", label: "TNO"        },
  haumea:   { emoji: "🥚", accent: "#A78BFA", label: "TNO"        },
  ceres:    { emoji: "⚫", accent: "#78716C", label: "Cinto Ast." },
  vesta:    { emoji: "🪨", accent: "#A8A29E", label: "Asteroide"  },
  pallas:   { emoji: "🪨", accent: "#9CA3AF", label: "Asteroide"  },
  hygiea:   { emoji: "🪨", accent: "#6B7280", label: "Asteroide"  },
  apophis:  { emoji: "⚠️", accent: "#F97316", label: "NEO"        },
  halley:        { emoji: "☄️", accent: "#67E8F9", label: "Periódico"  },
  churyumov:     { emoji: "☄️", accent: "#A5F3FC", label: "Periódico"  },
  "hale-bopp":   { emoji: "☄️", accent: "#E0F2FE", label: "Longo Per." },
  encke:         { emoji: "☄️", accent: "#BAE6FD", label: "Periódico"  },
};

const TYPE_FALLBACK: Record<string, { emoji: string; accent: string; label: string }> = {
  planet:       { emoji: "🪐", accent: Colors.nebulaPurple, label: "Planeta"   },
  dwarf_planet: { emoji: "🔮", accent: "#93C5FD",           label: "Anão"      },
  asteroid:     { emoji: "🪨", accent: "#A8A29E",           label: "Asteroide" },
  comet:        { emoji: "☄️", accent: "#67E8F9",           label: "Cometa"    },
};

function getBodyVisual(item: CelestialBody) {
  return BODY_VISUALS[item.id] ?? TYPE_FALLBACK[item.bodyType] ?? TYPE_FALLBACK.planet;
}

// ─── Card do Sistema Solar 3D ─────────────────────────────────────────────────
const planets = [
  require("../../../assets/textures/saturn.jpg"),
  require("../../../assets/textures/earth.jpg"),
  require("../../../assets/textures/mars.jpg"),
  require("../../../assets/textures/neptune.jpg"),
];

function SolarSystemCard({ onPress }: { onPress: () => void }) {
  const scaleAnim = useRef(new Animated.Value(0.96)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const orbitAnim = useRef(new Animated.Value(0)).current;
  const orbitRotate1 = orbitAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

const orbitRotate2 = orbitAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "-360deg"],
});

const orbitRotate3 = orbitAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "180deg"],
});

const rotate = orbitAnim.interpolate({
  inputRange: [0, 1],
  outputRange: ["0deg", "360deg"],
});

useEffect(() => {
  let animation: Animated.CompositeAnimation;

  function startLoop() {
    orbitAnim.setValue(0);
    animation = Animated.timing(orbitAnim, {
      toValue: 1,
      duration: 15000,
      useNativeDriver: true,
    });
    animation.start(({ finished }) => {
      if (finished) startLoop();
    });
  }

  startLoop();

  return () => {
    animation?.stop();
  };
}, []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        speed: 14,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ scale: scaleAnim }],
      }}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.solarCard,
          { opacity: pressed ? 0.88 : 1 },
        ]}
        android_ripple={{ color: Colors.cosmicBlue + "22" }}
      >
        {/* Planetas decorativos */}
        <View style={styles.solarCardBg} pointerEvents="none">
          {planets.map((planet, i) => {
            const size = 30 - i * 3;

            return (
              <Image
                key={i}
                source={planet}
                resizeMode="cover"
                style={[
                  styles.bgPlanet,
                  {
                    width: size,
                    height: size,
                    right: 12 + i * 30,
                    top: 8 + (i % 2) * 14,
                    opacity: 0.18 + i * 0.06,
                  },
                ]}
              />
            );
          })}
        </View>

       <View style={styles.solarCardContent}>
  <View style={styles.solarCardLeft}>
    <View style={styles.solarIconWrap}>
      <LinearGradient
        colors={["#FFD54F", "#FF9800"]}
        style={styles.sunCore}
      />

<Animated.View
  style={[
    styles.orbit1,
    {
      transform: [{ rotate }],
    },
  ]}
>
  <View style={styles.planetBlue} />
</Animated.View>

<Animated.View
  style={[
    styles.orbit2,
    { transform: [{ rotate: orbitRotate2 }] },
  ]}
>
  <View style={styles.planetRed} />
</Animated.View>

<Animated.View
  style={[
    styles.orbit3,
    { transform: [{ rotate: orbitRotate3 }] },
  ]}
>
  <View style={styles.planetGreen} />
</Animated.View>

</View>

<View style={styles.solarBadge}>
  <Text style={styles.solarBadgeText}>3D</Text>
</View>
  </View>

  <View style={styles.solarCardBody}>
    <Text style={styles.solarTitle}>Sistema Solar</Text>
    <Text style={styles.solarSub}>
      Explore os planetas em visualização tridimensional interativa
    </Text>
  </View>

  <View style={styles.solarArrowWrap}>
  <Ionicons
    name="chevron-forward"
    size={20}
    color={Colors.cosmicBlue}
  />
</View>

</View>

<View style={styles.solarGlowLine} />

</Pressable>
    </Animated.View>
  );
}



// ─── Card de corpo celeste ────────────────────────────────────────────────────

function BodyCard({ item, index, onPress }: { item: CelestialBody; index: number; onPress: () => void }) {
  const visual    = getBodyVisual(item);
  const bodyImage = getBodyImage(item.id);
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, delay: (index % 10) * 50, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: (index % 10) * 50, useNativeDriver: true }),
    ]).start();
  }, []);

  const barPercent =
    item.bodyType === "planet"      ? Math.min(Math.round(((item.gravity ?? 0) / 25) * 100), 100) :
    item.bodyType === "dwarf_planet"? Math.min(Math.round(((item.meanRadius ?? 0) / 1200) * 100), 100) :
    item.bodyType === "asteroid"    ? Math.min(Math.round(((item.meanRadius ?? 0) / 270) * 100), 100) :
    Math.min(Math.round(((item.density ?? 0) / 1) * 100), 100);

  const barLabel =
    item.bodyType === "planet" ? "Gravidade" :
    item.bodyType === "comet"  ? "Densidade" : "Tamanho";

  const statValue =
    item.bodyType === "comet"    ? (item.sideralOrbit != null ? `${item.sideralOrbit.toLocaleString()} dias` : "—") :
    item.bodyType === "asteroid" ? (item.meanRadius != null ? `${item.meanRadius} km` : "—") :
    (item.gravity != null ? `${item.gravity} m/s²` : "—");

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, { borderColor: visual.accent + "30", opacity: pressed ? 0.85 : 1 }]}
        android_ripple={{ color: visual.accent + "22" }}
      >
        <View style={[styles.emojiWrap, { backgroundColor: visual.accent + "18", borderColor: visual.accent + "33" }]}>
          {bodyImage ? (
            <Image source={bodyImage} style={styles.bodyImage} />
          ) : (
            <Text style={styles.emoji}>{visual.emoji}</Text>
          )}
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.bodyName} numberOfLines={1}>{item.englishName}</Text>
            <View style={[styles.badge, { backgroundColor: visual.accent + "1A", borderColor: visual.accent + "44" }]}>
              <Text style={[styles.badgeText, { color: visual.accent }]}>{visual.label}</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>{barLabel}</Text>
            <Text style={[styles.statValue, { color: visual.accent }]}>{statValue}</Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${barPercent}%` as any, backgroundColor: visual.accent }]} />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ alignSelf: "center" }} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Card de estrela ──────────────────────────────────────────────────────────

function StarCard({ star, index, onPress }: { star: Star; index: number; onPress: () => void }) {
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const starImage = getBodyImage(star.id);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 400, delay: index * 60, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, delay: index * 60, useNativeDriver: true }),
    ]).start();
  }, []);

  const distanceDisplay =
    star.distanceLy < 1
      ? `${(star.distanceLy * 63241).toFixed(0)} UA`
      : `${star.distanceLy} al`;

  const tempPercent = Math.min(Math.round(((star.surfaceTemp - 2000) / 28000) * 100), 100);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, { borderColor: star.accent + "30", opacity: pressed ? 0.85 : 1 }]}
        android_ripple={{ color: star.accent + "22" }}
      >
        <View style={[styles.emojiWrap, { backgroundColor: star.accent + "18", borderColor: star.accent + "33" }]}>
          {starImage ? (
            <Image source={starImage} style={styles.bodyImage} />
          ) : (
            <Text style={styles.emoji}>{star.emoji}</Text>
          )}
        </View>
        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.bodyName} numberOfLines={1}>{star.name}</Text>
            <View style={[styles.badge, { backgroundColor: star.accent + "1A", borderColor: star.accent + "44" }]}>
              <Text style={[styles.badgeText, { color: star.accent }]}>{star.starClass.split(" ").slice(-1)[0]}</Text>
            </View>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Temperatura</Text>
            <Text style={[styles.statValue, { color: star.accent }]}>
              {star.surfaceTemp.toLocaleString("pt-BR")} K · {distanceDisplay}
            </Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${tempPercent}%` as any, backgroundColor: star.accent }]} />
          </View>
        </View>
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ alignSelf: "center" }} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Divisor de seção ─────────────────────────────────────────────────────────

function SectionDivider({ label, count, emoji }: { label: string; count: number; emoji: string }) {
  return (
    <View style={styles.sectionDivider}>
      <View style={styles.dividerLine} />
      <View style={styles.dividerContent}>
        <Text style={styles.dividerEmoji}>{emoji}</Text>
        <Text style={styles.dividerText}>{label}</Text>
        <View style={styles.dividerCount}>
          <Text style={styles.dividerCountText}>{count}</Text>
        </View>
      </View>
      <View style={styles.dividerLine} />
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function UniverseScreen() {
  const [planets,   setPlanets]   = useState<CelestialBody[]>([]);
  const [dwarfs,    setDwarfs]    = useState<CelestialBody[]>([]);
  const [asteroids, setAsteroids] = useState<CelestialBody[]>([]);
  const [comets,    setComets]    = useState<CelestialBody[]>([]);
  const [stars,     setStars]     = useState<Star[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(false);
  const navigation = useNavigation<any>();

  const PLANET_ORDER = ["mercury","venus","earth","mars","jupiter","saturn","uranus","neptune"];
  const DWARF_ORDER  = ["pluto","eris","makemake","haumea","ceres"];

  async function loadAll() {
    try {
      setLoading(true);
      setError(false);
      const [bodies, starList] = await Promise.all([getBodies(), getStars()]);

      setPlanets(bodies
        .filter(b => b.bodyType === "planet")
        .sort((a, b) => PLANET_ORDER.indexOf(a.id) - PLANET_ORDER.indexOf(b.id)));
      setDwarfs(bodies
        .filter(b => b.bodyType === "dwarf_planet")
        .sort((a, b) => DWARF_ORDER.indexOf(a.id) - DWARF_ORDER.indexOf(b.id)));
      setAsteroids(bodies.filter(b => b.bodyType === "asteroid"));
      setComets(bodies.filter(b => b.bodyType === "comet"));
      setStars(starList);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadAll(); }, []);

  if (loading) {
    return (
      <View style={feedbackStyles.centered}>
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={feedbackStyles.loadingText}>MAPEANDO O UNIVERSO...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={feedbackStyles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>🛸</Text>
        <Text style={feedbackStyles.errorTitle}>Sinal perdido</Text>
        <Pressable onPress={loadAll} style={feedbackStyles.retryBtn}>
          <Text style={feedbackStyles.retryText}>TENTAR NOVAMENTE</Text>
        </Pressable>
      </View>
    );
  }

  const total = planets.length + dwarfs.length + asteroids.length + comets.length + stars.length;

  type ListItem =
    | { kind: "solar_card" }
    | { kind: "divider"; label: string; count: number; emoji: string }
    | { kind: "body"; data: CelestialBody; index: number }
    | { kind: "star"; data: Star; index: number };

  const listData: ListItem[] = [
    { kind: "solar_card" },
    { kind: "divider", label: "PLANETAS",        count: planets.length,   emoji: "🪐" },
    ...planets.map((p, i)   => ({ kind: "body" as const, data: p, index: i })),
    { kind: "divider", label: "PLANETAS-ANÕES",  count: dwarfs.length,    emoji: "🔮" },
    ...dwarfs.map((d, i)    => ({ kind: "body" as const, data: d, index: i })),
    { kind: "divider", label: "ASTEROIDES",      count: asteroids.length, emoji: "🪨" },
    ...asteroids.map((a, i) => ({ kind: "body" as const, data: a, index: i })),
    { kind: "divider", label: "COMETAS",         count: comets.length,    emoji: "☄️" },
    ...comets.map((c, i)    => ({ kind: "body" as const, data: c, index: i })),
    { kind: "divider", label: "ESTRELAS FAMOSAS",count: stars.length,     emoji: "⭐" },
    ...stars.map((s, i)     => ({ kind: "star" as const, data: s, index: i })),
  ];

  return (
    <View style={layoutStyles.root}>
      <FlatList
        data={listData}
        keyExtractor={(item, idx) =>
          item.kind === "body"    ? item.data.id :
          item.kind === "star"    ? `star-${item.data.id}` :
          item.kind === "divider" ? `div-${item.label}` :
          `solar-${idx}`
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>EXPLORADOR</Text>
            <Text style={styles.headerTitle}>Universo</Text>
            <Text style={styles.headerSub}>{total} objetos celestes mapeados</Text>
          </View>
        }
        renderItem={({ item }) => {
          if (item.kind === "solar_card") {
            return <SolarSystemCard onPress={() => navigation.navigate("SolarSystem")} />;
          }
          if (item.kind === "divider") {
            return <SectionDivider label={item.label} count={item.count} emoji={item.emoji} />;
          }
          if (item.kind === "star") {
            return (
              <StarCard
                star={item.data}
                index={item.index}
                onPress={() => navigation.navigate("StarDetails", { star: item.data })}
              />
            );
          }
          return (
            <BodyCard
              item={item.data}
              index={item.index}
              onPress={() => navigation.navigate("PlanetDetails", { planet: item.data })}
            />
          );
        }}
      />
    </View>
  );
}

