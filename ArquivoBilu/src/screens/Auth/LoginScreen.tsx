import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../theme/colors";
import { formStyles, layoutStyles } from "../../theme/styles";
import { authStyles } from "./AuthScreen.styles";
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
      style={[authStyles.root, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={authStyles.header}>
        <Text style={authStyles.badge}>ARQUIVO BILU</Text>
        <Text style={authStyles.title}>Bem-vindo de{"\n"}volta 👋</Text>
        <Text style={authStyles.sub}>Entre para continuar explorando o universo</Text>
      </View>

      {/* Form */}
      <View style={formStyles.form}>
        <View style={formStyles.field}>
          <Text style={formStyles.fieldLabel}>E-MAIL</Text>
          <TextInput
            style={formStyles.input}
            placeholder="seu@email.com"
            placeholderTextColor={Colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={formStyles.field}>
          <Text style={formStyles.fieldLabel}>SENHA</Text>
          <View style={formStyles.inputRow}>
            <TextInput
              style={[formStyles.input, { flex: 1 }]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={handleLogin}
            />
            <Pressable onPress={() => setShowPass(v => !v)} style={formStyles.eyeBtn}>
              <Text style={formStyles.eyeIcon}>{showPass ? "Ocultar" : "Mostrar"}</Text>
            </Pressable>
          </View>
        </View>

        {error ? <Text style={formStyles.error}>{error}</Text> : null}

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.85}
          disabled={loading}
          style={[formStyles.btn, loading && { opacity: 0.7 }]}
        >
          {loading
            ? <ActivityIndicator color="#000" />
            : <Text style={formStyles.btnText}>ENTRAR</Text>
          }
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={formStyles.footer}>
        <Text style={formStyles.footerText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={onGoRegister} activeOpacity={0.7}>
          <Text style={formStyles.footerLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

