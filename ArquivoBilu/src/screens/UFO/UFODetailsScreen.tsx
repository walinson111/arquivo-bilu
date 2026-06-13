import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
import { ufoDetailsStyles as styles } from "./UFODetailsScreen.styles";
import { Fonts } from "../../theme/fonts";
import { TYPE_INFO, type UFOCase } from "./ufoData";
import { getUFOImages, type LocalImage } from "./ufoImages";


// ─── Thumbnail da galeria ─────────────────────────────────────────────────────

function GalleryThumb({
  image,
  accent,
  onPress,
}: {
  image: LocalImage;
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
        source={image.source}
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
  image: LocalImage | null;
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
            source={image.source}
            style={styles.modalImg}
            resizeMode="contain"
          />

          {/* Info */}
          <View style={styles.modalInfo}>
            <Text style={[styles.modalTitle, { color: accent }]} numberOfLines={2}>
              {image.caption}
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// ─── Seção de galeria ─────────────────────────────────────────────────────────

function LocalGallery({ caseId, accent }: { caseId: string; accent: string }) {
  const images = getUFOImages(caseId);
  const [selected, setSelected] = useState<LocalImage | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  function openImage(img: LocalImage) {
    setSelected(img);
    setModalVisible(true);
  }

  if (images.length === 0) {
    return (
      <View style={styles.galleryEmpty}>
        <Text style={styles.galleryEmptyText}>Nenhuma imagem disponível</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.gallery}>
        {images.map((img, i) => (
          <GalleryThumb
            key={i}
            image={img}
            accent={accent}
            onPress={() => openImage(img)}
          />
        ))}
      </View>
      <Text style={styles.galleryCredit}>📷 Arquivo de Documentação</Text>

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

        {/* ─ Galeria de Imagens ─ */}
        {!ufoCase.restricted && (
          <>
            <Text style={[styles.sectionTitle, { color: typeInfo.accent }]}>IMAGENS RELACIONADAS</Text>
            <LocalGallery caseId={ufoCase.id} accent={typeInfo.accent} />
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

