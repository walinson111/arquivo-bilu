/**
 * @file UFODetailsScreen.styles.ts
 * @description Estilos exclusivos da tela de detalhes de um caso de OVNI.
 *
 * Cobre hero com ícone e metadados do caso, galeria de thumbnails,
 * modal de imagem ampliada, lista de evidências e rodapé.
 */

import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

const { width: SCREEN_W } = Dimensions.get("window");

/** Tamanho de cada thumbnail: 3 por linha com espaçamento. */
export const IMG_SIZE = (SCREEN_W - 48) / 3 - 6;

export const ufoDetailsStyles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },

  // ─── Header de navegação ──────────────────────────────────────────────────────

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },

  /** Botão voltar com fundo translúcido. */
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // ─── Hero ─────────────────────────────────────────────────────────────────────

  hero: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 10,
  },

  /** Ícone grande do tipo de caso com borda e fundo dinâmico. */
  heroIcon: {
    width: 100,
    height: 100,
    borderRadius: 28,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  heroEmoji: { fontSize: 48 },

  /** Badge de categoria do caso (cor dinâmica via inline). */
  heroBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 2,
  },

  heroTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 22,
    color: Colors.text,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  heroMeta: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
  },

  /** Row de testemunhas com ícone de olho. */
  witnessRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  witnessEmoji: { fontSize: 14 },
  witnessText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 13,
    color: Colors.text,
  },

  // ─── Título de seção ──────────────────────────────────────────────────────────

  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 2.5,
    marginBottom: 10,
    marginTop: 20,
  },

  // ─── Card de descrição ────────────────────────────────────────────────────────

  descCard: {
    backgroundColor: "rgba(15,23,42,0.9)",
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 16,
  },
  descText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 24,
  },

  // ─── Galeria de imagens ───────────────────────────────────────────────────────

  /** Grid de thumbnails em 3 colunas. */
  gallery: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },

  /** Thumbnail individual da galeria. */
  thumb: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "rgba(30,41,59,0.8)",
  },

  /** Placeholder com spinner enquanto a imagem carrega. */
  thumbPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30,41,59,0.8)",
  },
  thumbImg: { width: "100%", height: "100%" },

  galleryEmpty: { paddingVertical: 20 },
  galleryEmptyText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  /** Crédito da galeria, alinhado à direita. */
  galleryCredit: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
    opacity: 0.5,
    marginTop: 8,
    textAlign: "right",
  },

  // ─── Modal de imagem ampliada ─────────────────────────────────────────────────

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.88)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },

  /** Botão de fechar no canto superior do modal. */
  modalClose: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalImg: { width: "100%", height: 260 },
  modalInfo: { padding: 16, gap: 6 },
  modalTitle: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 14,
    lineHeight: 20,
  },

  // ─── Evidências ───────────────────────────────────────────────────────────────

  evidenceCard: {
    backgroundColor: "rgba(15,23,42,0.9)",
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  evidenceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 14,
  },

  /** Ponto colorido com a cor de acento do tipo de caso. */
  evidenceDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  evidenceText: {
    flex: 1,
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.text,
    lineHeight: 20,
  },

  // ─── Rodapé ───────────────────────────────────────────────────────────────────

  footer: { alignItems: "center", gap: 6, paddingTop: 32 },
  footerEmoji: { fontSize: 24 },
  footerText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    opacity: 0.5,
  },
});
