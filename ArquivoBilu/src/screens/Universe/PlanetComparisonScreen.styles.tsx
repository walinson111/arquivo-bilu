/**
 * @file PlanetComparisonScreen.styles.ts
 * @description Estilos exclusivos da tela de comparação entre planetas.
 *
 * Cobre os seletores de planeta (dropdowns), canvas 3D de comparação,
 * tabela de stats lado a lado e card de luas.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const planetComparisonStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },

  // ─── Seletores de planeta ─────────────────────────────────────────────────────

  /** Row com os dois dropdowns de seleção e o botão de swap. */
  selectorsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 8,
    zIndex: 100,
  },

  /** Wrapper de cada picker (com label acima). */
  pickerWrap: {
    flex: 1,
    zIndex: 100,
  },
  pickerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  /** Botão que abre o modal de seleção de planeta. */
  pickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(30,41,59,0.8)",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  pickerBtnText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 13,
    color: Colors.text,
    flex: 1,
  },

  /** Botão de troca (swap) entre os dois planetas selecionados. */
  swapBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(30,41,59,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  swapIcon: {
    fontSize: 18,
    color: Colors.textSecondary,
  },

  // ─── Modal de seleção ─────────────────────────────────────────────────────────

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalSheet: {
    backgroundColor: "rgba(10,18,35,0.98)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    maxHeight: "75%",
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    marginBottom: 12,
  },
  modalTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 10,
  },

  /** Título de grupo dentro do modal (ex: "PLANETAS", "PLANETAS ANÕES"). */
  pickerGroupTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    letterSpacing: 1.5,
    color: Colors.textSecondary,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 4,
    opacity: 0.7,
  },
  pickerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  pickerItemText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // ─── Nomes e canvas ───────────────────────────────────────────────────────────

  /** Row com os nomes dos dois planetas e "VS" centralizado. */
  namesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 4,
  },
  planetName: {
    fontFamily: Fonts.orbitron,
    fontSize: 15,
    letterSpacing: 0.5,
    flex: 1,
    textAlign: "center",
  },
  vsText: {
    fontFamily: Fonts.orbitron,
    fontSize: 12,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  /** Container do canvas 3D de comparação. */
  canvasWrap: { height: 220 },

  /** Labels sobrepostos ao canvas com o nome de cada planeta. */
  canvasLabels: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
  },
  canvasTag: {
    backgroundColor: "rgba(2,6,23,0.75)",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  canvasTagText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
  },

  // ─── Tabela de stats ──────────────────────────────────────────────────────────

  statsScroll: { flex: 1 },
  statsContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },

  /** Cabeçalho da tabela com labels de cada planeta. */
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingBottom: 4,
  },
  tableHeaderLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    width: 80,
  },
  tableHeaderSides: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableHeaderSide: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    letterSpacing: 1,
    flex: 1,
  },

  /** Card que agrupa as linhas de stats. */
  statsCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },

  /** Linha de uma stat com label e barras comparativas. */
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 10,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
    width: 68,
    letterSpacing: 0.2,
  },
  statBars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statSide: { flex: 1, gap: 4 },
  statSideRight: { alignItems: "flex-end" },
  statVal: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 11,
  },

  barTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: { height: 4, borderRadius: 2 },
  barFillRight: { height: 4, borderRadius: 2, alignSelf: "flex-end" },

  /** Divisor vertical entre as duas colunas de stats. */
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  statDividerH: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 14,
  },

  // ─── Card de luas ─────────────────────────────────────────────────────────────

  moonsCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 16,
  },
  moonsTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 11,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  moonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  moonsSide: { flex: 1, gap: 4 },
  moonsSideRight: { alignItems: "flex-end" },
  moonsDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  moonsPlanet: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 12,
    marginBottom: 4,
  },
  moonName: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  moonMore: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
    color: Colors.textSecondary,
    opacity: 0.6,
    marginTop: 2,
  },
});
