/**
 * @file layout.ts
 * @description Estilos de layout e elementos decorativos de fundo.
 *
 * Inclui o container raiz das telas e os "glow orbs" —
 * círculos desfocados coloridos usados como decoração de fundo.
 *
 * @usage
 *   import { layoutStyles } from "@/theme/styles/layout";
 *   <View style={layoutStyles.root}>...</View>
 *   <View style={[layoutStyles.glowOrb, { top: -60, right: -80, width: 280, height: 280, backgroundColor: Colors.cosmicBlue + "0F" }]} />
 */

import { StyleSheet } from "react-native";
import { Colors } from "../colors";

export const layoutStyles = StyleSheet.create({
  /**
   * Container raiz das telas principais.
   * Recebe `paddingTop` dinâmico via `useSafeAreaInsets`.
   */
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  /**
   * Círculo decorativo de brilho difuso no fundo da tela.
   * Posição, tamanho e cor devem ser definidos inline via spread.
   *
   * @example
   * <View style={[layoutStyles.glowOrb, { top: -60, right: -80, width: 280, height: 280, backgroundColor: Colors.cosmicBlue + "0F" }]} />
   */
  glowOrb: {
    position: "absolute",
    borderRadius: 999,
  },
});
