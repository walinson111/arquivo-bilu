// Mapeamento de imagens para os casos UFO.
//
// ─── COMO ADICIONAR IMAGENS LOCAIS ───────────────────────────────────────────
//
//   1. Crie a pasta:  assets/ufo/
//   2. Salve cada imagem como:  assets/ufo/<id>.jpg  (ou .png)
//      Exemplos de IDs: roswell, phoenix, nimitz, wow, rendlesham, tehran, congress2023
//   3. Adicione um require() em UFO_LOCAL abaixo (descomente o bloco do caso).
//   4. Salve — o app passa a usar a imagem local automaticamente.
//      As URLs remotas em UFO_REMOTE funcionam como fallback para IDs sem entrada local.
//
// ─── FONTE DAS IMAGENS REMOTAS (fallback) ────────────────────────────────────
// - NASA Commons / images.nasa.gov  (domínio público, sem restrição de Referer)
// - Flickr NASA HQ (CC0)
// - Archive.org (domínio público)

export type LocalImage = {
  source: { uri: string } | number;
  caption: string;
};

// ─── Imagens locais ───────────────────────────────────────────────────────────
// Descomente e preencha à medida que baixar os arquivos.

const UFO_LOCAL: Record<string, LocalImage[]> = {
  // roswell: [
  //   { source: require("../../../assets/ufo/roswell_1.jpg"), caption: "Área do incidente, Roswell 1947" },
  //   { source: require("../../../assets/ufo/roswell_2.jpg"), caption: "Base Aérea de Roswell" },
  // ],
  // phoenix: [
  //   { source: require("../../../assets/ufo/phoenix.jpg"), caption: "Reconstituição das Phoenix Lights, 13 de março de 1997" },
  // ],
  // nimitz: [
  //   { source: require("../../../assets/ufo/nimitz_1.jpg"), caption: "Oceano Pacífico — local do avistamento do USS Nimitz" },
  //   { source: require("../../../assets/ufo/nimitz_2.jpg"), caption: "USS Nimitz (CVN-68) — porta-aviões nuclear envolvido no caso" },
  // ],
  // wow: [
  //   { source: require("../../../assets/ufo/wow_1.jpg"), caption: "Impressão original do computador com a anotação 'Wow!' — 15 de agosto de 1977" },
  //   { source: require("../../../assets/ufo/wow_2.jpg"), caption: "Representação artística de sinal de rádio interestelar" },
  // ],
  // rendlesham: [
  //   { source: require("../../../assets/ufo/rendlesham.jpg"), caption: "Rendlesham Forest, Suffolk, Reino Unido" },
  // ],
  // tehran: [
  //   { source: require("../../../assets/ufo/tehran.jpg"), caption: "F-4 Phantom II — caça utilizado na interceptação de Teerã" },
  // ],
  // congress2023: [
  //   { source: require("../../../assets/ufo/congress2023.jpg"), caption: "Capitólio dos EUA — local das audiências históricas de 2023" },
  // ],
};

// ─── Imagens remotas — fallback quando não há arquivo local ──────────────────
const UFO_REMOTE: Record<string, LocalImage[]> = {
  roswell: [
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/1/1d/Roswell_UFO_museum.jpg" },
      caption: "Museu Internacional de UFO, Roswell, Novo México",
    },
    {
      source: { uri: "https://images-assets.nasa.gov/image/GPN-2000-000099/GPN-2000-000099~thumb.jpg" },
      caption: "Base Aérea de Roswell — arquivo NASA",
    },
  ],
  phoenix: [
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Phoenix_lights_ufo_edited.png" },
      caption: "Reconstituição das Phoenix Lights, 13 de março de 1997",
    },
  ],
  nimitz: [
    {
      source: { uri: "https://images-assets.nasa.gov/image/iss040e085704/iss040e085704~thumb.jpg" },
      caption: "Oceano Pacífico — local do avistamento do USS Nimitz",
    },
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/c/c8/USS_Nimitz_%28CVN-68%29_underway_in_the_Pacific_Ocean_in_2008.jpg" },
      caption: "USS Nimitz (CVN-68) — porta-aviões nuclear envolvido no caso",
    },
  ],
  wow: [
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Wow_signal_zoomed.png" },
      caption: "Impressão original do computador com a anotação 'Wow!' — 15 de agosto de 1977",
    },
    {
      source: { uri: "https://images-assets.nasa.gov/image/PIA17563/PIA17563~thumb.jpg" },
      caption: "Representação artística de sinal de rádio interestelar — NASA",
    },
  ],
  rendlesham: [
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/2/25/Rendlesham_Forest.jpg" },
      caption: "Rendlesham Forest, Suffolk, Reino Unido",
    },
  ],
  tehran: [
    {
      source: { uri: "https://images-assets.nasa.gov/image/9906093/9906093~thumb.jpg" },
      caption: "F-4 Phantom II — caça utilizado na interceptação de Teerã",
    },
  ],
  congress2023: [
    {
      source: { uri: "https://upload.wikimedia.org/wikipedia/commons/0/07/US_Capitol_west_side.JPG" },
      caption: "Capitólio dos EUA — local das audiências históricas de 2023",
    },
  ],
};

/**
 * Retorna as imagens para um caso UFO.
 * Prioriza imagens locais (require), depois usa URLs remotas como fallback.
 */
export function getUFOImages(caseId: string): LocalImage[] {
  if (UFO_LOCAL[caseId]?.length) return UFO_LOCAL[caseId];
  return UFO_REMOTE[caseId] ?? [];
}