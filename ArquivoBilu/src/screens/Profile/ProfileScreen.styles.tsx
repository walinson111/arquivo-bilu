/**
 * @file ProfileScreen.styles.ts
 * @description Estilos exclusivos da tela de perfil do usuário.
 *
 * Cobre o header, seção hero com avatar animado e nome,
 * bubbles de estatísticas, cards de informações do app,
 * modais de edição de nome e seleção de avatar.
 */

import { StyleSheet } from "react-native";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

export const profileStyles = StyleSheet.create({
  root:      { flex: 1, backgroundColor: Colors.background },
  scroll:    { paddingHorizontal: 20, paddingBottom: 48 },
  rowBorder: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },

  // ─── Header ───────────────────────────────────────────────────────────────────

  header:      { paddingTop: 20, paddingBottom: 8 },
  headerLabel: { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.biluGreen, letterSpacing: 2.5, marginBottom: 6 },
  headerTitle: { fontFamily: Fonts.orbitron, fontSize: 28, color: Colors.text, letterSpacing: 1 },

  // ─── Hero / Avatar ────────────────────────────────────────────────────────────

  heroSection: { alignItems: "center", paddingVertical: 28, gap: 8 },

  /** Container do avatar com brilho difuso e badge de editar. */
  avatarWrap: { position: "relative", alignItems: "center", justifyContent: "center", marginBottom: 4 },

  /** Círculo de brilho verde atrás do avatar. */
  avatarGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.biluGreen,
    opacity: 0.12,
    transform: [{ scale: 1.6 }],
  },

  /** Círculo do avatar com fundo escuro. */
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(30,41,59,0.8)",
    borderWidth: 1.5,
    borderColor: Colors.biluGreen + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: { fontSize: 42 },

  /** Badge de lápis no canto inferior do avatar. */
  avatarEditBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen + "55",
    padding: 4,
  },

  nameRow:   { flexDirection: "row", alignItems: "center", gap: 8 },
  userName:  { fontFamily: Fonts.orbitron, fontSize: 20, color: Colors.text, letterSpacing: 0.5 },
  editBtn:   { padding: 4 },
  userEmail: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary },
  appTagline: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },

  // ─── Bubbles de estatísticas ─────────────────────────────────────────────────

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 28 },

  /** Bubble individual de uma estatística (Planetas, Luas, Estrelas). */
  statBubble: {
    flex: 1,
    backgroundColor: "rgba(30,41,59,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  statEmoji: { fontSize: 22 },
  statValue: { fontFamily: Fonts.orbitron, fontSize: 16, color: Colors.text, letterSpacing: 0.5 },
  statLabel: { fontFamily: Fonts.spaceGrotesk, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.3 },

  // ─── Título de seção ──────────────────────────────────────────────────────────

  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 4,
  },

  // ─── Cards de informação ──────────────────────────────────────────────────────

  infoCard: {
    backgroundColor: "rgba(30,41,59,0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 28,
    overflow: "hidden",
  },
  infoRow:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 13, paddingHorizontal: 16 },
  infoLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoLabel: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary },
  infoValue: { fontFamily: Fonts.spaceGroteskBold, fontSize: 13, color: Colors.text },

  // ─── Rodapé ───────────────────────────────────────────────────────────────────

  footer:        { alignItems: "center", gap: 4 },
  footerText:    { fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary },
  footerVersion: { fontFamily: Fonts.orbitron, fontSize: 9, color: Colors.textSecondary, letterSpacing: 1.5, opacity: 0.5 },

  // ─── Modais ───────────────────────────────────────────────────────────────────

  /** Overlay escuro de fundo dos modais. */
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },

  /** Bottom sheet dos modais (editar nome e escolher avatar). */
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(10,18,35,0.98)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "rgba(255,255,255,0.1)",
    padding: 24,
    gap: 16,
  },
  sheetTitle: { fontFamily: Fonts.orbitron, fontSize: 14, color: Colors.text, letterSpacing: 1, textAlign: "center" },
  sheetInput: {
    backgroundColor: "rgba(30,41,59,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 15,
    color: Colors.text,
  },
  sheetBtn:     { backgroundColor: Colors.biluGreen, borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  sheetBtnText: { fontFamily: Fonts.orbitron, fontSize: 12, color: "#000", letterSpacing: 1.5 },

  // ─── Grid de emojis (modal de avatar) ────────────────────────────────────────

  emojiGrid:    { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center" },
  emojiOption:  {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "rgba(30,41,59,0.7)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },

  /** Opção de avatar selecionada, com borda verde. */
  emojiSelected: { borderColor: Colors.biluGreen, backgroundColor: Colors.biluGreen + "22" },
  emojiText:     { fontSize: 26 },
});
