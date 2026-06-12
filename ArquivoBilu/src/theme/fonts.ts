/**
 * @file fonts.ts
 * @description Mapa de fontes tipográficas do Arquivo Bilu.
 *
 * As fontes são carregadas via `expo-font` no `App.tsx`.
 * Use sempre estas constantes em vez de strings literais nos StyleSheets
 * para evitar erros de digitação e facilitar refatorações.
 *
 * Guia de uso:
 * - `orbitron` / `orbitronBlack` → títulos, labels de seção, badges, nomes de telas
 * - `spaceGrotesk` → corpo de texto, descrições, parágrafos longos
 * - `spaceGroteskMedium` → subtítulos, links, textos de ênfase moderada
 * - `spaceGroteskBold` → nomes em listas, destaques dentro de parágrafos
 *
 * @example
 *   import { Fonts } from "@/theme/fonts";
 *   fontFamily: Fonts.orbitron
 */

export const Fonts = {
  // ─── Orbitron ────────────────────────────────────────────────────────────────

  /** Orbitron 700 — títulos secundários, labels, badges. */
  orbitron: "Orbitron_700Bold",

  /** Orbitron 900 — títulos principais e nomes de destaque. */
  orbitronBlack: "Orbitron_900Black",

  // ─── Space Grotesk ───────────────────────────────────────────────────────────

  /** Space Grotesk 400 — corpo de texto padrão. */
  spaceGrotesk: "SpaceGrotesk_400Regular",

  /** Space Grotesk 500 — subtítulos e links. */
  spaceGroteskMedium: "SpaceGrotesk_500Medium",

  /** Space Grotesk 700 — nomes em listas e destaques. */
  spaceGroteskBold: "SpaceGrotesk_700Bold",
} as const;
