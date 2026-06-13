/**
 * @file PlanetDetailsScreen.styles.ts
 * @description Estilos exclusivos da tela de detalhes de planetas e corpos do Sistema Solar.
 *
 * Cobre hero com imagem/emoji do planeta, grid de estatísticas,
 * cards de informações detalhadas e botão de favoritar.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const planetDetailsStyles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  // ─── Hero ─────────────────────────────────────────────────────────────────────

  heroSection: {
    alignItems: "center",
    paddingVertical: 28,
    gap: 12,
    position: "relative",
  },

  /** Badge de tipo do corpo celeste (cor dinâmica via inline). */
  typeBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 100,
    borderWidth: 1,
  },
  typeBadgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 11,
    letterSpacing: 0.8,
  },

  planetName: {
    fontFamily: Fonts.orbitron,
    fontSize: 30,
    color: Colors.text,
    letterSpacing: 1,
    textAlign: "center",
  },
  planetDescription: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 10,
  },

  /** Viewer circular da imagem ou emoji do planeta. */
  planetViewer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: "hidden",
    borderWidth: 1.5,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.02)",
  },
  planetImage: {
    width: "100%",
    height: "100%",
  },
  planetEmojiWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  planetEmoji: { fontSize: 80 },

  /** Brilho difuso atrás do viewer do planeta. */
  planetGlow: {
    position: "absolute",
    top: 35,
    width: 180,
    height: 180,
    borderRadius: 90,
    opacity: 0.22,
    transform: [{ scale: 1.4 }],
  },

  /** Botão de favoritar flutuante no canto superior direito do hero. */
  favBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(2,6,23,0.75)",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // ─── Título de seção ──────────────────────────────────────────────────────────

  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 16,
  },

  // ─── Grid de estatísticas ─────────────────────────────────────────────────────

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 14,
  },

  /** Card individual de uma stat (gravidade, raio, etc.). */
  statCard: {
    flex: 1,
    minWidth: "28%",
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
    gap: 4,
  },
  statValue: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    fontWeight: "700",
  },
  statUnit: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },

  // ─── Card de informações ──────────────────────────────────────────────────────

  infoCard: {
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 24,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  infoLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 13,
  },
});
