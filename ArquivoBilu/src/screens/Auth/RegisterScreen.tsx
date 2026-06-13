import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Colors } from "../../theme/colors";
import { formStyles } from "../../theme/styles";
import { authStyles } from "./AuthScreen.styles";
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
      style={[authStyles.rootScroll, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={authStyles.scroll}>
        {/* Header */}
        <View style={authStyles.header}>
          <Text style={authStyles.badge}>ARQUIVO BILU</Text>
          <Text style={authStyles.title}>Criar conta 🚀</Text>
          <Text style={authStyles.sub}>Junte-se à missão de explorar o universo</Text>
        </View>

        {/* Form */}
        <View style={formStyles.form}>
          <View style={formStyles.field}>
            <Text style={formStyles.fieldLabel}>NOME</Text>
            <TextInput
              style={formStyles.input}
              placeholder="Como posso te chamar?"
              placeholderTextColor={Colors.textSecondary}
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

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
                placeholder="Mínimo 6 caracteres"
                placeholderTextColor={Colors.textSecondary}
                secureTextEntry={!showPass}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPass(v => !v)} style={formStyles.eyeBtn}>
                <Text style={formStyles.eyeIcon}>{showPass ? "🙈" : "👁️"}</Text>
              </Pressable>
            </View>
          </View>

          <View style={formStyles.field}>
            <Text style={formStyles.fieldLabel}>CONFIRMAR SENHA</Text>
            <TextInput
              style={formStyles.input}
              placeholder="Repita a senha"
              placeholderTextColor={Colors.textSecondary}
              secureTextEntry={!showPass}
              value={confirm}
              onChangeText={setConfirm}
              onSubmitEditing={handleRegister}
            />
          </View>

          {error ? <Text style={formStyles.error}>{error}</Text> : null}

          <TouchableOpacity
            onPress={handleRegister}
            activeOpacity={0.85}
            disabled={loading}
            style={[formStyles.btn, loading && { opacity: 0.7 }]}
          >
            {loading
              ? <ActivityIndicator color="#000" />
              : <Text style={formStyles.btnText}>CRIAR CONTA</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={formStyles.footer}>
          <Text style={formStyles.footerText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={onGoLogin} activeOpacity={0.7}>
            <Text style={formStyles.footerLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

