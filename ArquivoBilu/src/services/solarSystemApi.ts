// ─── Dados estáticos do Sistema Solar + Estrelas ─────────────────────────────
// Dados baseados em fontes da NASA / IAU / SIMBAD.

export interface CelestialBody {
  id: string;
  englishName: string;
  isPlanet: boolean;
  bodyType: "planet" | "dwarf_planet" | "asteroid" | "comet";
  gravity: number | null;
  density: number | null;
  meanRadius: number | null;
  sideralOrbit: number | null;
  sideralRotation: number | null;
  moons: { moon: string }[] | null;
}

export interface Star {
  id: string;
  name: string;
  constellation: string;
  spectralType: string;         // Ex: "G2V", "M2Ia"
  starClass: string;            // Ex: "Anã Amarela", "Supergigante"
  distanceLy: number;           // Distância em anos-luz
  luminosity: number;           // Luminosidade relativa ao Sol (Sol = 1)
  mass: number;                 // Massa relativa ao Sol (Sol = 1)
  radius: number;               // Raio relativo ao Sol (Sol = 1)
  surfaceTemp: number;          // Temperatura superficial em Kelvin
  absoluteMag: number;          // Magnitude absoluta
  age: number | null;           // Idade em bilhões de anos
  emoji: string;
  accent: string;
  description: string;
  curiosity: string;            // Fato curioso
}

// ─── Planetas ─────────────────────────────────────────────────────────────────

