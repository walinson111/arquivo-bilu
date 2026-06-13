/**
 * @file SpaceCard.styles.ts
 * @description Estilos do componente SpaceCard.
 *
 * Card genérico com título e ícone emoji, usado para navegação
 * entre seções do app.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

export const spaceCardStyles = StyleSheet.create({
  /** Card com fundo escuro e borda verde. */
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen,
  },

  /** Emoji de ícone do card. */
  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  /** Título do card. */
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});
