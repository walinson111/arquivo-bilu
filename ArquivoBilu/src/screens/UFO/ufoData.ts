export type CaseType = "avistamento" | "contato" | "sinal" | "fisico";

export interface UFOCase {
  id: string;
  title: string;
  location: string;
  year: number;
  type: CaseType;
  restricted: boolean;
  witnesses: number | null;
  summary: string;
  fullDescription: string;
  evidence: string[];
  nasaQuery: string; 
}

export const UFO_CASES: UFOCase[] = [
  {
    id: "roswell",
    title: "Incidente de Roswell",
    location: "Novo México, EUA",
    year: 1947,
    type: "avistamento",
    restricted: false,
    witnesses: 11,
    nasaQuery: "roswell new mexico desert aerial",
    summary: "Destroços de origem desconhecida recuperados pelo exército. Classificado por décadas.",
    fullDescription:
      "Em julho de 1947, destroços de um objeto não identificado foram encontrados em uma fazenda próxima a Roswell. O exército inicialmente confirmou a recuperação de um 'disco voador', mas logo voltou atrás alegando ser um balão meteorológico. Testemunhas militares relataram corpos de humanoides sendo transportados. Documentos desclassificados décadas depois revelaram inconsistências graves no relato oficial.",
    evidence: [
      "Comunicado original do USAF confirmando 'disco voador'",
      "Depoimentos de 11 militares presentes",
      "Fragmentos metálicos com propriedades incomuns",
    ],
  },
  {
    id: "phoenix",
    title: "Phoenix Lights",
    location: "Arizona, EUA",
    year: 1997,
    type: "avistamento",
    restricted: false,
    witnesses: 10000,
    nasaQuery: "arizona night sky lights aerial phenomenon",
    summary: "Formação em V de luzes silenciosas vista por mais de 10.000 pessoas em dois estados.",
    fullDescription:
      "Na noite de 13 de março de 1997, uma formação em V de luzes silenciosas percorreu o céu de Nevada ao Arizona. Estimado em mais de 1,5 km de extensão, o objeto se movia lentamente sem emitir som. O então governador do Arizona, Fife Symington, foi uma das testemunhas — e mais tarde admitiu publicamente que o que viu não tinha explicação convencional.",
    evidence: [
      "Gravações em vídeo de dezenas de moradores",
      "Depoimento público do governador Fife Symington",
      "Radar do aeroporto Sky Harbor sem registro do objeto",
    ],
  },
  {
    id: "nimitz",
    title: "USS Nimitz — Tic Tac",
    location: "Oceano Pacífico, EUA",
    year: 2004,
    type: "avistamento",
    restricted: false,
    witnesses: 6,
    nasaQuery: "aircraft carrier navy fighter jet ocean",
    summary: "Pilotos da Marinha americana filmaram objeto em forma de Tic Tac realizando manobras impossíveis.",
    fullDescription:
      "Em novembro de 2004, pilotos do porta-aviões USS Nimitz interceptaram um objeto branco oval descendo de 24.000 para 15 metros de altitude em segundos, sem superfícies de controle, calor ou propulsão visíveis. O vídeo FLIR foi mantido em sigilo por 16 anos até ser desclassificado pelo Pentágono em 2020. O piloto Commander David Fravor descreveu o encontro como a coisa mais perturbadora que já viu no ar.",
    evidence: [
      "Vídeo FLIR desclassificado pelo Pentágono (2020)",
      "Depoimento do Cmdr. David Fravor ao Congresso",
      "Rastreamento por radar de múltiplos navios simultaneamente",
    ],
  },
  {
    id: "wow",
    title: "Sinal Wow!",
    location: "Ohio, EUA",
    year: 1977,
    type: "sinal",
    restricted: false,
    witnesses: 1,
    nasaQuery: "radio telescope deep space signal observatory",
    summary: "Sinal de rádio de 72 segundos com todas as características de origem interestelar. Nunca reproduzido.",
    fullDescription:
      "Em 15 de agosto de 1977, o radioastrônomo Jerry Ehman detectou um sinal de rádio na frequência de 1420 MHz — a frequência do hidrogênio, considerada a ideal para comunicação interestelar. Ehman anotou 'Wow!' na impressão. O sinal durou 72 segundos, o máximo detectável pelo telescópio, com intensidade 30 vezes acima do ruído de fundo. Apesar de décadas de monitoramento, nunca foi detectado novamente.",
    evidence: [
      "Impressão original do computador com a anotação 'Wow!'",
      "Frequência de hidrogênio neutro (1420 MHz)",
      "Intensidade 30x acima do ruído de fundo",
    ],
  },
  {
    id: "rendlesham",
    title: "Rendlesham Forest",
    location: "Suffolk, Reino Unido",
    year: 1980,
    type: "contato",
    restricted: false,
    witnesses: 80,
    nasaQuery: "forest night lights infrared mysterious",
    summary: "Soldados americanos registraram objeto pousado em floresta britânica próxima a base nuclear.",
    fullDescription:
      "Na madrugada de 26 de dezembro de 1980, soldados da base USAF Bentwaters investigaram luzes estranhas na Rendlesham Forest. O Sargento Jim Penniston relatou tocar um objeto triangular com hieróglifos gravados. O Dep. Base Commander Charles Halt gravou em áudio a perseguição ao objeto na noite seguinte. Análises do solo confirmaram radiação acima do normal e marcas físicas no local.",
    evidence: [
      "Gravação em áudio do Lt. Col. Charles Halt (original preservada)",
      "Marcas físicas triangulares no solo da floresta",
      "Amostras de solo com radiação acima do normal",
    ],
  },
  {
    id: "tehran",
    title: "Intercepção de Teerã",
    location: "Teerã, Irã",
    year: 1976,
    type: "avistamento",
    restricted: false,
    witnesses: 4,
    nasaQuery: "F-4 fighter jet night intercept radar",
    summary: "Dois caças F-4 iranianos tiveram sistemas de armas neutralizados ao tentar interceptar o objeto.",
    fullDescription:
      "Em setembro de 1976, dois jatos F-4 foram enviados para interceptar um objeto luminoso sobre Teerã. O primeiro piloto teve todos os sistemas desligados ao se aproximar. O segundo tentou lançar um míssil — os sistemas travaram. O objeto realizou manobras estimadas em 7.000 km/h. A DIA americana documentou o caso como um dos mais críveis e tecnicamente relevantes já registrados.",
    evidence: [
      "Relatório oficial da DIA (desclassificado)",
      "Dados de radar da Força Aérea iraniana",
      "Depoimentos dos dois pilotos",
    ],
  },
  {
    id: "congress2023",
    title: "Audiência no Congresso",
    location: "Washington D.C., EUA",
    year: 2023,
    type: "sinal",
    restricted: false,
    witnesses: null,
    nasaQuery: "UAP unidentified aerial phenomena pentagon declassified",
    summary: "Ex-oficiais militares juramentaram ao Congresso a existência de programas secretos de recuperação de UAPs.",
    fullDescription:
      "Em julho de 2023, ex-analista de inteligência David Grusch testemunhou perante o Congresso americano que o governo possui materiais de origem não humana e conduz programas secretos de engenharia reversa. Grusch afirmou que colegas foram ameaçados para não falar. As audiências forçaram a criação do AARO — escritório oficial de investigação de UAPs — e a aprovação de leis de transparência.",
    evidence: [
      "Testemunho juramentado de David Grusch",
      "Criação oficial do AARO pelo Pentágono",
      "Resolução bipartidária de transparência aprovada",
    ],
  },
  {
    id: "classified_01",
    title: "Caso ████████",
    location: "████████",
    year: 0,
    type: "contato",
    restricted: true,
    witnesses: null,
    nasaQuery: "",
    summary: "Acesso negado.",
    fullDescription: "",
    evidence: [],
  },
  {
    id: "classified_02",
    title: "Operação ████████",
    location: "████████",
    year: 0,
    type: "avistamento",
    restricted: true,
    witnesses: null,
    nasaQuery: "",
    summary: "Acesso negado.",
    fullDescription: "",
    evidence: [],
  },
];

export const TYPE_INFO: Record<CaseType, { emoji: string; label: string; accent: string }> = {
  avistamento: { emoji: "🛸", label: "Avistamento", accent: "#38BDF8" },
  contato:     { emoji: "👽", label: "Contato",     accent: "#A855F7" },
  sinal:       { emoji: "📡", label: "Sinal",       accent: "#00FF9D" },
  fisico:      { emoji: "⚡", label: "Físico",      accent: "#FCD34D" },
};