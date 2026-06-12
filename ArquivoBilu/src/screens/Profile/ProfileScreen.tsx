import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
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

const APP_VERSION = "1.0.0";

const STATS = [
  { label: "Planetas", value: "8",    emoji: "🪐" },
  { label: "Luas",     value: "293+", emoji: "🌕" },
  { label: "Estrelas", value: "∞",    emoji: "⭐" },
];

const INFO_ROWS = [
  { icon: "rocket-outline"  as const, label: "Versão do app",    value: APP_VERSION },
  { icon: "globe-outline"   as const, label: "Fonte de dados",   value: "le-systeme-solaire.net" },
  { icon: "planet-outline"  as const, label: "Visualização 3D",  value: "Three Fiber" },
  { icon: "star-outline"    as const, label: "Desenvolvido por", value: "Arquivo Bilu" },
];

const AVATARS = ["🛸", "🚀", "🌍", "🪐", "⭐", "☄️", "🌙", "🔭", "👽", "🌌"];

function StatBubble({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <View style={styles.statBubble}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { state, logout, updateUser } = useAuth();
  const user = state.status === "authenticated" ? state.user : null;

  const [editModal,  setEditModal]  = useState(false);
  const [avatarModal, setAvatarModal] = useState(false);
  const [editName,   setEditName]   = useState(user?.name ?? "");
  const [saving,     setSaving]     = useState(false);

  async function handleSaveName() {
    if (!editName.trim()) return;
    setSaving(true);
    await updateUser({ name: editName.trim() });
    setSaving(false);
    setEditModal(false);
  }

  async function handlePickAvatar(emoji: string) {
    await updateUser({ avatarEmoji: emoji });
    setAvatarModal(false);
  }

  function handleLogout() {
    Alert.alert(
      "Sair da conta",
      "Tem certeza que deseja sair?",
      [
        { text: "Cancelar", style: "cancel", onPress: () => {} },
        { text: "Sair", style: "destructive", onPress: () => logout() },
      ],
      { cancelable: true }
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>ARQUIVO BILU</Text>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Hero / Avatar */}
        <View style={styles.heroSection}>
          <Pressable onPress={() => setAvatarModal(true)} style={styles.avatarWrap}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>{user?.avatarEmoji ?? "🛸"}</Text>
            </View>
            <View style={styles.avatarEditBadge}>
              <Text style={{ fontSize: 10 }}>✏️</Text>
            </View>
          </Pressable>

          <View style={styles.nameRow}>
            <Text style={styles.userName}>{user?.name ?? "Explorador"}</Text>
            <TouchableOpacity onPress={() => { setEditName(user?.name ?? ""); setEditModal(true); }} style={styles.editBtn}>
              <Ionicons name="pencil-outline" size={14} color={Colors.biluGreen} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userEmail}>{user?.email ?? ""}</Text>
          <Text style={styles.appTagline}>Explorando o universo, um planeta de cada vez</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {STATS.map((s) => <StatBubble key={s.label} {...s} />)}
        </View>

        {/* Sobre o App */}
        <Text style={styles.sectionTitle}>SOBRE O APP</Text>
        <View style={styles.infoCard}>
          {INFO_ROWS.map((row, i) => (
            <View key={row.label} style={[styles.infoRow, i > 0 && styles.rowBorder]}>
              <View style={styles.infoLeft}>
                <Ionicons name={row.icon} size={16} color={Colors.textSecondary} />
                <Text style={styles.infoLabel}>{row.label}</Text>
              </View>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* Conta */}
        <Text style={styles.sectionTitle}>CONTA</Text>
        <View style={styles.infoCard}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [styles.infoRow, pressed && { opacity: 0.6 }]}
          >
            <View style={styles.infoLeft}>
              <Ionicons name="log-out-outline" size={16} color="#F87171" />
              <Text style={[styles.infoLabel, { color: "#F87171" }]}>Sair da conta</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color="#F87171" />
          </Pressable>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Feito com 🚀 e muito café</Text>
          <Text style={styles.footerVersion}>v{APP_VERSION}</Text>
        </View>
      </ScrollView>

      {/* Modal editar nome */}
      <Modal visible={editModal} transparent animationType="fade" onRequestClose={() => setEditModal(false)}>
        <Pressable style={styles.overlay} onPress={() => setEditModal(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Editar nome</Text>
          <TextInput
            style={styles.sheetInput}
            value={editName}
            onChangeText={setEditName}
            autoFocus
            placeholder="Seu nome"
            placeholderTextColor={Colors.textSecondary}
          />
          <TouchableOpacity
            onPress={handleSaveName}
            disabled={saving}
            style={[styles.sheetBtn, saving && { opacity: 0.7 }]}
            activeOpacity={0.85}
          >
            <Text style={styles.sheetBtnText}>{saving ? "Salvando…" : "SALVAR"}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal escolher avatar */}
      <Modal visible={avatarModal} transparent animationType="fade" onRequestClose={() => setAvatarModal(false)}>
        <Pressable style={styles.overlay} onPress={() => setAvatarModal(false)} />
        <View style={styles.sheet}>
          <Text style={styles.sheetTitle}>Escolher avatar</Text>
          <View style={styles.emojiGrid}>
            {AVATARS.map(emoji => (
              <TouchableOpacity key={emoji} onPress={() => handlePickAvatar(emoji)} style={[styles.emojiOption, user?.avatarEmoji === emoji && styles.emojiSelected]} activeOpacity={0.7}>
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },
  rowBorder: { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },

  header:      { paddingTop: 20, paddingBottom: 8 },
  headerLabel: { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.biluGreen, letterSpacing: 2.5, marginBottom: 6 },
  headerTitle: { fontFamily: Fonts.orbitron, fontSize: 28, color: Colors.text, letterSpacing: 1 },

  heroSection: { alignItems: "center", paddingVertical: 28, gap: 8 },
  avatarWrap:  { position: "relative", alignItems: "center", justifyContent: "center", marginBottom: 4 },
  avatarGlow:  { position: "absolute", width: 100, height: 100, borderRadius: 50, backgroundColor: Colors.biluGreen, opacity: 0.12, transform: [{ scale: 1.6 }] },
  avatar:      { width: 88, height: 88, borderRadius: 44, backgroundColor: "rgba(30,41,59,0.8)", borderWidth: 1.5, borderColor: Colors.biluGreen + "44", alignItems: "center", justifyContent: "center" },
  avatarEmoji: { fontSize: 42 },
  avatarEditBadge: { position: "absolute", bottom: 0, right: 0, backgroundColor: Colors.background, borderRadius: 12, borderWidth: 1, borderColor: Colors.biluGreen + "55", padding: 4 },

  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  userName:  { fontFamily: Fonts.orbitron, fontSize: 20, color: Colors.text, letterSpacing: 0.5 },
  editBtn:   { padding: 4 },
  userEmail: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary },
  appTagline:{ fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary, textAlign: "center", maxWidth: 260, lineHeight: 20 },

  statsRow:   { flexDirection: "row", gap: 10, marginBottom: 28 },
  statBubble: { flex: 1, backgroundColor: "rgba(30,41,59,0.55)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", borderRadius: 16, alignItems: "center", paddingVertical: 16, gap: 4 },
  statEmoji:  { fontSize: 22 },
  statValue:  { fontFamily: Fonts.orbitron, fontSize: 16, color: Colors.text, letterSpacing: 0.5 },
  statLabel:  { fontFamily: Fonts.spaceGrotesk, fontSize: 10, color: Colors.textSecondary, letterSpacing: 0.3 },

  sectionTitle: { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.biluGreen, letterSpacing: 2.5, marginBottom: 12, marginTop: 4 },

  infoCard:  { backgroundColor: "rgba(30,41,59,0.55)", borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", marginBottom: 28, overflow: "hidden" },
  infoRow:   { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 13, paddingHorizontal: 16 },
  infoLeft:  { flexDirection: "row", alignItems: "center", gap: 10 },
  infoLabel: { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary },
  infoValue: { fontFamily: Fonts.spaceGroteskBold, fontSize: 13, color: Colors.text },

  footer:        { alignItems: "center", gap: 4 },
  footerText:    { fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary },
  footerVersion: { fontFamily: Fonts.orbitron, fontSize: 9, color: Colors.textSecondary, letterSpacing: 1.5, opacity: 0.5 },

  // Modais
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.6)" },
  sheet:   { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "rgba(10,18,35,0.98)", borderTopLeftRadius: 24, borderTopRightRadius: 24, borderWidth: 1, borderBottomWidth: 0, borderColor: "rgba(255,255,255,0.1)", padding: 24, gap: 16 },
  sheetTitle: { fontFamily: Fonts.orbitron, fontSize: 14, color: Colors.text, letterSpacing: 1, textAlign: "center" },
  sheetInput: { backgroundColor: "rgba(30,41,59,0.7)", borderWidth: 1, borderColor: "rgba(255,255,255,0.10)", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontFamily: Fonts.spaceGrotesk, fontSize: 15, color: Colors.text },
  sheetBtn:   { backgroundColor: Colors.biluGreen, borderRadius: 14, paddingVertical: 14, alignItems: "center" },
  sheetBtnText: { fontFamily: Fonts.orbitron, fontSize: 12, color: "#000", letterSpacing: 1.5 },

  emojiGrid:    { flexDirection: "row", flexWrap: "wrap", gap: 12, justifyContent: "center" },
  emojiOption:  { width: 52, height: 52, borderRadius: 14, backgroundColor: "rgba(30,41,59,0.7)", borderWidth: 1, borderColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center" },
  emojiSelected:{ borderColor: Colors.biluGreen, backgroundColor: Colors.biluGreen + "22" },
  emojiText:    { fontSize: 26 },
});