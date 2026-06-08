import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { getBodies } from "../../services/solarSystemApi";

// ─── Dados visuais dos planetas ───────────────────────────────────────────────

const PLANET_VISUALS: Record<string, { emoji: string; accent: string; label: string }> = {
  mercury:  { emoji: "☿",  accent: "#94A3B8", label: "Rochoso"   },
  venus:    { emoji: "♀",  accent: "#D4A017", label: "Nublado"   },
  earth:    { emoji: "🌍", accent: "#22C55E", label: "Habitável" },
  mars:     { emoji: "🔴", accent: "#EF4444", label: "Desértico" },
  jupiter:  { emoji: "🪐", accent: "#FB923C", label: "Gasoso"    },
  saturn:   { emoji: "💫", accent: "#D4A017", label: "Anelado"   },
  uranus:   { emoji: "🔵", accent: "#38BDF8", label: "Gelado"    },
  neptune:  { emoji: "🌊", accent: "#6366F1", label: "Gelado"    },
};

function getPlanetVisual(id: string) {
  return PLANET_VISUALS[id.toLowerCase()] ?? { emoji: "🪐", accent: Colors.nebulaPurple, label: "Planeta" };
}

// ─── Card de planeta ──────────────────────────────────────────────────────────

function PlanetCard({ item, index, onPress }: { item: any; index: number; onPress: () => void }) {
  const visual = getPlanetVisual(item.id);
  const slideAnim = useRef(new Animated.Value(40)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 60,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        delay: index * 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const gravityPercent = Math.min(Math.round((item.gravity / 25) * 100), 100);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, { borderColor: visual.accent + "30", opacity: pressed ? 0.85 : 1 }]}
        android_ripple={{ color: visual.accent + "22" }}
      >
        {/* Emoji e nome */}
        <View style={styles.cardLeft}>
          <View style={[styles.emojiWrap, { backgroundColor: visual.accent + "18", borderColor: visual.accent + "33" }]}>
            <Text style={styles.emoji}>{visual.emoji}</Text>
          </View>
        </View>

        <View style={styles.cardBody}>
          <View style={styles.cardTop}>
            <Text style={styles.planetName}>{item.englishName}</Text>
            <View style={[styles.badge, { backgroundColor: visual.accent + "1A", borderColor: visual.accent + "44" }]}>
              <Text style={[styles.badgeText, { color: visual.accent }]}>{visual.label}</Text>
            </View>
          </View>

          {/* Barra de gravidade */}
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Gravidade</Text>
            <Text style={[styles.statValue, { color: visual.accent }]}>
              {item.gravity ?? "—"} m/s²
            </Text>
          </View>
          <View style={styles.barTrack}>
            <View style={[styles.barFill, { width: `${gravityPercent}%` as any, backgroundColor: visual.accent }]} />
          </View>
        </View>

        {/* Seta */}
        <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} style={{ alignSelf: "center" }} />
      </Pressable>
    </Animated.View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function UniverseScreen() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation<any>();

  async function loadPlanets() {
    try {
      setLoading(true);
      setError(false);
      const bodies = await getBodies();
      const onlyPlanets = bodies.filter((b: any) => b.isPlanet);
      // Ordena pelo ID para garantir sequência do Sistema Solar
      const ORDER = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
      onlyPlanets.sort((a: any, b: any) => {
        const ai = ORDER.indexOf(a.id.toLowerCase());
        const bi = ORDER.indexOf(b.id.toLowerCase());
        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
      });
      setPlanets(onlyPlanets);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadPlanets(); }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={styles.loadingText}>MAPEANDO PLANETAS...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontSize: 40, marginBottom: 16 }}>🛸</Text>
        <Text style={styles.errorTitle}>Sinal perdido</Text>
        <Pressable onPress={loadPlanets} style={styles.retryBtn}>
          <Text style={styles.retryText}>TENTAR NOVAMENTE</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        data={planets}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>SISTEMA SOLAR</Text>
            <Text style={styles.headerTitle}>Universo</Text>
            <Text style={styles.headerSub}>{planets.length} planetas mapeados</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <PlanetCard
            item={item}
            index={index}
            onPress={() => navigation.navigate("PlanetDetails", { planet: item })}
          />
        )}
      />
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 28,
    color: Colors.text,
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // Lista
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // Card
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  cardLeft: {
    flexShrink: 0,
  },
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 26,
  },
  cardBody: {
    flex: 1,
    gap: 6,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  planetName: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 15,
    color: Colors.text,
    letterSpacing: 0.5,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },

  // Barra de gravidade
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statValue: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
  },
  barTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 2,
  },

  // Loading / erro
  loadingText: {
    fontFamily: Fonts.orbitron,
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 14,
  },
  errorTitle: {
    fontFamily: Fonts.orbitron,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 20,
  },
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "66",
    backgroundColor: Colors.biluGreen + "15",
  },
  retryText: {
    fontFamily: Fonts.orbitron,
    color: Colors.biluGreen,
    fontSize: 11,
    letterSpacing: 1,
  },
});