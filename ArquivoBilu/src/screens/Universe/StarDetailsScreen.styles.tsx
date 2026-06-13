/**
 * @file StarDetailsScreen.styles.ts
 * @description Estilos exclusivos da tela de detalhes de estrelas.
 *
 * Cobre hero com imagem/emoji, badges de classe espectral,
 * comparações visuais com o Sol, card de curiosidade e
 * cards de informações detalhadas.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const starDetailsStyles = StyleSheet.create({
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

  heroSection: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 12,
    position: "relative",
  },

  /** Círculo de brilho difuso atrás do orbe da estrela. */
  heroGlow: {
    position: "absolute",
    top: 20,
    width: 200,
    height: 200,
    borderRadius: 100,
    transform: [{ scale: 1.5 }],
  },

  /** Orbe circular com imagem ou emoji da estrela. */
  heroOrb: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(30,41,59,0.6)",
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: { width: "100%", height: "100%" },
  heroEmoji: { fontSize: 72 },

  /** Badge de classe espectral (cor dinâmica via inline). */
  classBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  classBadgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },

  starName: {
    fontFamily: Fonts.orbitron,
    fontSize: 30,
    color: Colors.text,
    letterSpacing: 1,
    textAlign: "center",
  },
  constellation: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  description: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 4,
  },

  /** Botão de favoritar flutuante. */
  favBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(2,6,23,0.75)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Título de seção ──────────────────────────────────────────────────────────

  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 16,
  },

  // ─── Grid de estatísticas ─────────────────────────────────────────────────────

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  statCard: {
    flex: 1,
    minWidth: "28%",
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontFamily: Fonts.orbitron,
    fontSize: 15,
    fontWeight: "700",
  },
  statUnit: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  // ─── Card de comparação com o Sol ─────────────────────────────────────────────

  compareCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 4,
    gap: 14,
  },
  compareRow: { gap: 6 },
  compareHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  compareLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  compareValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 12,
  },

  /** Trilha da barra de comparação com marcador do Sol. */
  compareTrack: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 3,
    overflow: "visible",
    position: "relative",
  },
  compareFill: {
    height: "100%",
    borderRadius: 3,
  },

  /** Linha vertical indicando o valor solar (referência). */
  solarMarker: {
    position: "absolute",
    top: -3,
    width: 2,
    height: 12,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 1,
  },
  compareHint: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
    opacity: 0.5,
  },
  compareDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  // ─── Card de curiosidade ──────────────────────────────────────────────────────

  curiosityCard: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 14,
    borderWidth: 1,
    borderLeftWidth: 3,
    padding: 16,
    marginBottom: 4,
  },
  curiosityEmoji: {
    fontSize: 20,
    marginTop: 1,
  },
  curiosityText: {
    flex: 1,
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.text,
    lineHeight: 22,
  },

  // ─── Card de informações ──────────────────────────────────────────────────────

  infoCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  infoLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 13,
    color: Colors.text,
  },
});
