import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "@arquivo_bilu:favorites";

export type FavoriteItem = {
  id: string;
  name: string;
  type: "planet" | "star" | "galaxy" | "ufo" | "exoplanet";
  emoji: string;
  accent: string;
  subtitle?: string;
  savedAt: number; // timestamp
};

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Carrega do storage na montagem
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (raw) setFavorites(JSON.parse(raw));
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  // Persiste sempre que muda
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(() => {});
  }, [favorites, loaded]);

  const isFavorite = useCallback(
    (id: string) => favorites.some((f) => f.id === id),
    [favorites]
  );

  const addFavorite = useCallback((item: FavoriteItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [{ ...item, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const toggleFavorite = useCallback(
    (item: FavoriteItem) => {
      if (isFavorite(item.id)) {
        removeFavorite(item.id);
      } else {
        addFavorite(item);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const clearAll = useCallback(() => setFavorites([]), []);

  return { favorites, isFavorite, addFavorite, removeFavorite, toggleFavorite, clearAll, loaded };
}