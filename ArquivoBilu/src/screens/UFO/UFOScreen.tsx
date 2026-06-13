import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { layoutStyles } from "../../theme/styles";
import { ufoStyles as styles } from "./UFOScreen.styles";
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
    <View style={[layoutStyles.root, { paddingTop: insets.top }]}>
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

