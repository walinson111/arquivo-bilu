/**
 * @file HomeScreen.styles.ts
 * @description Estilos exclusivos da tela inicial (HomeScreen).
 *
 * Estilos globais reutilizáveis (loading, erro, retry, layout) vêm de
 * `@/theme/styles`. Este arquivo contém apenas os estilos específicos
 * desta tela: header, APOD, seção de destaques, trending e CTA.
 *
 * @see feedbackStyles  para estados de loading/erro
 * @see cardStyles      para sectionWrap / sectionHeader / seeAll
 * @see layoutStyles    para root e glowOrb
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const homeStyles = StyleSheet.create({
  // ─── Header ──────────────────────────────────────────────────────────────────

  /** Row do cabeçalho: título à esquerda, badge "AO VIVO" à direita. */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 16,
  },

  /** Linha de data estelar acima do título do app. */
  stardate: {
    fontFamily: Fonts.orbitron,
    color: Colors.textSecondary,
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 4,
  },

  /** Título principal "ARQUIVO BILU". */
  appTitle: {
    fontFamily: Fonts.orbitron,
    color: Colors.text,
    fontSize: 22,
    letterSpacing: 2,
  },

  /** Badge verde pill com ponto animado "AO VIVO". */
  headerBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "40",
    backgroundColor: Colors.biluGreen + "10",
  },

  /** Ponto verde dentro do badge de status. */
  headerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.biluGreen,
  },

  /** Texto do badge de status. */
  headerBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.biluGreen,
    letterSpacing: 1.5,
  },

  // ─── APOD (Astronomy Picture of the Day) ─────────────────────────────────────

  /** Wrapper externo do card APOD com margem horizontal. */
  apodWrap: {
    marginHorizontal: 16,
    marginBottom: 8,
  },

  /** Card do APOD com bordas arredondadas e fundo translúcido. */
  apodCard: {
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: "rgba(30,41,59,0.55)",
    overflow: "hidden",
  },

  /** Área da imagem/vídeo do APOD. */
  apodImgWrap: {
    height: 210,
    position: "relative",
  },

  /** Imagem principal do APOD em modo cover. */
  apodImg: {
    width: "100%",
    height: "100%",
  },

  /** Placeholder exibido quando o APOD é um vídeo (não uma imagem). */
  apodVideoPlaceholder: {
    flex: 1,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  /** Texto do placeholder de vídeo. */
  apodVideoText: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 13,
  },

  /** Badge "FOTO ASTRONÔMICA DO DIA" no canto superior esquerdo da imagem. */
  apodBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "55",
    backgroundColor: "rgba(2,6,23,0.65)",
  },

  /** Ponto indicador azul dentro do badge APOD. */
  apodBadgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.cosmicBlue,
  },

  /** Texto do badge APOD. */
  apodBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 7,
    color: Colors.cosmicBlue,
    letterSpacing: 1.5,
  },

  /** Overlay inferior da imagem com título e data. */
  apodOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },

  /** Título da foto astronômica, limitado a 2 linhas. */
  apodTitle: {
    fontFamily: Fonts.orbitronBlack,
    color: Colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
  },

  /** Data de publicação da foto. */
  apodDate: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 11,
  },

  /** Área clicável da explicação (expandível). */
  apodExplanation: {
    padding: 14,
    paddingTop: 12,
    gap: 8,
  },

  /** Texto da explicação científica, truncado a 3 linhas por padrão. */
  apodExplanationText: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  /** Botão "Ler mais ↓" / "Mostrar menos ↑" de expansão. */
  apodExpandBtn: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 12,
  },

  // ─── Cards de Destaques (scroll horizontal) ───────────────────────────────────

  /** Padding do ScrollView horizontal de destaques. */
  featuredScroll: {
    paddingLeft: 16,
    paddingRight: 4,
  },

  /** Card individual na lista horizontal de destaques. */
  featuredCard: {
    width: 170,
    marginRight: 12,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "rgba(30,41,59,0.55)",
    overflow: "hidden",
  },

  /** Área de imagem do card de destaque. */
  featuredImgWrap: {
    height: 105,
    position: "relative",
  },

  /** Imagem do card de destaque em modo cover. */
  featuredImg: {
    width: "100%",
    height: "100%",
  },

  /** Badge de categoria no canto superior do card (cor dinâmica via inline). */
  featuredBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },

  /** Texto do badge de categoria. */
  featuredBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 7,
    letterSpacing: 0.8,
  },

  /** Área de informações abaixo da imagem do card. */
  featuredInfo: {
    padding: 10,
    gap: 2,
  },

  /** Label de categoria (ex: "PLANETA", "ESTRELA"). */
  featuredLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    letterSpacing: 1.2,
  },

  /** Nome principal do corpo celeste no card. */
  featuredName: {
    fontFamily: Fonts.orbitronBlack,
    color: Colors.text,
    fontSize: 14,
    lineHeight: 18,
  },

  /** Subtítulo descritivo do card. */
  featuredSub: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 11,
  },

  // ─── Lista "Em Alta" (Trending) ───────────────────────────────────────────────

  /** Row de um item da lista trending. */
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 13,
  },

  /** Ícone circular do item (imagem ou emoji). */
  trendIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  /** Imagem circular do corpo celeste no item trending. */
  trendImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  /** Emoji fallback quando não há imagem disponível. */
  trendEmoji: {
    fontSize: 18,
  },

  /** Coluna de texto (nome + tipo) do item trending. */
  trendText: {
    flex: 1,
    gap: 2,
  },

  /** Nome do corpo celeste na lista trending. */
  trendName: {
    fontFamily: Fonts.spaceGroteskBold,
    color: Colors.text,
    fontSize: 14,
  },

  /** Tipo do corpo celeste (ex: "Planeta Anão", "Estrela"). */
  trendType: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 11,
  },

  /** Seta "›" de navegação à direita do item. */
  trendArrow: {
    color: Colors.textSecondary,
    fontSize: 22,
  },

  /** Divisor sutil entre itens da lista trending. */
  trendDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 13,
  },

  // ─── CTA — Arquivos Alienígenas ───────────────────────────────────────────────

  /** Card CTA com borda verde e fundo escuro opaco. */
  ctaCard: {
    marginHorizontal: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "35",
    backgroundColor: "rgba(15,23,42,0.9)",
    overflow: "hidden",
  },

  /** Brilho decorativo no canto superior esquerdo do CTA. */
  ctaGlow: {
    position: "absolute",
    top: -40,
    left: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: Colors.biluGreen,
    opacity: 0.06,
  },

  /** Row interno do CTA com ícone, texto e seta. */
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },

  /** Container quadrado do emoji alienígena. */
  ctaLeft: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.biluGreen + "15",
    borderWidth: 1,
    borderColor: Colors.biluGreen + "30",
    alignItems: "center",
    justifyContent: "center",
  },

  /** Emoji principal do CTA. */
  ctaEmoji: {
    fontSize: 28,
  },

  /** Coluna de texto do CTA. */
  ctaText: {
    flex: 1,
    gap: 3,
  },

  /** Eyebrow label acima do título do CTA. */
  ctaEyebrow: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.biluGreen,
    letterSpacing: 2,
  },

  /** Título principal do CTA. */
  ctaTitle: {
    fontFamily: Fonts.orbitronBlack,
    color: Colors.text,
    fontSize: 15,
    letterSpacing: 0.3,
  },

  /** Subtítulo descritivo do CTA. */
  ctaSub: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    fontSize: 12,
  },

  /** Container da seta de navegação do CTA. */
  ctaArrow: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.biluGreen + "12",
    borderWidth: 1,
    borderColor: Colors.biluGreen + "28",
    alignItems: "center",
    justifyContent: "center",
  },

  /** Seta "›" do CTA. */
  ctaArrowText: {
    fontSize: 22,
    lineHeight: 26,
  },

  /** Linha de brilho no rodapé do card CTA. */
  ctaGlowLine: {
    height: 1,
    backgroundColor: Colors.biluGreen,
    opacity: 0.15,
  },


  // ─── Hint de zoom na imagem APOD ─────────────────────────────────────────────

  /** Indicador de lupa no canto da imagem sinalizando que é clicável. */
  apodZoomHint: {
    position: "absolute",
    bottom: 48,
    right: 12,
    backgroundColor: "rgba(2,6,23,0.55)",
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  apodZoomIcon: {
    fontSize: 14,
  },

  // ─── Modal de zoom da imagem APOD ────────────────────────────────────────────

  /** Overlay escuro que cobre a tela ao abrir o modal. Fechar ao tocar. */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.92)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  /** Card com animação de escala ao abrir. */
  modalCard: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: "rgba(10,18,35,0.98)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },

  /** Botão "✕" no canto superior direito do modal. */
  modalCloseBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  modalCloseText: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
  },

  /** Imagem em tamanho completo dentro do modal. */
  modalImage: {
    width: "100%",
    height: 320,
  },

  /** Área com título e crédito abaixo da imagem. */
  modalInfo: {
    padding: 16,
    gap: 6,
  },
  modalTitle: {
    fontFamily: "Orbitron_700Bold",
    fontSize: 13,
    color: "#F8FAFC",
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  modalCredit: {
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 11,
    color: "#94A3B8",
    letterSpacing: 0.5,
  },
});
