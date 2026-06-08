import { createContext, useContext, ReactNode } from "react";
import { useFavorites, FavoriteItem } from "../hooks/useFavorites";

type FavoritesContextType = ReturnType<typeof useFavorites>;

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useFavorites();
  return (
    <FavoritesContext.Provider value={favorites}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavoritesContext must be used inside FavoritesProvider");
  return ctx;
}

export type { FavoriteItem };