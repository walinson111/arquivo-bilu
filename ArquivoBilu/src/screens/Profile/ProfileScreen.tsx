import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";

// ─── Dados estáticos do app ───────────────────────────────────────────────────

const APP_VERSION = "1.0.0";

const STATS = [
  { label: "Planetas", value: "8",    emoji: "🪐" },
  { label: "Luas",     value: "293+", emoji: "🌕" },
  { label: "Estrelas", value: "∞",    emoji: "⭐" },
];

const INFO_ROWS = [
  { icon: "rocket-outline"  as const, label: "Versão do app",      value: APP_VERSION },
  { icon: "globe-outline"   as const, label: "Fonte de dados",     value: "le-systeme-solaire.net" },
  { icon: "planet-outline"  as const, label: "Visualização 3D",    value: "Three Fiber" },
  { icon: "star-outline"    as const, label: "Desenvolvido por",   value: "Arquivo Bilu" },
];

const LINKS = [
  { icon: "document-text-outline" as const, label: "Sobre o projeto",    accent: Colors.biluGreen },
  { icon: "bug-outline"           as const, label: "Reportar problema",  accent: Colors.cosmicBlue },
  { icon: "heart-outline"         as const, label: "Avaliar o app",      accent: "#EC4899" },
];

// ─── Componente de stat ───────────────────────────────────────────────────────

function StatBubble({ emoji, value, label }: { emoji: string; value: string; label: string }) {
  return (
    <View style={styles.statBubble}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Tela ─────────────────────────────────────────────────────────────────────

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ─ Header ─ */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>ARQUIVO BILU</Text>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* ─ Hero / Avatar ─ */}
        <View style={styles.heroSection}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🛸</Text>
            </View>
          </View>
          <Text style={styles.appName}>Arquivo Bilu</Text>
          <Text style={styles.appTagline}>Explorando o universo, um planeta de cada vez</Text>
        </View>

        {/* ─ Stats ─ */}
        <View style={styles.statsRow}>
          {STATS.map((s) => (
            <StatBubble key={s.label} emoji={s.emoji} value={s.value} label={s.label} />
          ))}
        </View>

        {/* ─ Sobre o App ─ */}
        <Text style={styles.sectionTitle}>SOBRE O APP</Text>
        <View style={styles.infoCard}>
          {INFO_ROWS.map((row, i) => (
            <View
              key={row.label}
              style={[
                styles.infoRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
              ]}
            >
              <View style={styles.infoLeft}>
                <Ionicons name={row.icon} size={16} color={Colors.textSecondary} />
                <Text style={styles.infoLabel}>{row.label}</Text>
              </View>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        {/* ─ Links ─ */}
        <Text style={styles.sectionTitle}>MAIS</Text>
        <View style={styles.linksCard}>
          {LINKS.map((link, i) => (
            <TouchableOpacity
              key={link.label}
              activeOpacity={0.7}
              style={[
                styles.linkRow,
                i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
              ]}
            >
              <View style={[styles.linkIconWrap, { backgroundColor: link.accent + "18", borderColor: link.accent + "30" }]}>
                <Ionicons name={link.icon} size={16} color={link.accent} />
              </View>
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ─ Rodapé ─ */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Feito com 🚀 e muito café</Text>
          <Text style={styles.footerVersion}>v{APP_VERSION}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 48,
  },

  // Header
  header: {
    paddingTop: 20,
    paddingBottom: 8,
  },
  headerLabel: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 6,
  },
  headerTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 28,
    color: Colors.text,
    letterSpacing: 1,
  },

  // Hero
  heroSection: {
    alignItems: "center",
    paddingVertical: 32,
    gap: 10,
  },
  avatarWrap: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  avatarGlow: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.biluGreen,
    opacity: 0.12,
    transform: [{ scale: 1.6 }],
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(30, 41, 59, 0.8)",
    borderWidth: 1.5,
    borderColor: Colors.biluGreen + "44",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarEmoji: {
    fontSize: 42,
  },
  appName: {
    fontFamily: Fonts.orbitron,
    fontSize: 20,
    color: Colors.text,
    letterSpacing: 1,
  },
  appTagline: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },

  // Stats
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 28,
  },
  statBubble: {
    flex: 1,
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    gap: 4,
  },
  statEmoji: {
    fontSize: 22,
  },
  statValue: {
    fontFamily: Fonts.orbitron,
    fontSize: 16,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  statLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 10,
    color: Colors.textSecondary,
    letterSpacing: 0.3,
  },

  // Seção
  sectionTitle: {
    fontFamily: Fonts.orbitron,
    fontSize: 10,
    color: Colors.biluGreen,
    letterSpacing: 2.5,
    marginBottom: 12,
    marginTop: 4,
  },

  // Info card
  infoCard: {
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 28,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoLabel: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontFamily: Fonts.spaceGroteskBold,
    fontSize: 13,
    color: Colors.text,
  },

  // Links
  linksCard: {
    backgroundColor: "rgba(30, 41, 59, 0.55)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    marginBottom: 36,
    overflow: "hidden",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  linkIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linkLabel: {
    flex: 1,
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 14,
    color: Colors.text,
  },

  // Rodapé
  footer: {
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    fontFamily: Fonts.spaceGrotesk,
    fontSize: 12,
    color: Colors.textSecondary,
  },
  footerVersion: {
    fontFamily: Fonts.orbitron,
    fontSize: 9,
    color: Colors.textSecondary,
    letterSpacing: 1.5,
    opacity: 0.5,
  },
});