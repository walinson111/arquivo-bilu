/**
 * @file feedback.ts
 * @description Estilos globais para estados de feedback da interface.
 *
 * Inclui estilos compartilhados de carregamento, erro e tentativa,
 * usados em múltiplas telas do app (HomeScreen, UniverseScreen, etc.).
 *
 * @usage
 *   import { feedbackStyles } from "@/theme/styles/feedback";
 *   <View style={feedbackStyles.centered}>...</View>
 */

import { StyleSheet } from "react-native";
import { Colors } from "../colors";
import { Fonts } from "../fonts";

export const feedbackStyles = StyleSheet.create({
  /**
   * Container centralizado usado como tela de loading ou erro.
   * Ocupa toda a área disponível com fundo da cor padrão do app.
   */
  centered: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  /** Texto animado exibido abaixo do spinner de carregamento. */
  loadingText: {
    fontFamily: Fonts.orbitron,
    color: Colors.textSecondary,
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 14,
  },

  /** Título principal da tela de erro (ex: "Sinal perdido"). */
  errorTitle: {
    fontFamily: Fonts.orbitron,
    color: Colors.text,
    fontSize: 16,
    marginBottom: 8,
  },

  /** Mensagem descritiva de erro, centralizada. */
  errorSub: {
    fontFamily: Fonts.spaceGrotesk,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },

  /** Botão de "Tentar novamente" com borda e fundo verde translúcido. */
  retryBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "66",
    backgroundColor: Colors.biluGreen + "15",
  },

  /** Texto do botão de retry, em fonte Orbitron verde. */
  retryText: {
    fontFamily: Fonts.orbitron,
    color: Colors.biluGreen,
    fontSize: 11,
    letterSpacing: 1,
  },
});
