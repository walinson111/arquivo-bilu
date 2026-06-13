/**
 * @file SolarSystemScreen.styles.ts
 * @description Estilos exclusivos da tela de visualização 3D do Sistema Solar.
 *
 * A tela usa Three.js/Expo GL para renderizar o sistema solar em 3D.
 * Os estilos aqui cobrem elementos sobrepostos ao canvas:
 * header fixo, botão de pausa, tooltip de planeta selecionado e dicas de gesto.
 */

import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const solarSystemStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#020617",
  },

  /** Canvas GL que ocupa toda a área da tela. */
  canvas: {
    flex: 1,
  },

  // ─── Header sobreposto ao canvas ─────────────────────────────────────────────

  /** Header posicionado absolutamente sobre o canvas 3D. */
  header: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 40,
    left: 20,
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 22,
    color: "#F8FAFC",
    letterSpacing: 1,
  },

  // ─── Dicas de gesto ───────────────────────────────────────────────────────────

  /** Container das dicas de gestos (arrastar, pinçar) na parte inferior. */
  hints: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  hintText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.3,
  },

  // ─── Botão de pausa ───────────────────────────────────────────────────────────

  /** Botão de pause/play posicionado no canto superior direito. */
  pauseBtn: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 40,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(2,6,23,0.7)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Tooltip de planeta ───────────────────────────────────────────────────────

  /**
   * Card tooltip exibido ao tocar em um planeta.
   * Mostra nome, imagem/emoji e botão "Ver detalhes".
   */
  tooltip: {
    position: "absolute",
    bottom: 110,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(15, 23, 42, 0.92)",
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  tooltipEmoji: { fontSize: 32 },

  /** Container circular da imagem do planeta no tooltip. */
  tooltipImgWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    flexShrink: 0,
  },
  tooltipImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  tooltipName: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  tooltipHint: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },

  /** Botão "Ver detalhes" dentro do tooltip. */
  tooltipBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
  },
  tooltipBtnText: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 1,
  },
  tooltipClose: { padding: 4 },
});
