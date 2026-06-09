import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { UFO_CASES, TYPE_INFO, type UFOCase, type CaseType } from "./ufoData";

// ─── Filtro de tipo ───────────────────────────────────────────────────────────

function TypeFilter({ selected, onSelect }: {
  selected: CaseType | null;
  onSelect: (t: CaseType | null) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
      <Pressable
        onPress={() => onSelect(null)}
        style={[styles.chip, selected === null && styles.chipActive]}
      >
        <Text style={[styles.chipText, selected === null && styles.chipTextActive]}>Todos</Text>
      </Pressable>
      {(Object.entries(TYPE_INFO) as [CaseType, typeof TYPE_INFO[CaseType]][]).map(([key, val]) => (
        <Pressable
          key={key}
          onPress={() => onSelect(selected === key ? null : key)}
          style={[styles.chip, selected === key && { borderColor: val.accent + "80", backgroundColor: val.accent + "15" }]}
        >
          <Text style={styles.chipEmoji}>{val.emoji}</Text>
          <Text style={[styles.chipText, selected === key && { color: val.accent }]}>{val.label}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

// ─── Card de caso ─────────────────────────────────────────────────────────────

function CaseCard({ item, index, onPress }: { item: UFOCase; index: number; onPress: () => void }) {
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 350, delay: (index % 8) * 50, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 350, delay: (index % 8) * 50, useNativeDriver: true }),
    ]).start();
  }, []);

  // Card classificado
  if (item.restricted) {
    return (
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={styles.cardRestricted}>
          <View style={styles.restrictedIcon}>
            <Text style={styles.restrictedEmoji}>🔒</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.restrictedTitle}>{item.title}</Text>
            <Text style={styles.restrictedSub}>Nível de acesso insuficiente</Text>
          </View>
          <View style={styles.restrictedBadge}>
            <Text style={styles.restrictedBadgeText}>RESTRITO</Text>
          </View>
        </View>
      </Animated.View>
    );
  }

  const typeInfo = TYPE_INFO[item.type];

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.card, { borderColor: typeInfo.accent + "25", opacity: pressed ? 0.8 : 1 }]}
        android_ripple={{ color: typeInfo.accent + "15" }}
      >
        {/* Barra lateral colorida */}
        <View style={[styles.stripe, { backgroundColor: typeInfo.accent }]} />

        <View style={styles.cardContent}>
          {/* Topo: ícone + título + ano */}
          <View style={styles.cardRow}>
            <View style={[styles.iconWrap, { backgroundColor: typeInfo.accent + "15", borderColor: typeInfo.accent + "30" }]}>
              <Text style={styles.iconEmoji}>{typeInfo.emoji}</Text>
            </View>
            <View style={styles.cardTitles}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardMeta}>
                {item.location}
                {item.year > 0 ? ` · ${item.year}` : ""}
                {item.witnesses != null
                  ? ` · ${item.witnesses >= 1000 ? `${(item.witnesses / 1000).toFixed(0)}k` : item.witnesses} test.`
                  : ""}
              </Text>
            </View>
            {/* Badge de tipo */}
            <View style={[styles.typeBadge, { borderColor: typeInfo.accent + "40", backgroundColor: typeInfo.accent + "12" }]}>
              <Text style={[styles.typeBadgeText, { color: typeInfo.accent }]}>{typeInfo.label}</Text>
            </View>
          </View>

          {/* Resumo */}
          <Text style={styles.cardSummary} numberOfLines={2}>{item.summary}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function UFOScreen() {
  const [filter, setFilter] = useState<CaseType | null>(null);
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const glowAnim = useRef(new Animated.Value(0.5)).current;

  // Pulso do alien no header
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 2000, useNativeDriver: false }),
        Animated.timing(glowAnim, { toValue: 0.5, duration: 2000, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const visible = UFO_CASES.filter(c => filter == null || c.type === filter);
  const totalCases = UFO_CASES.filter(c => !c.restricted).length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <FlatList
        data={visible}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            {/* ─ Header ─ */}
            <View style={styles.header}>
              {/* Alien animado */}
              <View style={styles.alienWrap}>
                <Animated.View style={[styles.alienGlow, { opacity: glowAnim }]} />
                <Text style={styles.alienEmoji}>👽</Text>
              </View>

              <View style={styles.headerText}>
                <Text style={styles.headerEyebrow}>CASOS DOCUMENTADOS</Text>
                <Text style={styles.headerTitle}>Arquivos{"\n"}Alienígenas</Text>
                <Text style={styles.headerSub}>{totalCases} casos · dados não oficiais</Text>
              </View>
            </View>

            {/* ─ Filtros ─ */}
            <TypeFilter selected={filter} onSelect={setFilter} />

            {/* ─ Divisor ─ */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>👾 REGISTROS</Text>
              <View style={styles.dividerLine} />
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <CaseCard
            item={item}
            index={index}
            onPress={() => navigation.navigate("UFODetails", { ufoCase: item })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ fontSize: 40 }}>🔭</Text>
            <Text style={styles.emptyText}>Nenhum caso nessa categoria</Text>
          </View>
        }
      />
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  list: { paddingBottom: 40 },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  alienWrap: { alignItems: "center", justifyContent: "center", position: "relative" },
  alienGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00FF9D",
  },
  alienEmoji: { fontSize: 56, zIndex: 1 },
  headerText: { flex: 1, gap: 4 },
  headerEyebrow: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 22,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  headerSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // Filtros
  filterRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    backgroundColor: "rgba(30,41,59,0.45)",
  },
  chipActive: {
    borderColor: Colors.biluGreen + "60",
    backgroundColor: Colors.biluGreen + "12",
  },
  chipEmoji: { fontSize: 13 },
  chipText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chipTextActive: { color: Colors.biluGreen },

  // Divisor
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.07)" },
  dividerText: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // Card normal
  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(15,23,42,0.9)",
    overflow: "hidden",
  },
  stripe: { width: 3, flexShrink: 0 },
  cardContent: { flex: 1, padding: 14, gap: 8 },
  cardRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconEmoji: { fontSize: 20 },
  cardTitles: { flex: 1, gap: 2 },
  cardTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 13,
    color: Colors.text,
    letterSpacing: 0.2,
  },
  cardMeta: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    flexShrink: 0,
  },
  typeBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    letterSpacing: 0.8,
  },
  cardSummary: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // Card restrito
  cardRestricted: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EF444425",
    borderStyle: "dashed",
    backgroundColor: "rgba(15,23,42,0.6)",
    padding: 14,
    opacity: 0.6,
  },
  restrictedIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EF444415",
    borderWidth: 1,
    borderColor: "#EF444430",
    alignItems: "center",
    justifyContent: "center",
  },
  restrictedEmoji: { fontSize: 20 },
  restrictedTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 13,
    color: "#94A3B8",
    letterSpacing: 0.2,
  },
  restrictedSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: "#475569",
    marginTop: 2,
  },
  restrictedBadge: {
    marginLeft: "auto",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF444440",
    backgroundColor: "#EF444412",
  },
  restrictedBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: "#EF4444",
    letterSpacing: 0.8,
  },

  // Empty
  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});