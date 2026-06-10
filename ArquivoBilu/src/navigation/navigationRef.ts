// ─── Referência global de navegação ──────────────────────────────────────────
// Permite navegar a partir de qualquer lugar do app,
// inclusive de dentro de outra aba (ex: Home → PlanetDetails no Universo).

import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({ name, params } as never);
  }
}