// ─── Dados estáticos do Sistema Solar ────────────────────────────────────────
// Substitui a API le-systeme-solaire.net que exige chave vinculada ao domínio.
// Dados baseados em fontes da NASA / IAU.

export interface CelestialBody {
  id: string;
  englishName: string;
  isPlanet: boolean;
  gravity: number;
  density: number;
  meanRadius: number;
  sideralOrbit: number;
  sideralRotation: number;
  moons: { moon: string }[] | null;
}

const SOLAR_SYSTEM_BODIES: CelestialBody[] = [
  {
    id: "mercury",
    englishName: "Mercury",
    isPlanet: true,
    gravity: 3.7,
    density: 5.427,
    meanRadius: 2439.7,
    sideralOrbit: 87.969,
    sideralRotation: 1407.6,
    moons: null,
  },
  {
    id: "venus",
    englishName: "Venus",
    isPlanet: true,
    gravity: 8.87,
    density: 5.243,
    meanRadius: 6051.8,
    sideralOrbit: 224.701,
    sideralRotation: -5832.5,
    moons: null,
  },
  {
    id: "earth",
    englishName: "Earth",
    isPlanet: true,
    gravity: 9.807,
    density: 5.514,
    meanRadius: 6371.0,
    sideralOrbit: 365.256,
    sideralRotation: 23.9345,
    moons: [{ moon: "Moon" }],
  },
  {
    id: "mars",
    englishName: "Mars",
    isPlanet: true,
    gravity: 3.721,
    density: 3.933,
    meanRadius: 3389.5,
    sideralOrbit: 686.971,
    sideralRotation: 24.6229,
    moons: [{ moon: "Phobos" }, { moon: "Deimos" }],
  },
  {
    id: "jupiter",
    englishName: "Jupiter",
    isPlanet: true,
    gravity: 24.79,
    density: 1.326,
    meanRadius: 69911.0,
    sideralOrbit: 4332.589,
    sideralRotation: 9.9259,
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
    id: "saturn",
    englishName: "Saturn",
    isPlanet: true,
    gravity: 10.44,
    density: 0.687,
    meanRadius: 58232.0,
    sideralOrbit: 10759.22,
    sideralRotation: 10.656,
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
    id: "uranus",
    englishName: "Uranus",
    isPlanet: true,
    gravity: 8.87,
    density: 1.271,
    meanRadius: 25362.0,
    sideralOrbit: 30688.5,
    sideralRotation: -17.24,
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
    id: "neptune",
    englishName: "Neptune",
    isPlanet: true,
    gravity: 11.15,
    density: 1.638,
    meanRadius: 24622.0,
    sideralOrbit: 60182.0,
    sideralRotation: 16.11,
    moons: [
      { moon: "Triton" }, { moon: "Nereid" }, { moon: "Naiad" },
      { moon: "Thalassa" }, { moon: "Despina" }, { moon: "Galatea" },
      { moon: "Larissa" }, { moon: "Proteus" }, { moon: "Halimede" },
      { moon: "Psamathe" }, { moon: "Sao" }, { moon: "Laomedeia" },
      { moon: "Neso" }, { moon: "Hippocamp" },
    ],
  },
];

// ─── Funções públicas (mesma interface da API original) ───────────────────────

export async function getBodies(): Promise<CelestialBody[]> {
  return Promise.resolve(SOLAR_SYSTEM_BODIES);
}

export const solarSystemApi = {
  getBodies,
};