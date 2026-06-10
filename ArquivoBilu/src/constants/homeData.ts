// Dados de destaque da HomeScreen.
// Referencia os mesmos objetos do solarSystemApi — sem duplicação.
// Ao atualizar solarSystemApi.ts, esta tela se atualiza automaticamente.

import { SOLAR_SYSTEM_BODIES, FAMOUS_STARS } from "../services/solarSystemApi";

function body(id: string) {
  const found = SOLAR_SYSTEM_BODIES.find((b) => b.id === id);
  if (!found) throw new Error(`[homeData] planeta não encontrado: ${id}`);
  return found;
}

function star(id: string) {
  const found = FAMOUS_STARS.find((s) => s.id === id);
  if (!found) throw new Error(`[homeData] estrela não encontrada: ${id}`);
  return found;
}

export const FEATURED_HOME = [
  {
    id: "mars",
    kind: "planet" as const,
    label: "PLANETA",
    name: "Marte",
    subtitle: "O Planeta Vermelho",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/800px-OSIRIS_Mars_true_color.jpg",
    accent: "#EF4444",
    badge: "Terrestre",
    screen: "PlanetDetails",
    params: { planet: body("mars") },
  },
  {
    id: "saturn",
    kind: "planet" as const,
    label: "PLANETA",
    name: "Saturno",
    subtitle: "O Senhor dos Anéis",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg",
    accent: "#D4A017",
    badge: "Gasoso",
    screen: "PlanetDetails",
    params: { planet: body("saturn") },
  },
  {
    id: "sirius",
    kind: "star" as const,
    label: "ESTRELA",
    name: "Sírius",
    subtitle: "A mais brilhante do céu",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sirius_A_and_B_Hubble_photo.jpg/800px-Sirius_A_and_B_Hubble_photo.jpg",
    accent: "#93C5FD",
    badge: "Anã Azul",
    screen: "StarDetails",
    params: { star: star("sirius") },
  },
  {
    id: "betelgeuse",
    kind: "star" as const,
    label: "ESTRELA",
    name: "Betelgeuse",
    subtitle: "Supergigante de Órion",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESO-Betelgeuse.jpg/800px-ESO-Betelgeuse.jpg",
    accent: "#F87171",
    badge: "Supergigante",
    screen: "StarDetails",
    params: { star: star("betelgeuse") },
  },
  {
    id: "jupiter",
    kind: "planet" as const,
    label: "PLANETA",
    name: "Júpiter",
    subtitle: "O Gigante Gasoso",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/800px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    accent: "#FB923C",
    badge: "Gasoso",
    screen: "PlanetDetails",
    params: { planet: body("jupiter") },
  },
];

export const TRENDING_HOME = [
  { id: "earth",   name: "Terra",         type: "Planeta",  emoji: "🌍", accent: "#22C55E", screen: "PlanetDetails", params: { planet: body("earth") } },
  { id: "neptune", name: "Netuno",        type: "Planeta",  emoji: "🌊", accent: "#6366F1", screen: "PlanetDetails", params: { planet: body("neptune") } },
  { id: "polaris", name: "Polaris",       type: "Estrela",  emoji: "🌟", accent: "#FDE68A", screen: "StarDetails",   params: { star: star("polaris") } },
  { id: "pluto",   name: "Plutão",        type: "P. Anão",  emoji: "🩵", accent: "#93C5FD", screen: "PlanetDetails", params: { planet: body("pluto") } },
  { id: "halley",  name: "Cometa Halley", type: "Cometa",   emoji: "☄️", accent: "#67E8F9", screen: "PlanetDetails", params: { planet: body("halley") } },
];