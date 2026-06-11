export type BodyImageSource = { uri: string } | number;

const LOCAL_PLANETS: Record<string, number> = {
  sun:     require("../../assets/textures/sun.jpg"),
  mercury: require("../../assets/textures/mercury.jpg"),
  venus:   require("../../assets/textures/venus.jpg"),
  earth:   require("../../assets/textures/earth.jpg"),
  mars:    require("../../assets/textures/mars.jpg"),
  jupiter: require("../../assets/textures/jupiter.jpg"),
  saturn:  require("../../assets/textures/saturn.jpg"),
  uranus:  require("../../assets/textures/uranus.jpg"),
  neptune: require("../../assets/textures/neptune.jpg"),
};

const LOCAL_DWARFS: Record<string, number> = {
  pluto: require("../../assets/bodies/pluto.jpg"),
  eris:     require("../../assets/bodies/eris.jpg"),
  makemake: require("../../assets/bodies/makemake.jpg"),
  haumea:   require("../../assets/bodies/haumea.jpg"),
  ceres:    require("../../assets/bodies/ceres.jpg"),
};

const LOCAL_ASTEROIDS: Record<string, number> = {
  vesta:   require("../../assets/bodies/vesta.jpg"),
  pallas:  require("../../assets/bodies/pallas.jpg"),
  hygiea:  require("../../assets/bodies/hygiea.jpg"),
  apophis: require("../../assets/bodies/apophis.jpg"),
};

const LOCAL_COMETS: Record<string, number> = {
  halley:        require("../../assets/bodies/halley.jpg"),
  churyumov:     require("../../assets/bodies/churyumov.jpg"),
  "hale-bopp":   require("../../assets/bodies/hale-bopp.jpg"),
  encke:         require("../../assets/bodies/encke.jpg"),
};

const LOCAL_STARS: Record<string, number> = {
  sirius:     require("../../assets/stars/sirius.jpg"),
  betelgeuse: require("../../assets/stars/betelgeuse.jpg"),
  proxima:    require("../../assets/stars/proxima.jpg"),
  rigel:      require("../../assets/stars/rigel.jpg"),
  vega:       require("../../assets/stars/vega.jpg"),
  antares:    require("../../assets/stars/antares.jpg"),
  polaris:    require("../../assets/stars/polaris.jpg"),
};

// ─── Fallback remoto — usado enquanto não há arquivo local ────────────────────

const REMOTE: Record<string, string> = {
  // Planetas anões
  pluto:    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_High-Res.jpg/480px-Pluto_in_True_Color_-_High-Res.jpg",
  eris:     "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Eris_and_dysnomia2.jpg/480px-Eris_and_dysnomia2.jpg",
  makemake: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Makemake_and_its_moon.jpg/480px-Makemake_and_its_moon.jpg",
  haumea:   "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Haumea_Artistic_Impression.jpg/480px-Haumea_Artistic_Impression.jpg",
  ceres:    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg/480px-Ceres_-_RC3_-_Haulani_Crater_%2822381131691%29_%28cropped%29.jpg",

  // Asteroides
  vesta:   "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Vesta_full_mosaic.jpg/480px-Vesta_full_mosaic.jpg",
  pallas:  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pallas_-_VLT_%28SPHERE%29_-_2020.jpg/480px-Pallas_-_VLT_%28SPHERE%29_-_2020.jpg",
  hygiea:  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Hygiea_2020.jpg/480px-Hygiea_2020.jpg",
  apophis: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Apophis%27_2029_Pass.png/480px-Apophis%27_2029_Pass.png",

  // Cometas
  halley:        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Halley%27s_Comet_-_May_8_1910.jpg/480px-Halley%27s_Comet_-_May_8_1910.jpg",
  churyumov:     "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/67P_on_19_September_2014_NavCam_mosaic.jpg/480px-67P_on_19_September_2014_NavCam_mosaic.jpg",
  "hale-bopp":   "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Comet_Hale-Bopp_1995O1.jpg/480px-Comet_Hale-Bopp_1995O1.jpg",
  encke:         "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Encke_Comet.jpg/480px-Encke_Comet.jpg",

  // Estrelas
  sirius:     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sirius_A_and_B_Hubble_photo.jpg/480px-Sirius_A_and_B_Hubble_photo.jpg",
  betelgeuse: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ESO-Betelgeuse.jpg/480px-ESO-Betelgeuse.jpg",
  proxima:    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Proxima_Centauri_2MASS_atlas.jpg/480px-Proxima_Centauri_2MASS_atlas.jpg",
  rigel:      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Rigel_2.jpg/480px-Rigel_2.jpg",
  vega:       "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Vega_from_the_Hubble_Space_Telescope.jpg/480px-Vega_from_the_Hubble_Space_Telescope.jpg",
  antares:    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Antares_and_Rho_Ophiuchi_cross2.jpg/480px-Antares_and_Rho_Ophiuchi_cross2.jpg",
  polaris:    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Polaris_alpha_ursae_minoris.jpg/480px-Polaris_alpha_ursae_minoris.jpg",
};

// ─── Lookup unificado ─────────────────────────────────────────────────────────

const ALL_LOCAL: Record<string, number> = {
  ...LOCAL_PLANETS,
  ...LOCAL_DWARFS,
  ...LOCAL_ASTEROIDS,
  ...LOCAL_COMETS,
  ...LOCAL_STARS,
};

export function getBodyImage(id: string): BodyImageSource | null {
  const key = id.toLowerCase();
  if (ALL_LOCAL[key] !== undefined) return ALL_LOCAL[key];
  if (REMOTE[key])                  return { uri: REMOTE[key] };
  return null;
}