export const SOLAR_SYSTEM_BODIES: CelestialBody[] = [
  {
    id: "mercury", englishName: "Mercury", isPlanet: true, bodyType: "planet",
    gravity: 3.7, density: 5.427, meanRadius: 2439.7,
    sideralOrbit: 87.969, sideralRotation: 1407.6, moons: null,
  },
  {
    id: "venus", englishName: "Venus", isPlanet: true, bodyType: "planet",
    gravity: 8.87, density: 5.243, meanRadius: 6051.8,
    sideralOrbit: 224.701, sideralRotation: -5832.5, moons: null,
  },
  {
    id: "earth", englishName: "Earth", isPlanet: true, bodyType: "planet",
    gravity: 9.807, density: 5.514, meanRadius: 6371.0,
    sideralOrbit: 365.256, sideralRotation: 23.9345,
    moons: [{ moon: "Moon" }],
  },
  {
    id: "mars", englishName: "Mars", isPlanet: true, bodyType: "planet",
    gravity: 3.721, density: 3.933, meanRadius: 3389.5,
    sideralOrbit: 686.971, sideralRotation: 24.6229,
    moons: [{ moon: "Phobos" }, { moon: "Deimos" }],
  },
  {
    id: "jupiter", englishName: "Jupiter", isPlanet: true, bodyType: "planet",
    gravity: 24.79, density: 1.326, meanRadius: 69911.0,
    sideralOrbit: 4332.589, sideralRotation: 9.9259,
    moons: [
      { moon: "Io" }, { moon: "Europa" }, { moon: "Ganymede" },
      { moon: "Callisto" }, { moon: "Amalthea" }, { moon: "Himalia" },
      { moon: "Elara" }, { moon: "Pasiphae" }, { moon: "Sinope" },
      { moon: "Lysithea" }, { moon: "Carme" }, { moon: "Ananke" },
      { moon: "Leda" }, { moon: "Thebe" }, { moon: "Adrastea" },
      { moon: "Metis" }, { moon: "Callirrhoe" }, { moon: "Themisto" },
      { moon: "Megaclite" }, { moon: "Taygete" }, { moon: "Chaldene" },
      { moon: "Harpalyke" }, { moon: "Kalyke" }, { moon: "Iocaste" },
      { moon: "Erinome" }, { moon: "Isonoe" }, { moon: "Praxidike" },
      { moon: "Autonoe" }, { moon: "Thyone" }, { moon: "Hermippe" },
      { moon: "Aitne" }, { moon: "Eurydome" }, { moon: "Euanthe" },
      { moon: "Euporie" }, { moon: "Orthosie" }, { moon: "Sponde" },
      { moon: "Kale" }, { moon: "Pasithee" }, { moon: "Hegemone" },
      { moon: "Mneme" }, { moon: "Aoede" }, { moon: "Thelxinoe" },
      { moon: "Arche" }, { moon: "Kallichore" }, { moon: "Helike" },
      { moon: "Carpo" }, { moon: "Eukelade" }, { moon: "Cyllene" },
      { moon: "Dia" }, { moon: "Ersa" }, { moon: "Pandia" },
      { moon: "Philophrosyne" }, { moon: "Eupheme" },
    ],
  },
  {
    id: "saturn", englishName: "Saturn", isPlanet: true, bodyType: "planet",
    gravity: 10.44, density: 0.687, meanRadius: 58232.0,
    sideralOrbit: 10759.22, sideralRotation: 10.656,
    moons: [
      { moon: "Titan" }, { moon: "Rhea" }, { moon: "Iapetus" },
      { moon: "Dione" }, { moon: "Tethys" }, { moon: "Enceladus" },
      { moon: "Mimas" }, { moon: "Hyperion" }, { moon: "Phoebe" },
      { moon: "Janus" }, { moon: "Epimetheus" }, { moon: "Helene" },
      { moon: "Telesto" }, { moon: "Calypso" }, { moon: "Atlas" },
      { moon: "Prometheus" }, { moon: "Pandora" }, { moon: "Pan" },
      { moon: "Ymir" }, { moon: "Paaliaq" }, { moon: "Siarnaq" },
      { moon: "Tarvos" }, { moon: "Kiviuq" }, { moon: "Ijiraq" },
      { moon: "Thrymr" }, { moon: "Skathi" }, { moon: "Mundilfari" },
      { moon: "Erriapo" }, { moon: "Albiorix" }, { moon: "Suttungr" },
      { moon: "Bebhionn" }, { moon: "Bergelmir" }, { moon: "Narvi" },
      { moon: "Farbauti" }, { moon: "Aegir" }, { moon: "Bestla" },
      { moon: "Fenrir" }, { moon: "Hati" }, { moon: "Hyrrokkin" },
      { moon: "Kari" }, { moon: "Loge" }, { moon: "Skoll" },
      { moon: "Surtur" }, { moon: "Anthe" }, { moon: "Jarnsaxa" },
      { moon: "Greip" }, { moon: "Tarqeq" }, { moon: "Aegaeon" },
      { moon: "Methone" }, { moon: "Pallene" }, { moon: "Polydeuces" },
      { moon: "Daphnis" }, { moon: "Fornjot" },
    ],
  },
  {
    id: "uranus", englishName: "Uranus", isPlanet: true, bodyType: "planet",
    gravity: 8.87, density: 1.271, meanRadius: 25362.0,
    sideralOrbit: 30688.5, sideralRotation: -17.24,
    moons: [
      { moon: "Miranda" }, { moon: "Ariel" }, { moon: "Umbriel" },
      { moon: "Titania" }, { moon: "Oberon" }, { moon: "Caliban" },
      { moon: "Sycorax" }, { moon: "Prospero" }, { moon: "Setebos" },
      { moon: "Stephano" }, { moon: "Trinculo" }, { moon: "Francisco" },
      { moon: "Margaret" }, { moon: "Ferdinand" }, { moon: "Perdita" },
      { moon: "Mab" }, { moon: "Cupid" }, { moon: "Cordelia" },
      { moon: "Ophelia" }, { moon: "Bianca" }, { moon: "Cressida" },
      { moon: "Desdemona" }, { moon: "Juliet" }, { moon: "Portia" },
      { moon: "Rosalind" }, { moon: "Belinda" }, { moon: "Puck" },
    ],
  },
  {
    id: "neptune", englishName: "Neptune", isPlanet: true, bodyType: "planet",
    gravity: 11.15, density: 1.638, meanRadius: 24622.0,
    sideralOrbit: 60182.0, sideralRotation: 16.11,
    moons: [
      { moon: "Triton" }, { moon: "Nereid" }, { moon: "Naiad" },
      { moon: "Thalassa" }, { moon: "Despina" }, { moon: "Galatea" },
      { moon: "Larissa" }, { moon: "Proteus" }, { moon: "Halimede" },
      { moon: "Psamathe" }, { moon: "Sao" }, { moon: "Laomedeia" },
      { moon: "Neso" }, { moon: "Hippocamp" },
    ],
  },
  // Planetas-Anões
  {
    id: "pluto", englishName: "Pluto", isPlanet: false, bodyType: "dwarf_planet",
    gravity: 0.62, density: 1.854, meanRadius: 1188.3,
    sideralOrbit: 90560.0, sideralRotation: -153.3,
    moons: [{ moon: "Charon" }, { moon: "Styx" }, { moon: "Nix" }, { moon: "Kerberos" }, { moon: "Hydra" }],
  },
  {
    id: "eris", englishName: "Eris", isPlanet: false, bodyType: "dwarf_planet",
    gravity: 0.82, density: 2.52, meanRadius: 1163.0,
    sideralOrbit: 204199.0, sideralRotation: 25.9,
    moons: [{ moon: "Dysnomia" }],
  },
  {
    id: "makemake", englishName: "Makemake", isPlanet: false, bodyType: "dwarf_planet",
    gravity: 0.5, density: 1.7, meanRadius: 715.0,
    sideralOrbit: 111867.0, sideralRotation: 22.83,
    moons: [{ moon: "MK 2" }],
  },
  {
    id: "haumea", englishName: "Haumea", isPlanet: false, bodyType: "dwarf_planet",
    gravity: 0.63, density: 2.018, meanRadius: 620.0,
    sideralOrbit: 103774.0, sideralRotation: 3.9155,
    moons: [{ moon: "Hi'iaka" }, { moon: "Namaka" }],
  },
  {
    id: "ceres", englishName: "Ceres", isPlanet: false, bodyType: "dwarf_planet",
    gravity: 0.28, density: 2.162, meanRadius: 476.2,
    sideralOrbit: 1681.63, sideralRotation: 9.074, moons: null,
  },
  // Asteroides
  {
    id: "vesta", englishName: "Vesta", isPlanet: false, bodyType: "asteroid",
    gravity: 0.25, density: 3.456, meanRadius: 262.7,
    sideralOrbit: 1325.75, sideralRotation: 5.342, moons: null,
  },
  {
    id: "pallas", englishName: "Pallas", isPlanet: false, bodyType: "asteroid",
    gravity: 0.21, density: 2.89, meanRadius: 256.0,
    sideralOrbit: 1686.0, sideralRotation: 7.813, moons: null,
  },
  {
    id: "hygiea", englishName: "Hygiea", isPlanet: false, bodyType: "asteroid",
    gravity: 0.091, density: 2.0, meanRadius: 217.0,
    sideralOrbit: 2028.8, sideralRotation: 27.623, moons: null,
  },
  {
    id: "apophis", englishName: "Apophis", isPlanet: false, bodyType: "asteroid",
    gravity: null, density: 2.9, meanRadius: 0.17,
    sideralOrbit: 323.6, sideralRotation: 30.56, moons: null,
  },
  // Cometas
  {
    id: "halley", englishName: "Halley's Comet", isPlanet: false, bodyType: "comet",
    gravity: null, density: 0.6, meanRadius: 5.5,
    sideralOrbit: 27507.0, sideralRotation: 170.4, moons: null,
  },
  {
    id: "churyumov", englishName: "67P/Churyumov–Gerasimenko", isPlanet: false, bodyType: "comet",
    gravity: null, density: 0.533, meanRadius: 1.65,
    sideralOrbit: 2355.4, sideralRotation: 12.4, moons: null,
  },
  {
    id: "hale-bopp", englishName: "Hale-Bopp", isPlanet: false, bodyType: "comet",
    gravity: null, density: 0.5, meanRadius: 30.0,
    sideralOrbit: 98280.0, sideralRotation: 11.35, moons: null,
  },
  {
    id: "encke", englishName: "Comet Encke", isPlanet: false, bodyType: "comet",
    gravity: null, density: 0.5, meanRadius: 2.4,
    sideralOrbit: 1204.0, sideralRotation: 11.08, moons: null,
  },
];

