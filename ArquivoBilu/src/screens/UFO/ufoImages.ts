// Mapeamento de imagens locais para os casos UFO.
// Coloque as imagens em assets/ufo/ com os nomes abaixo.
// Enquanto não houver imagens locais, o componente usa imagens da web como fallback.
//
// COMO ADICIONAR IMAGENS LOCAIS:
//   1. Salve os arquivos em: assets/ufo/<id>.jpg
//   2. Adicione o require() abaixo para o caso correspondente.
//   3. Remova a entrada de UFO_FALLBACK_URLS para esse caso.
//
// Exemplo:
//   roswell: require("../../../assets/ufo/roswell.jpg"),

export type LocalImage = {
  source: { uri: string } | number;
  caption: string;
};

// Imagens locais (adicione requires aqui quando tiver os arquivos)
const UFO_LOCAL_IMAGES: Record<string, LocalImage[]> = {
  // roswell: [
  //   { source: require("../../../assets/ufo/roswell.jpg"), caption: "Área do incidente, Roswell 1947" },
  // ],
};

// Fallback: imagens públicas de domínio público / Creative Commons
// Estas são usadas enquanto não há imagens locais
const UFO_FALLBACK_URLS: Record<string, LocalImage[]> = {
  roswell: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Roswell_UFO_museum.jpg/640px-Roswell_UFO_museum.jpg" }, caption: "Museu UFO de Roswell, Novo México" },
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Roswell_Crash_Site.jpg/640px-Roswell_Crash_Site.jpg" }, caption: "Local do suposto acidente, 1947" },
  ],
  phoenix: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Phoenix_lights_ufo_edited.png/640px-Phoenix_lights_ufo_edited.png" }, caption: "Reprodução do avistamento de 1997" },
  ],
  nimitz: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/USS_Nimitz_%28CVN-68%29_underway_in_the_Pacific_Ocean_in_2008.jpg/640px-USS_Nimitz_%28CVN-68%29_underway_in_the_Pacific_Ocean_in_2008.jpg" }, caption: "USS Nimitz, porta-aviões envolvido no caso" },
  ],
  wow: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Wow_signal_zoomed.png/640px-Wow_signal_zoomed.png" }, caption: "Impressão original do computador com a anotação 'Wow!'" },
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Big_Ear_Radio_Observatory_1.gif/640px-Big_Ear_Radio_Observatory_1.gif" }, caption: "Radiotelescópio Big Ear — Ohio State University" },
  ],
  rendlesham: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Rendlesham_Forest.jpg/640px-Rendlesham_Forest.jpg" }, caption: "Rendlesham Forest, Suffolk, Reino Unido" },
  ],
  tehran: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/F-4_Phantom_II_Front.jpg/640px-F-4_Phantom_II_Front.jpg" }, caption: "F-4 Phantom II — caça utilizado na interceptação" },
  ],
  congress2023: [
    { source: { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/US_Capitol_west_side.JPG/640px-US_Capitol_west_side.JPG" }, caption: "Capitólio dos EUA — local das audiências de 2023" },
  ],
};

/**
 * Retorna as imagens para um caso UFO.
 * Prioriza imagens locais (require), cai no fallback de URLs públicas.
 */
export function getUFOImages(caseId: string): LocalImage[] {
  if (UFO_LOCAL_IMAGES[caseId]?.length) {
    return UFO_LOCAL_IMAGES[caseId];
  }
  return UFO_FALLBACK_URLS[caseId] ?? [];
}
