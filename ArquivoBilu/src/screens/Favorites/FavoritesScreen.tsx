import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { useFavoritesContext, FavoriteItem } from "../../context/FavoritesContext";
import { getBodyImage } from "../../constants/bodyImages";

// ─── Filtros ──────────────────────────────────────────────────────────────────

type Filter = "all" | FavoriteItem["type"];

const FILTERS: { key: Filter; label: string; emoji: string }[] = [
  { key: "all",       label: "Todos",      emoji: "✦"  },
  { key: "planet",    label: "Planetas",   emoji: "🪐"  },
  { key: "star",      label: "Estrelas",   emoji: "⭐"  },
  { key: "galaxy",    label: "Galáxias",   emoji: "🌌"  },
  { key: "exoplanet", label: "Exoplanetas",emoji: "🌍"  },
  { key: "ufo",       label: "OVNIs",      emoji: "🛸"  },
];

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <View style={styles.emptyWrap}>
      <Text style={styles.emptyEmoji}>{filtered ? "🔭" : "⭐"}</Text>
      <Text style={styles.emptyTitle}>
        {filtered ? "Nenhum resultado" : "Sem favoritos ainda"}
      </Text>
      <Text style={styles.emptySubtitle}>
        {filtered
          ? "Tente outro filtro ou explore mais o universo."
          : "Explore planetas, estrelas e galáxias\ne salve seus favoritos aqui."}
      </Text>
    </View>
  );
}

// ─── Card de favorito ─────────────────────────────────────────────────────────

function FavoriteCard({ item, onRemove }: { item: FavoriteItem; onRemove: () => void }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bodyImage = getBodyImage(item.id);

  function handleRemove() {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1,    duration: 80, useNativeDriver: true }),
    ]).start(() => onRemove());
  }

  const savedDate = new Date(item.savedAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Animated.View style={[styles.card, { borderColor: item.accent + "30", transform: [{ scale: scaleAnim }] }]}>
      {/* Ícone */}
      <View style={[styles.iconWrap, { backgroundColor: item.accent + "18", borderColor: item.accent + "33", overflow: "hidden" }]}>
        {bodyImage ? (
          <Image source={bodyImage} style={styles.cardImage} resizeMode="cover" />
        ) : (
          <Text style={styles.cardEmoji}>{item.emoji}</Text>
        )}
      </View>

      {/* Info */}
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <View style={[styles.typeBadge, { backgroundColor: item.accent + "1A", borderColor: item.accent + "44" }]}>
            <Text style={[styles.typeBadgeText, { color: item.accent }]}>
              {FILTERS.find((f) => f.key === item.type)?.label ?? item.type}
            </Text>
          </View>
        </View>
        {item.subtitle && (
          <Text style={styles.cardSubtitle} numberOfLines={1}>{item.subtitle}</Text>
        )}
        <Text style={styles.cardDate}>Salvo em {savedDate}</Text>
      </View>

      {/* Botão remover */}
      <TouchableOpacity onPress={handleRemove} style={styles.removeBtn} activeOpacity={0.7}>
        <Ionicons name="heart-dislike-outline" size={18} color="#EF4444" />
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Tela ─────────────────────────────────────────────────────────────────────

export function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favorites, removeFavorite, clearAll } = useFavoritesContext();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const filtered = activeFilter === "all"
    ? favorites
    : favorites.filter((f) => f.type === activeFilter);

  function handleClearAll() {
    Alert.alert(
      "Limpar favoritos",
      "Deseja remover todos os favoritos? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover todos", style: "destructive", onPress: clearAll },
      ]
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>COLEÇÃO PESSOAL</Text>
          <Text style={styles.headerTitle}>Favoritos</Text>
        </View>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.clearBtn} activeOpacity={0.75}>
            <Ionicons name="trash-outline" size={16} color="#EF4444" />
          </TouchableOpacity>
        )}
      </View>

      {/* Contador */}
      {favorites.length > 0 && (
        <View style={styles.countRow}>
          <Text style={styles.countText}>
            <Text style={{ color: Colors.biluGreen }}>{filtered.length}</Text>
            {activeFilter !== "all" ? ` de ${favorites.length}` : ""} itens salvos
          </Text>
        </View>
      )}

      {/* Filtros */}
      {favorites.length > 0 && (
        <FlatList
          data={FILTERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(f) => f.key}
          contentContainerStyle={styles.filtersRow}
          renderItem={({ item: f }) => {
            const isActive = activeFilter === f.key;
            return (
              <Pressable
                onPress={() => setActiveFilter(f.key)}
                style={[
                  styles.filterChip,
                  isActive && { backgroundColor: Colors.biluGreen + "18", borderColor: Colors.biluGreen + "55" },
                ]}
              >
                <Text style={styles.filterEmoji}>{f.emoji}</Text>
                <Text style={[styles.filterLabel, { color: isActive ? Colors.biluGreen : Colors.textSecondary }]}>
                  {f.label}
                </Text>
              </Pressable>
            );
          }}
          style={{ flexGrow: 0, marginBottom: 12 }}
        />
      )}

      {/* Lista */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, filtered.length === 0 && { flex: 1 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState filtered={activeFilter !== "all"} />}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            onRemove={() => removeFavorite(item.id)}
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

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
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
  },
  clearBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  countRow: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  countText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  filtersRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: "rgba(30,41,59,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  filterEmoji: {
    fontSize: 13,
  },
  filterLabel: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 12,
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  cardEmoji: {
    fontSize: 24,
  },
  cardBody: {
    flex: 1,
    gap: 3,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardName: {
    fontFamily: Fonts.orbitron,
    fontSize: 13,
    color: Colors.text,
    letterSpacing: 0.3,
    flex: 1,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
    flexShrink: 0,
  },
  typeBadgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  cardDate: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
    opacity: 0.6,
    marginTop: 2,
  },
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 20,
  },
  emptyTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
