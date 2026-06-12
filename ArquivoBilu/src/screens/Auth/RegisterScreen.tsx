import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

type Props = { onGoLogin: () => void };

export function RegisterScreen({ onGoLogin }: Props) {
  const insets = useSafeAreaInsets();
  const { register } = useAuth();

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [showPass, setShowPass] = useState(false);

  async function handleRegister() {
    setError("");
    if (password !== confirm) { setError("As senhas não coincidem."); return; }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  }

  return (
    <KeyboardAvoidingView
      style={[styles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.badge}>ARQUIVO BILU</Text>
          <Text style={styles.title}>Criar conta 🚀</Text>
          <Text style={styles.sub}>Junte-se à missão de explorar o universo</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>NOME</Text>
            <TextInput
              style={styles.input}
              placeholder="Como posso te chamar?"
              placeholderTextColor={Colors.textSecondary}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

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
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPass(v => !v)} style={styles.eyeBtn}>
                <Text style={styles.eyeIcon}>{showPass ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>CONFIRMAR SENHA</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita a senha"
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry={!showPass}
              value={confirm}
              onChangeText={setConfirm}
              onSubmitEditing={handleRegister}
            />
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={loading}
            style={[styles.btn, loading && { opacity: 0.7 }]}
          >
            {loading
              ? <ActivityIndicator color="#000" />
              : <Text style={styles.btnText}>CRIAR CONTA</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={onGoLogin} activeOpacity={0.7}>
            <Text style={styles.footerLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 32 },
  header: { paddingTop: 40, paddingBottom: 36, gap: 10 },
  badge:  { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.biluGreen, letterSpacing: 2.5 },
  title:  { fontFamily: Fonts.orbitron, fontSize: 30, color: Colors.text },
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

  footer:     { flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 32 },
  footerText: { fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.textSecondary },
  footerLink: { fontFamily: Fonts.spaceGroteskBold, fontSize: 14, color: Colors.biluGreen },
});