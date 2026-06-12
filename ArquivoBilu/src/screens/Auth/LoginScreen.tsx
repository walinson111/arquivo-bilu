import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

type Props = { onGoRegister: () => void };

export function LoginScreen({ onGoRegister }: Props) {
  const insets = useSafeAreaInsets();
  const { login } = useAuth();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleLogin() {
    setError("");
    if (!email.trim() || !password) { setError("Preencha todos os campos."); return; }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.badge}>ARQUIVO BILU</Text>
        <Text style={styles.title}>Bem-vindo de{"\n"}volta 👋</Text>
        <Text style={styles.sub}>Entre para continuar explorando o universo</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>SENHA</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
            />
            <Pressable onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
              <Text style={styles.eyeIcon}>{showPass ? "🙈" : "👁️"}</Text>
            </Pressable>
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
          style={[styles.btn, loading && { opacity: 0.7 }]}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.btnText}>ENTRAR</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={onGoRegister} activeOpacity={0.7}>
          <Text style={styles.footerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 24 },
  header: { paddingTop: 40, paddingBottom: 36, gap: 10 },
  badge:  { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.biluGreen, letterSpacing: 2.5 },
  title:  { fontFamily: Fonts.orbitron, fontSize: 30, color: Colors.text, lineHeight: 40 },
  sub:    { fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },

  form:   { gap: 18 },
  field:  { gap: 8 },
  fieldLabel: { fontFamily: Fonts.orbitron, fontSize: 9, color: Colors.textSecondary, letterSpacing: 2 },
  input:  {
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
  inputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  eyeBtn:   { padding: 10 },
  eyeIcon:  { fontSize: 18 },

  error: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: "#F87171", textAlign: "center" },

  btn: {
    backgroundColor: Colors.biluGreen,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: { fontFamily: Fonts.orbitron, fontSize: 13, color: "#000", letterSpacing: 1.5 },

  footer:     { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: "auto", paddingBottom: 16 },
  footerText: { fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.textSecondary },
  footerLink: { fontFamily: Fonts.spaceGroteskBold, fontSize: 14, color: Colors.biluGreen },
});