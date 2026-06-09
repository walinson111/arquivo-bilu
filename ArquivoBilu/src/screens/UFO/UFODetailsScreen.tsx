import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { Fonts } from "../../theme/fonts";
import { TYPE_INFO, type UFOCase } from "./ufoData";
import { searchNasaImages, type NasaImage } from "./nasaImageApi";

const { width: SCREEN_W } = Dimensions.get("window");
const IMG_SIZE = (SCREEN_W - 48) / 3 - 6;

// ─── Thumbnail da galeria ─────────────────────────────────────────────────────

function GalleryThumb({
  image,
  accent,
  onPress,
}: {
  image: NasaImage;
  accent: string;
  onPress: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.thumb, { borderColor: accent + "30", opacity: pressed ? 0.75 : 1 }]}
    >
      {!loaded && (
        <View style={styles.thumbPlaceholder}>
          <ActivityIndicator size="small" color={accent} />
        </View>
      )}
      <Image
        source={{ uri: image.thumb }}
        style={[styles.thumbImg, !loaded && { position: "absolute", opacity: 0 }]}
        onLoad={() => setLoaded(true)}
        resizeMode="cover"
      />
    </Pressable>
  );
}

// ─── Modal de imagem ampliada ─────────────────────────────────────────────────

function ImageModal({
  image,
  visible,
  accent,
  onClose,
}: {
  image: NasaImage | null;
  visible: boolean;
  accent: string;
  onClose: () => void;
}) {
  if (!image) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <View style={styles.modalCard}>
          {/* Fechar */}
          <TouchableOpacity onPress={onClose} style={styles.modalClose} activeOpacity={0.8}>
            <Ionicons name="close" size={20} color={Colors.text} />
          </TouchableOpacity>

          {/* Imagem */}
          <Image
            source={{ uri: image.thumb }}
            style={styles.modalImg}
            resizeMode="contain"
          />

          {/* Info */}
          <View style={styles.modalInfo}>
            <Text style={[styles.modalTitle, { color: accent }]} numberOfLines={2}>
              {image.title}
            </Text>
            {image.date_created ? (
              <Text style={styles.modalDate}>
                {new Date(image.date_created).getFullYear()} · NASA Image Library
              </Text>
            ) : null}
            {image.description ? (
              <Text style={styles.modalDesc} numberOfLines={4}>
                {image.description}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Seção de galeria ─────────────────────────────────────────────────────────

function NasaGallery({ query, accent }: { query: string; accent: string }) {
  const [images,  setImages]  = useState<NasaImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NasaImage | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    searchNasaImages(query, 6).then(imgs => {
      setImages(imgs);
      setLoading(false);
    });
  }, [query]);

  function openImage(img: NasaImage) {
    setSelected(img);
    setModalVisible(true);
  }

  if (loading) {
    return (
      <View style={styles.galleryLoading}>
        <ActivityIndicator color={accent} />
        <Text style={[styles.galleryLoadingText, { color: accent }]}>
          Buscando imagens NASA...
        </Text>
      </View>
    );
  }

  if (images.length === 0) {
    return (
      <View style={styles.galleryEmpty}>
        <Text style={styles.galleryEmptyText}>Nenhuma imagem encontrada</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.gallery}>
        {images.map(img => (
          <GalleryThumb
            key={img.nasa_id}
            image={img}
            accent={accent}
            onPress={() => openImage(img)}
          />
        ))}
      </View>
      <Text style={styles.galleryCredit}>📷 NASA Image & Video Library</Text>

      <ImageModal
        image={selected}
        visible={modalVisible}
        accent={accent}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function UFODetailsScreen({ route }: any) {
  const { ufoCase }: { ufoCase: UFOCase } = route.params;
  const navigation = useNavigation();
  const insets     = useSafeAreaInsets();
  const typeInfo   = TYPE_INFO[ufoCase.type];

  // Animação de entrada do hero
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ─ Header ─ */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>ARQUIVO</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* ─ Hero ─ */}
        <Animated.View style={[styles.hero, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <View style={[styles.heroIcon, { borderColor: typeInfo.accent + "40", backgroundColor: typeInfo.accent + "12" }]}>
            <Text style={styles.heroEmoji}>{typeInfo.emoji}</Text>
          </View>
          <View style={[styles.heroBadge, { borderColor: typeInfo.accent + "50", backgroundColor: typeInfo.accent + "15" }]}>
            <Text style={[styles.heroBadgeText, { color: typeInfo.accent }]}>
              {typeInfo.label.toUpperCase()}
            </Text>
          </View>
          <Text style={styles.heroTitle}>{ufoCase.title}</Text>
          <Text style={styles.heroMeta}>
            {ufoCase.location}{ufoCase.year > 0 ? ` · ${ufoCase.year}` : ""}
          </Text>
          {ufoCase.witnesses != null && (
            <View style={styles.witnessRow}>
              <Text style={styles.witnessEmoji}>👁</Text>
              <Text style={styles.witnessText}>
                {ufoCase.witnesses >= 1000
                  ? `+${(ufoCase.witnesses / 1000).toFixed(0)}.000`
                  : ufoCase.witnesses}{" "}testemunhas
              </Text>
            </View>
          )}
        </Animated.View>

        {/* ─ O que aconteceu ─ */}
        <Text style={[styles.sectionTitle, { color: typeInfo.accent }]}>O QUE ACONTECEU</Text>
        <View style={[styles.descCard, { borderColor: typeInfo.accent + "20", borderLeftColor: typeInfo.accent }]}>
          <Text style={styles.descText}>{ufoCase.fullDescription}</Text>
        </View>

        {/* ─ Galeria NASA ─ */}
        {ufoCase.nasaQuery !== "" && (
          <>
            <Text style={[styles.sectionTitle, { color: typeInfo.accent }]}>IMAGENS RELACIONADAS</Text>
            <NasaGallery query={ufoCase.nasaQuery} accent={typeInfo.accent} />
          </>
        )}

        {/* ─ Evidências ─ */}
        {ufoCase.evidence.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: typeInfo.accent }]}>EVIDÊNCIAS</Text>
            <View style={[styles.evidenceCard, { borderColor: typeInfo.accent + "20" }]}>
              {ufoCase.evidence.map((ev, i) => (
                <View
                  key={i}
                  style={[
                    styles.evidenceRow,
                    i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" },
                  ]}
                >
                  <View style={[styles.evidenceDot, { backgroundColor: typeInfo.accent }]} />
                  <Text style={styles.evidenceText}>{ev}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {/* ─ Rodapé ─ */}
        <View style={styles.footer}>
          <Text style={styles.footerEmoji}>👽</Text>
          <Text style={styles.footerText}>Arquivo Bilu · Dados não oficiais</Text>
        </View>

      </ScrollView>
    </View>
  );
}

// ─── Estilos ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 20, paddingBottom: 48 },

  // Header
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center", justifyContent: "center",
  },
  headerLabel: { fontFamily: Fonts.orbitron, fontSize: 10, color: Colors.textSecondary, letterSpacing: 2 },

  // Hero
  hero: { alignItems: "center", paddingVertical: 28, gap: 10 },
  heroIcon: {
    width: 100, height: 100, borderRadius: 28,
    borderWidth: 1.5,
    alignItems: "center", justifyContent: "center",
    marginBottom: 4,
  },
  heroEmoji: { fontSize: 48 },
  heroBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 100, borderWidth: 1 },
  heroBadgeText: { fontFamily: Fonts.orbitron, fontSize: 9, letterSpacing: 2 },
  heroTitle: { fontFamily: Fonts.orbitron, fontSize: 22, color: Colors.text, letterSpacing: 0.5, textAlign: "center" },
  heroMeta:  { fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.textSecondary, textAlign: "center" },
  witnessRow: {
    flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, borderWidth: 1, borderColor: "rgba(255,255,255,0.08)",
  },
  witnessEmoji: { fontSize: 14 },
  witnessText:  { fontFamily: Fonts.spaceGroteskMedium, fontSize: 13, color: Colors.text },

  // Seção
  sectionTitle: { fontFamily: Fonts.orbitron, fontSize: 9, letterSpacing: 2.5, marginBottom: 10, marginTop: 20 },

  // Descrição
  descCard: {
    backgroundColor: "rgba(15,23,42,0.9)",
    borderRadius: 14, borderWidth: 1, borderLeftWidth: 3, padding: 16,
  },
  descText: { fontFamily: Fonts.spaceGrotesk, fontSize: 14, color: Colors.text, lineHeight: 24 },

  // Galeria
  gallery: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  thumb: {
    width: IMG_SIZE,
    height: IMG_SIZE,
    borderRadius: 10,
    borderWidth: 1,
    overflow: "hidden",
    backgroundColor: "rgba(30,41,59,0.8)",
  },
  thumbPlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30,41,59,0.8)",
  },
  thumbImg: { width: "100%", height: "100%" },
  galleryLoading: { alignItems: "center", paddingVertical: 24, gap: 10 },
  galleryLoadingText: { fontFamily: Fonts.orbitron, fontSize: 9, letterSpacing: 1.5 },
  galleryEmpty:  { paddingVertical: 20 },
  galleryEmptyText: { fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary },
  galleryCredit: {
    fontFamily: Fonts.spaceGrotesk, fontSize: 10,
    color: Colors.textSecondary, opacity: 0.5,
    marginTop: 8, textAlign: "right",
  },

  // Modal
  modalOverlay: {
    flex: 1, backgroundColor: "rgba(0,0,0,0.88)",
    alignItems: "center", justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%", borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  modalClose: {
    position: "absolute", top: 12, right: 12, zIndex: 10,
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center", justifyContent: "center",
  },
  modalImg: { width: "100%", height: 260 },
  modalInfo: { padding: 16, gap: 6 },
  modalTitle: { fontFamily: Fonts.spaceGroteskBold, fontSize: 14, lineHeight: 20 },
  modalDate:  { fontFamily: Fonts.orbitron, fontSize: 9, color: Colors.textSecondary, letterSpacing: 1 },
  modalDesc:  { fontFamily: Fonts.spaceGrotesk, fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },

  // Evidências
  evidenceCard: {
    backgroundColor: "rgba(15,23,42,0.9)",
    borderRadius: 14, borderWidth: 1, overflow: "hidden",
  },
  evidenceRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, padding: 14 },
  evidenceDot: { width: 6, height: 6, borderRadius: 3, marginTop: 6, flexShrink: 0 },
  evidenceText: { flex: 1, fontFamily: Fonts.spaceGrotesk, fontSize: 13, color: Colors.text, lineHeight: 20 },

  // Rodapé
  footer: { alignItems: "center", gap: 6, paddingTop: 32 },
  footerEmoji: { fontSize: 24 },
  footerText: { fontFamily: Fonts.orbitron, fontSize: 8, color: Colors.textSecondary, letterSpacing: 1.5, opacity: 0.5 },
});