/**
 * @file forms.ts
 * @description Estilos compartilhados para formulários de autenticação.
 *
 * Usados em `LoginScreen` e `RegisterScreen`.
 * Inclui campos de input, botão de submit e rodapé de navegação.
 *
 * @usage
 *   import { formStyles } from "@/theme/styles/forms";
 *   <TextInput style={formStyles.input} />
 */

import { StyleSheet } from "react-native";
import { Colors } from "../colors";
import { Fonts } from "../fonts";

export const formStyles = StyleSheet.create({
  // ─── Estrutura do formulário ─────────────────────────────────────────────────

  /** Stack vertical de campos com espaçamento interno. */
  form: {
    gap: 18,
  },

  /** Wrapper de um único campo (label + input). */
  field: {
    gap: 8,
  },

  /** Label acima do input, em Orbitron pequeno. */
  fieldLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },

  // ─── Input de texto ──────────────────────────────────────────────────────────

  /** Campo de entrada de texto com fundo escuro e borda sutil. */
  input: {
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

  /** Row para inputs com ícone de ação (ex: mostrar/ocultar senha). */
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  /** Botão de ícone ao lado do input (ex: olho de senha). */
  eyeBtn: {
    padding: 10,
  },

  /** Emoji/ícone dentro do eyeBtn. */
  eyeIcon: {
    fontSize: 18,
  },

  // ─── Feedback de erro inline ─────────────────────────────────────────────────

  /** Mensagem de erro exibida abaixo do formulário. */
  error: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: "#F87171",
    textAlign: "center",
  },

  // ─── Botão de submit ─────────────────────────────────────────────────────────

  /** Botão principal de ação (Login / Criar conta). */
  btn: {
    backgroundColor: Colors.biluGreen,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  /** Texto do botão principal, em Orbitron preto. */
  btnText: {
    fontFamily: Fonts.orbitron,
    fontSize: 13,
    color: "#000",
    letterSpacing: 1.5,
  },

  // ─── Rodapé de navegação ─────────────────────────────────────────────────────

  /** Row do rodapé com link para a outra tela de auth. */
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: "auto",
    paddingBottom: 16,
  },

  /** Texto descritivo no rodapé (ex: "Já tem conta?"). */
  footerText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.textSecondary,
  },

  /** Link clicável no rodapé (ex: "Entrar"). */
  footerLink: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 14,
    color: Colors.biluGreen,
  },
});
