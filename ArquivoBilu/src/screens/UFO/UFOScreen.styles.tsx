/**
 * @file UFOScreen.styles.ts
 * @description Estilos exclusivos da tela de casos de OVNIs / Arquivos Alienígenas.
 *
 * Cobre o header com alien animado, chips de filtro por tipo de caso,
 * cards de casos normais e restritos, e estado vazio.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const ufoStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  list: { paddingBottom: 40 },

  // ─── Header ───────────────────────────────────────────────────────────────────

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },

  /** Container do alien animado com brilho pulsante. */
  alienWrap: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  /** Círculo de brilho que pulsa atrás do emoji de alien. */
  alienGlow: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#00FF9D",
  },
  alienEmoji: { fontSize: 56, zIndex: 1 },

  headerText: { flex: 1, gap: 4 },
  headerEyebrow: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 22,
    color: Colors.text,
    letterSpacing: 0.5,
    lineHeight: 30,
  },
  headerSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },

  // ─── Filtros de tipo ──────────────────────────────────────────────────────────

  filterRow: {
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 4,
  },

  /** Chip de filtro; cor ativa definida inline. */
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.09)",
    backgroundColor: "rgba(30,41,59,0.45)",
  },

  /** Variação do chip quando selecionado ("Todos"). */
  chipActive: {
    borderColor: Colors.biluGreen + "60",
    backgroundColor: Colors.biluGreen + "12",
  },
  chipEmoji: { fontSize: 13 },
  chipText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  chipTextActive: { color: Colors.biluGreen },

  // ─── Divisor "REGISTROS" ──────────────────────────────────────────────────────

  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  dividerText: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // ─── Card de caso normal ──────────────────────────────────────────────────────

  card: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: "rgba(15,23,42,0.9)",
    overflow: "hidden",
  },

  /** Barra lateral colorida com a cor de acento do tipo de caso. */
  stripe: { width: 3, flexShrink: 0 },

  cardContent: { flex: 1, padding: 14, gap: 8 },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  /** Ícone de tipo do caso. */
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  iconEmoji: { fontSize: 20 },

  cardTitles: { flex: 1, gap: 2 },
  cardTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 13,
    color: Colors.text,
    letterSpacing: 0.2,
  },
  cardMeta: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  /** Badge de tipo no canto do card. */
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    flexShrink: 0,
  },
  typeBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    letterSpacing: 0.8,
  },

  cardSummary: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  // ─── Card de caso restrito ────────────────────────────────────────────────────

  /** Card com borda tracejada vermelha para casos classificados. */
  cardRestricted: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EF444425",
    borderStyle: "dashed",
    backgroundColor: "rgba(15,23,42,0.6)",
    padding: 14,
    opacity: 0.6,
  },
  restrictedIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EF444415",
    borderWidth: 1,
    borderColor: "#EF444430",
    alignItems: "center",
    justifyContent: "center",
  },
  restrictedEmoji: { fontSize: 20 },
  restrictedTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 13,
    color: "#94A3B8",
    letterSpacing: 0.2,
  },
  restrictedSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: "#475569",
    marginTop: 2,
  },
  restrictedBadge: {
    marginLeft: "auto",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF444440",
    backgroundColor: "#EF444412",
  },
  restrictedBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: "#EF4444",
    letterSpacing: 0.8,
  },

  // ─── Estado vazio ─────────────────────────────────────────────────────────────

  empty: { alignItems: "center", paddingTop: 60, gap: 12 },
  emptyText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
