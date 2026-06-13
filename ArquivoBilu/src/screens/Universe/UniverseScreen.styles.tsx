/**
 * @file UniverseScreen.styles.ts
 * @description Estilos exclusivos da tela do Universo.
 *
 * Estilos globais (centered, loadingText, retryBtn, root) vêm de
 * `@/theme/styles`. Este arquivo cobre o card do Sistema Solar,
 * cards de corpos celestes e estrelas, divisores de seção e
 * os elementos decorativos de órbita animada.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const universeStyles = StyleSheet.create({
  // ─── Header da lista ─────────────────────────────────────────────────────────

  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
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
    marginBottom: 4,
  },
  headerSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },

  list: { paddingBottom: 32 },

  // ─── Card do Sistema Solar ────────────────────────────────────────────────────

  /** Card CTA que navega para a visualização 3D do Sistema Solar. */
  solarCard: {
    marginHorizontal: 16,
    marginBottom: 6,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "40",
    backgroundColor: "rgba(14, 28, 54, 0.70)",
    overflow: "hidden",
  },

  /** Camada de fundo absoluta para planetas decorativos. */
  solarCardBg: { ...StyleSheet.absoluteFillObject },

  /** Planetas decorativos em background (posição dinâmica via inline). */
  bgPlanet: {
    position: "absolute",
    borderRadius: 999,
  },

  /** Row principal do card: ícone animado + texto + seta. */
  solarCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 14,
  },

  /** Coluna esquerda com ícone orbital e badge "3D". */
  solarCardLeft: {
    alignItems: "center",
    gap: 6,
  },

  /** Container circular do ícone do Sistema Solar com sombra azul. */
  solarIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(59,130,246,0.35)",
    backgroundColor: "rgba(10,20,40,0.85)",
    overflow: "hidden",
    shadowColor: Colors.cosmicBlue,
    shadowOpacity: 0.6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },

  /** Núcleo solar (círculo laranja com sombra). */
  sunCore: {
    width: 18,
    height: 18,
    borderRadius: 9,
    shadowColor: "#FFD54F",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 10,
  },

  // ─── Órbitas animadas ─────────────────────────────────────────────────────────

  orbit1: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  orbit2: {
    position: "absolute",
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    justifyContent: "center",
  },
  orbit3: {
    position: "absolute",
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  // ─── Planetas nas órbitas ─────────────────────────────────────────────────────

  planetBlue: {
    position: "absolute",
    top: -3,
    left: "50%",
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4FC3F7",
  },
  planetRed: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FF7043",
    right: -3,
    top: 18,
  },
  planetGreen: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#81C784",
    left: -2,
    bottom: 12,
  },

  /** Badge "3D" abaixo do ícone orbital. */
  solarBadge: {
    backgroundColor: Colors.cosmicBlue + "20",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "55",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  solarBadgeText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.cosmicBlue,
    letterSpacing: 1.5,
  },

  /** Corpo de texto do card Solar. */
  solarCardBody: {
    flex: 1,
    gap: 4,
  },
  solarTitle: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  solarSub: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 18,
  },

  /** Container da seta de navegação do card Solar. */
  solarArrowWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: Colors.cosmicBlue + "15",
    borderWidth: 1,
    borderColor: Colors.cosmicBlue + "30",
    alignItems: "center",
    justifyContent: "center",
  },

  /** Linha de brilho no rodapé do card Solar. */
  solarGlowLine: {
    height: 1,
    backgroundColor: Colors.cosmicBlue,
    opacity: 0.18,
  },

  // ─── Divisor de seção ─────────────────────────────────────────────────────────

  /** Row com linhas laterais e label centralizado (ex: "🪐 PLANETAS"). */
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.07)",
  },
  dividerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dividerEmoji: { fontSize: 13 },
  dividerText: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  dividerCount: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 100,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  dividerCountText: {
    fontFamily: Fonts.orbitron,
    fontSize: 8,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },

  // ─── Card de corpo celeste / estrela ─────────────────────────────────────────

  /** Card de item da lista (planeta, asteroide, cometa ou estrela). */
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10,
    marginHorizontal: 16,
  },

  /** Ícone circular do corpo celeste. */
  emojiWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    overflow: "hidden",
  },
  bodyImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  emoji: { fontSize: 26 },

  /** Área de texto do card (nome, badge, stat, barra). */
  cardBody: { flex: 1, gap: 6 },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },

  /** Nome do corpo celeste. */
  bodyName: {
    fontFamily: Fonts.orbitronBlack,
    fontSize: 14,
    color: Colors.text,
    letterSpacing: 0.5,
    flex: 1,
  },

  /** Badge de tipo (cor dinâmica via inline). */
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 100,
    borderWidth: 1,
  },
  badgeText: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 9,
    letterSpacing: 0.5,
  },

  /** Row com label e valor da stat principal. */
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 11,
    color: Colors.textSecondary,
  },
  statValue: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 11,
  },

  /** Trilha de fundo da barra de progresso. */
  barTrack: {
    height: 3,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 2,
    overflow: "hidden",
  },
  /** Preenchimento da barra (cor dinâmica via inline). */
  barFill: {
    height: "100%",
    borderRadius: 2,
  },
});
