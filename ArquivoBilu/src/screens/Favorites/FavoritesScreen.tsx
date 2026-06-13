import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { layoutStyles } from "../../theme/styles";
import { favoritesStyles as styles } from "./FavoritesScreen.styles";
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
    <View style={[layoutStyles.root, { paddingTop: insets.top }]}>
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

