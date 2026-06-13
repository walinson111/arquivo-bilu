/**
 * @file AuthScreen.styles.ts
 * @description Estilos exclusivos das telas de autenticação (Login e Register).
 *
 * Os estilos de formulário compartilhados (input, field, btn, footer, etc.)
 * já estão em `@/theme/styles/forms` e devem ser importados de lá.
 * Este arquivo cobre apenas o header visual exclusivo das telas de auth:
 * o badge "ARQUIVO BILU", o título grande e o subtítulo.
 *
 * @usage
 *   import { authStyles } from "./AuthScreen.styles";
 *   import { formStyles, layoutStyles } from "@/theme/styles";
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const authStyles = StyleSheet.create({
  /** Container raiz com padding lateral e fundo escuro. */
  root: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
  },

  /** Container para o RegisterScreen (que usa ScrollView com paddingHorizontal). */
  rootScroll: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },

  // ─── Header visual ────────────────────────────────────────────────────────────

  header: {
    paddingTop: 40,
    paddingBottom: 36,
    gap: 10,
  },

  /** Badge "ARQUIVO BILU" acima do título. */
  badge: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
  },

  /** Título principal da tela de auth (ex: "Bem-vindo de volta 👋"). */
  title: {
    fontFamily: Fonts.orbitron,
    fontSize: 30,
    color: Colors.text,
    lineHeight: 40,
  },

  /** Subtítulo descritivo abaixo do título. */
  sub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});
