/**
 * @file colors.ts
 * @description Paleta de cores global do Arquivo Bilu.
 *
 * Todas as cores do app devem ser referenciadas a partir daqui.
 * Nunca use valores hexadecimais literais diretamente nos componentes —
 * isso garante consistência visual e facilita mudanças de tema no futuro.
 *
 * @example
 *   import { Colors } from "@/theme/colors";
 *   backgroundColor: Colors.background
 *
 * Para tons com opacidade, concatene o valor hex de alpha (00–FF):
 *   backgroundColor: Colors.biluGreen + "15"  // 8% de opacidade
 *   borderColor: Colors.biluGreen + "66"       // 40% de opacidade
 */

export const Colors = {
  // ─── Fundos ─────────────────────────────────────────────────────────────────

  /** Fundo principal das telas — azul noturno quase preto. */
  background: "#020617",

  /** Fundo de superfícies elevadas (modais, drawers). */
  surface: "#0F172A",

  /** Fundo de cards e contêineres internos. */
  card: "#1E293B",

  // ─── Cores de destaque ───────────────────────────────────────────────────────

  /** Verde neon — cor primária do app, usada em CTAs e badges ativos. */
  biluGreen: "#00FF9D",

  /** Azul cósmico — cor secundária, usada em seções do universo. */
  cosmicBlue: "#38BDF8",

  /** Roxo nebulosa — cor terciária, usada em detalhes e gradientes. */
  nebulaPurple: "#A855F7",

  // ─── Texto ───────────────────────────────────────────────────────────────────

  /** Texto principal — quase branco para alto contraste. */
  text: "#F8FAFC",

  /** Texto secundário — cinza médio para metadados e subtítulos. */
  textSecondary: "#94A3B8",
};