// ─── Estrelas ─────────────────────────────────────────────────────────────────

export const FAMOUS_STARS: Star[] = [
  {
    id: "sun",
    name: "Sol",
    constellation: "—",
    spectralType: "G2V",
    starClass: "Anã Amarela",
    distanceLy: 0.0000158,
    luminosity: 1,
    mass: 1,
    radius: 1,
    surfaceTemp: 5778,
    absoluteMag: 4.83,
    age: 4.6,
    emoji: "☀️",
    accent: "#FCD34D",
    description: "Nossa estrela e centro do Sistema Solar. Responsável por toda a energia que sustenta a vida na Terra, o Sol é uma esfera de plasma com fusão nuclear em seu núcleo.",
    curiosity: "O Sol contém 99,86% de toda a massa do Sistema Solar.",
  },
  {
    id: "sirius",
    name: "Sírius",
    constellation: "Canis Major",
    spectralType: "A1V",
    starClass: "Anã Branca-Azul",
    distanceLy: 8.6,
    luminosity: 25.4,
    mass: 2.02,
    radius: 1.711,
    surfaceTemp: 9940,
    absoluteMag: 1.43,
    age: 0.242,
    emoji: "💠",
    accent: "#93C5FD",
    description: "A estrela mais brilhante do céu noturno, visível a olho nu. Faz parte da constelação Canis Major e é na verdade um sistema binário — Sírius A e Sírius B.",
    curiosity: "Sírius B é uma anã branca do tamanho da Terra, porém com a massa do Sol.",
  },
  {
    id: "betelgeuse",
    name: "Betelgeuse",
    constellation: "Orion",
    spectralType: "M2Ia",
    starClass: "Supergigante Vermelha",
    distanceLy: 700,
    luminosity: 126000,
    mass: 16.5,
    radius: 764,
    surfaceTemp: 3500,
    absoluteMag: -5.85,
    age: 0.008,
    emoji: "🔴",
    accent: "#F87171",
    description: "Uma das maiores estrelas conhecidas, marcando o ombro direito de Órion. Está próxima do fim de sua vida e deverá explodir como supernova em algum momento dos próximos 100 mil anos.",
    curiosity: "Se Betelgeuse estivesse no lugar do Sol, ela englobaria toda a órbita de Júpiter.",
  },
  {
    id: "proxima",
    name: "Proxima Centauri",
    constellation: "Centaurus",
    spectralType: "M5.5Ve",
    starClass: "Anã Vermelha",
    distanceLy: 4.24,
    luminosity: 0.00155,
    mass: 0.1221,
    radius: 0.1542,
    surfaceTemp: 3042,
    absoluteMag: 15.5,
    age: 4.85,
    emoji: "🔸",
    accent: "#FB923C",
    description: "A estrela mais próxima do Sol, parte do sistema triplo Alpha Centauri. Possui pelo menos dois exoplanetas confirmados, incluindo Proxima b na zona habitável.",
    curiosity: "Viajando na velocidade máxima de uma nave atual, levaríamos ~73.000 anos para chegar até ela.",
  },
  {
    id: "rigel",
    name: "Rigel",
    constellation: "Orion",
    spectralType: "B8Ia",
    starClass: "Supergigante Azul",
    distanceLy: 860,
    luminosity: 120000,
    mass: 21,
    radius: 78.9,
    surfaceTemp: 12100,
    absoluteMag: -7.84,
    age: 0.008,
    emoji: "💙",
    accent: "#60A5FA",
    description: "A estrela mais brilhante da constelação de Órion, marcando o pé esquerdo do caçador. Apesar de estar a 860 anos-luz, é visível com facilidade a olho nu.",
    curiosity: "Rigel emite mais luz em um único dia do que o Sol emite em vários anos.",
  },
  {
    id: "vega",
    name: "Vega",
    constellation: "Lyra",
    spectralType: "A0Va",
    starClass: "Anã Branca-Azul",
    distanceLy: 25,
    luminosity: 40.12,
    mass: 2.135,
    radius: 2.362,
    surfaceTemp: 9602,
    absoluteMag: 0.582,
    age: 0.455,
    emoji: "⭐",
    accent: "#A5F3FC",
    description: "Uma das estrelas mais famosas do hemisfério norte, parte do Triângulo do Verão. Foi a estrela polar há 12.000 anos e voltará a sê-lo em ~13.727 d.C.",
    curiosity: "No filme 'Contact' (1997), o primeiro sinal alienígena veio de Vega.",
  },
  {
    id: "antares",
    name: "Antares",
    constellation: "Scorpius",
    spectralType: "M1.5Iab",
    starClass: "Supergigante Vermelha",
    distanceLy: 554,
    luminosity: 57500,
    mass: 12,
    radius: 700,
    surfaceTemp: 3400,
    absoluteMag: -5.28,
    age: 0.012,
    emoji: "🟠",
    accent: "#FB923C",
    description: "O coração do Escorpião, uma das supergigantes vermelhas mais famosas do céu. Seu nome significa 'rival de Marte' em grego, pela cor vermelha intensa.",
    curiosity: "Antares pulsa, variando seu brilho de forma irregular ao longo de meses.",
  },
  {
    id: "polaris",
    name: "Polaris",
    constellation: "Ursa Minor",
    spectralType: "F7Ib",
    starClass: "Supergigante Amarela",
    distanceLy: 433,
    luminosity: 2500,
    mass: 5.4,
    radius: 46,
    surfaceTemp: 6015,
    absoluteMag: -3.64,
    age: 0.07,
    emoji: "🌟",
    accent: "#FDE68A",
    description: "A estrela Polar, localizada quase diretamente acima do Polo Norte celeste. Por séculos foi o guia de navegadores e exploradores para encontrar o norte.",
    curiosity: "Polaris é na verdade um sistema triplo — Polaris A, Ab e B.",
  },
];

// ─── Funções públicas ─────────────────────────────────────────────────────────

export async function getBodies(): Promise<CelestialBody[]> {
  return Promise.resolve(SOLAR_SYSTEM_BODIES);
}

export async function getStars(): Promise<Star[]> {
  return Promise.resolve(FAMOUS_STARS);
}

export const solarSystemApi = { getBodies, getStars };