/**
 * @file cards.ts
 * @description Estilos base para cards e seções reutilizáveis no app.
 *
 * Estes estilos definem a aparência padrão de cards com fundo translúcido,
 * bordas sutis e cantos arredondados — padrão visual do Arquivo Bilu.
 *
 * @usage
 *   import { cardStyles } from "@/theme/styles/cards";
 *   <View style={[cardStyles.card, { borderColor: Colors.cosmicBlue }]}>
 */

import { StyleSheet } from "react-native";
import { Colors } from "../colors";
import { Fonts } from "../fonts";

export const cardStyles = StyleSheet.create({
  /**
   * Card genérico com fundo escuro translúcido.
   * Pode receber `borderColor` dinâmico via spread de estilos.
   */
  card: {
    marginHorizontal: 16,
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },

  // ─── Seções (cabeçalho + scroll) ────────────────────────────────────────────

  /** Espaçamento externo de cada seção vertical. */
  sectionWrap: {
    marginBottom: 20,
  },

  /** Header de seção com título à esquerda e link "Ver tudo" à direita. */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 12,
  },

  /** Título de seção em Orbitron maiúsculo (ex: "✦ DESTAQUES"). */
  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2,
  },

  /** Link "Ver tudo →" no canto direito do cabeçalho de seção. */
  seeAll: {
    fontFamily: Fonts.spaceGroteskMedium,
    color: Colors.cosmicBlue,
    fontSize: 12,
  },

  // ─── Badge genérico ──────────────────────────────────────────────────────────

  /** Badge pill com borda e fundo dinâmico (cor definida inline). */
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },

  /** Texto dentro de badge. */
  badgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },
});
