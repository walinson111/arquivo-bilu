import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Modal,
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
import { profileStyles as styles } from "./ProfileScreen.styles";

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

