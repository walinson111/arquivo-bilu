/**
 * @file CustomTabBar.styles.ts
 * @description Estilos exclusivos da tab bar customizada do app.
 *
 * Inclui o container com fundo translúcido e sombra, linha de brilho
 * no topo, botões normais e o botão central destacado com sombra colorida.
 */

import { Platform, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

export const tabBarStyles = StyleSheet.create({
  /** Container principal da tab bar com sombra nativa. */
  container: {
    backgroundColor: "rgba(2, 6, 23, 0.97)",
    borderTopWidth: 1,
    borderTopColor: "rgba(56, 189, 248, 0.15)",
    paddingTop: 8,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
      },
      android: {
        elevation: 20,
      },
    }),
  },

  /** Linha de brilho azul no topo da tab bar. */
  topGlow: {
    position: "absolute",
    top: 0,
    left: "10%",
    right: "10%",
    height: 1,
    backgroundColor: Colors.cosmicBlue,
    opacity: 0.25,
  },

  /** Row com todos os botões de tab. */
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },

  // ─── Botões normais ───────────────────────────────────────────────────────────

  tabBtn: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    paddingTop: 4,
    paddingBottom: 2,
  },

  /** Área do ícone com fundo dinâmico quando ativo. */
  iconWrap: {
    width: 40,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.3,
  },

  // ─── Botão central (Sistema Solar 3D) ────────────────────────────────────────

  /** Wrapper do botão central com margem negativa para elevar acima da barra. */
  centerWrapper: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    marginTop: -22,
  },

  /** Botão circular central com sombra colorida animada. */
  centerBtn: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 16,
    elevation: 12,
  },
  centerLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});
