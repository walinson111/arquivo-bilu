/**
 * @file FavoritesScreen.styles.ts
 * @description Estilos exclusivos da tela de favoritos.
 *
 * Cobre o header com botão de limpar, contador, chips de filtro,
 * cards de favorito com ícone/imagem, badges de tipo e estado vazio.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const favoritesStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ─── Header ───────────────────────────────────────────────────────────────────

  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 28,
    color: Colors.text,
    letterSpacing: 1,
  },

  /** Botão de lixeira para limpar todos os favoritos. */
  clearBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  // ─── Contador ─────────────────────────────────────────────────────────────────

  countRow: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  countText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  // ─── Chips de filtro ──────────────────────────────────────────────────────────

  filtersRow: {
    paddingHorizontal: 16,
    gap: 8,
  },

  /** Chip de filtro por tipo (Planetas, Estrelas, etc.). */
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: "rgba(30,41,59,0.5)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  filterEmoji: { fontSize: 13 },
  filterLabel: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 12,
  },

  // ─── Lista ────────────────────────────────────────────────────────────────────

  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  // ─── Card de favorito ─────────────────────────────────────────────────────────

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
  },

  /** Ícone circular do item com imagem ou emoji. */
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 14,
  },
  cardEmoji: { fontSize: 24 },

  cardBody: { flex: 1, gap: 3 },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardName: {
    fontFamily: Fonts.orbitron,
    fontSize: 13,
    color: Colors.text,
    letterSpacing: 0.3,
    flex: 1,
  },

  /** Badge de tipo com cor dinâmica. */
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
    flexShrink: 0,
  },
  typeBadgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },

  cardSubtitle: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  cardDate: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
    opacity: 0.6,
    marginTop: 2,
  },

  /** Botão de remover favorito. */
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.1)",
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.2)",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  // ─── Estado vazio ─────────────────────────────────────────────────────────────

  emptyWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingTop: 60,
  },
  emptyEmoji: { fontSize: 52, marginBottom: 20 },
  emptyTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
});
