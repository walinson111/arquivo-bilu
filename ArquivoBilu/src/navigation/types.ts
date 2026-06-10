// Tipos centrais de navegação do app.
// Importe daqui em telas e navigators para ter autocomplete e segurança de tipos.

import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { CelestialBody, Star } from "../services/solarSystemApi";

// ─── Stack raiz (abas + telas globais de detalhe) ────────────────────────────

export type RootStackParamList = {
  Tabs: undefined;
  PlanetDetails: { planet: CelestialBody };
  StarDetails: { star: Star };
};

// ─── Stack do Universo ────────────────────────────────────────────────────────

export type UniverseStackParamList = {
  UniverseList: undefined;
  SolarSystem: undefined;
  PlanetDetails: { planet: CelestialBody };
  PlanetComparison: { planet: CelestialBody };
  StarDetails: { star: Star };
};

// ─── Stack de OVNIs ───────────────────────────────────────────────────────────

export type UfoItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  classification: string;
  emoji: string;
  accent: string;
  witnesses?: number;
  duration?: string;
  evidence?: string[];
};

export type UFOStackParamList = {
  UFOList: undefined;
  UFODetails: { item: UfoItem };
};

// ─── Helpers de props por tela ────────────────────────────────────────────────

export type PlanetDetailsProps    = NativeStackScreenProps<UniverseStackParamList, "PlanetDetails">;
export type PlanetComparisonProps = NativeStackScreenProps<UniverseStackParamList, "PlanetComparison">;
export type StarDetailsProps      = NativeStackScreenProps<UniverseStackParamList, "StarDetails">;
export type UFODetailsProps       = NativeStackScreenProps<UFOStackParamList, "UFODetails">;
export type UFOScreenProps        = NativeStackScreenProps<UFOStackParamList, "UFOList">;