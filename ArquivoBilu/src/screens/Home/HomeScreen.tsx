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
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { navigate } from "../../navigation/navigationRef";
import { getAstronomyPicture } from "../../services/nasaApi";
import { Colors } from "../../theme/colors";
import { feedbackStyles, cardStyles, layoutStyles } from "../../theme/styles";
import type { Apod } from "../../types/apod";
import { FEATURED_HOME as FEATURED, TRENDING_HOME as TRENDING } from "../../constants/homeData";
import { getBodyImage } from "../../constants/bodyImages";
import { homeStyles as styles } from "./HomeScreen.styles";

const { width: SCREEN_W } = Dimensions.get("window");

// ─── Campo de estrelas ────────────────────────────────────────────────────────

function BlinkingStar({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  const opacity = useRef(new Animated.Value(0.15)).current;
  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.9, duration: 1500 + delay * 300, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.15, duration: 1500 + delay * 300, useNativeDriver: true }),
      ])
    );
    const t = setTimeout(() => anim.start(), delay * 200);
    return () => { clearTimeout(t); anim.stop(); };
  }, []);
  return <Animated.View style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: size / 2, backgroundColor: "#FFF", opacity }} />;
}

function StarField() {
  const stars = useRef(Array.from({ length: 55 }, (_, i) => ({ id: i, x: Math.random() * SCREEN_W, y: Math.random() * 700, size: Math.random() * 1.8 + 0.4, delay: Math.random() * 5 }))).current;
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {stars.map(s => <BlinkingStar key={s.id} x={s.x} y={s.y} size={s.size} delay={s.delay} />)}
    </View>
  );
}

// ─── Modal de zoom da imagem APOD ────────────────────────────────────────────

function ApodImageModal({
  visible,
  uri,
  title,
  onClose,
}: {
  visible: boolean;
  uri: string;
  title: string;
  onClose: () => void;
}) {
  const scaleAnim  = useRef(new Animated.Value(0.92)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim,   { toValue: 1,    useNativeDriver: true, tension: 80, friction: 8 }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.92);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
      {/* Overlay — fechar ao tocar fora */}
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Animated.View style={[styles.modalCard, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
          {/* Impede que toque na imagem feche o modal */}
          <Pressable>
            {/* Botão fechar */}
            <TouchableOpacity onPress={onClose} style={styles.modalCloseBtn} activeOpacity={0.8}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            {/* Imagem em tamanho cheio */}
            <Image
              source={{ uri }}
              style={styles.modalImage}
              resizeMode="contain"
            />

            {/* Título e crédito */}
            <View style={styles.modalInfo}>
              <Text style={styles.modalTitle} numberOfLines={2}>{title}</Text>
              <Text style={styles.modalCredit}>NASA · Foto Astronômica do Dia</Text>
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

function FeaturedCard({ item, onPress }: { item: typeof FEATURED[0]; onPress: () => void }) {
  const bodyImage = getBodyImage(item.id);
  const imageSource = bodyImage ?? { uri: item.image };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.featuredCard, { borderColor: item.accent + "33", opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.featuredImgWrap}>
        <Image source={imageSource} style={styles.featuredImg} resizeMode="cover" />
        <LinearGradient colors={["transparent", "rgba(2,6,23,0.92)"]} style={StyleSheet.absoluteFillObject} locations={[0.35, 1]} />
        <View style={[styles.featuredBadge, { backgroundColor: item.accent + "22", borderColor: item.accent + "55" }]}>
          <Text style={[styles.featuredBadgeText, { color: item.accent }]}>{item.badge}</Text>
        </View>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={[styles.featuredLabel, { color: item.accent }]}>{item.label}</Text>
        <Text style={styles.featuredName}>{item.name}</Text>
        <Text style={styles.featuredSub}>{item.subtitle}</Text>
      </View>
    </Pressable>
  );
}

function TrendingRow({ item, onPress, isLast }: { item: typeof TRENDING[0]; onPress: () => void; isLast: boolean }) {
  const bodyImage = getBodyImage(item.id);
  return (
    <>
      <Pressable onPress={onPress} style={({ pressed }) => [styles.trendRow, { opacity: pressed ? 0.75 : 1 }]}>
        <View style={[styles.trendIcon, { backgroundColor: item.accent + "18", borderColor: item.accent + "30", overflow: "hidden" }]}>
          {bodyImage ? (
            <Image source={bodyImage} style={styles.trendImage} />
          ) : (
            <Text style={styles.trendEmoji}>{item.emoji}</Text>
          )}
        </View>
        <View style={styles.trendText}>
          <Text style={styles.trendName}>{item.name}</Text>
          <Text style={styles.trendType}>{item.type}</Text>
        </View>
        <Text style={styles.trendArrow}>›</Text>
      </Pressable>
      {!isLast && <View style={styles.trendDivider} />}
    </>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function HomeScreen() {
  const [apod,         setApod]         = useState<Apod | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState("");
  const [apodExpanded, setApodExpanded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const insets   = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim= useRef(new Animated.Value(20)).current;

  useEffect(() => { loadApod(); }, []);

  async function loadApod() {
    try {
      setLoading(true); setError("");
      const data = await getAstronomyPicture();
      setApod(data);
      Animated.parallel([
        Animated.timing(fadeAnim,  { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
      ]).start();
    } catch {
      setError("Falha ao conectar com a NASA.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={feedbackStyles.centered}>
        <StarField />
        <ActivityIndicator size="large" color={Colors.biluGreen} />
        <Text style={feedbackStyles.loadingText}>CONECTANDO À NASA...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={feedbackStyles.centered}>
        <StarField />
        <Text style={{ fontSize: 36, marginBottom: 16 }}>🛸</Text>
        <Text style={feedbackStyles.errorTitle}>Sinal perdido</Text>
        <Text style={feedbackStyles.errorSub}>{error}</Text>
        <Pressable onPress={loadApod} style={feedbackStyles.retryBtn}>
          <Text style={feedbackStyles.retryText}>TENTAR NOVAMENTE</Text>
        </Pressable>
      </View>
    );
  }

  const isVideo  = apod?.media_type === "video";
  const today    = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  const stardate = new Date().toISOString().slice(0, 10).replace(/-/g, ".");

  return (
    <View style={[layoutStyles.root, { paddingTop: insets.top }]}>
      <StarField />
      <View style={[layoutStyles.glowOrb, { top: -60, right: -80, width: 280, height: 280, backgroundColor: Colors.cosmicBlue + "0F" }]} />
      <View style={[layoutStyles.glowOrb, { bottom: 120, left: -80, width: 200, height: 200, backgroundColor: Colors.nebulaPurple + "0C" }]} />

      <Animated.ScrollView
        style={{ flex: 1, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.stardate}>STARDATE {stardate}</Text>
            <Text style={styles.appTitle}>ARQUIVO BILU</Text>
          </View>
          <View style={styles.headerBadge}>
            <View style={styles.headerDot} />
            <Text style={styles.headerBadgeText}>AO VIVO</Text>
          </View>
        </View>

        {/* APOD */}
        <View style={styles.apodWrap}>
          <View style={[styles.apodCard, { borderColor: Colors.cosmicBlue + "33" }]}>
            <View style={styles.apodImgWrap}>
              {!isVideo ? (
                // Toque na imagem abre o modal de zoom
                <Pressable
                  onPress={() => setModalVisible(true)}
                  style={({ pressed }) => [{ flex: 1, opacity: pressed ? 0.9 : 1 }]}
                >
                  <Image source={{ uri: apod?.url }} style={styles.apodImg} resizeMode="cover" />
                  {/* Ícone de lupa — indica que a imagem é clicável */}
                  <View style={styles.apodZoomHint}>
                    <Text style={styles.apodZoomIcon}>🔍</Text>
                  </View>
                </Pressable>
              ) : (
                <View style={styles.apodVideoPlaceholder}>
                  <Text style={{ fontSize: 40 }}>🎬</Text>
                  <Text style={styles.apodVideoText}>Vídeo NASA disponível</Text>
                </View>
              )}
              <LinearGradient colors={["transparent", "rgba(2,6,23,0.6)", "rgba(2,6,23,0.97)"]} style={StyleSheet.absoluteFillObject} locations={[0.2, 0.6, 1]} pointerEvents="none" />
              <View style={styles.apodBadge}>
                <View style={styles.apodBadgeDot} />
                <Text style={styles.apodBadgeText}>FOTO ASTRONÔMICA DO DIA</Text>
              </View>
              <View style={styles.apodOverlay}>
                <Text style={styles.apodTitle} numberOfLines={2}>{apod?.title}</Text>
                <Text style={styles.apodDate}>{today}</Text>
              </View>
            </View>
            {apod?.explanation && (
              <Pressable onPress={() => setApodExpanded(v => !v)} style={styles.apodExplanation}>
                <Text style={styles.apodExplanationText} numberOfLines={apodExpanded ? undefined : 3}>{apod.explanation}</Text>
                <Text style={[styles.apodExpandBtn, { color: Colors.cosmicBlue }]}>{apodExpanded ? "Mostrar menos ↑" : "Ler mais ↓"}</Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* Destaques */}
        <View style={cardStyles.sectionWrap}>
          <View style={cardStyles.sectionHeader}>
            <Text style={[cardStyles.sectionTitle, { color: Colors.biluGreen }]}>✦ DESTAQUES</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.featuredScroll}>
            {FEATURED.map(item => (
              <FeaturedCard key={item.id} item={item} onPress={() => navigate(item.screen, item.params)} />
            ))}
          </ScrollView>
        </View>

        {/* Em Alta */}
        <View style={cardStyles.sectionWrap}>
          <View style={cardStyles.sectionHeader}>
            <Text style={[cardStyles.sectionTitle, { color: Colors.cosmicBlue }]}>✦ EM ALTA AGORA</Text>
            <Pressable onPress={() => navigate("Tabs", { screen: "Universo" })}>
              <Text style={cardStyles.seeAll}>Ver tudo →</Text>
            </Pressable>
          </View>
          <View style={[cardStyles.card, { borderColor: "rgba(255,255,255,0.08)" }]}>
            {TRENDING.map((item, i) => (
              <TrendingRow key={item.id} item={item} onPress={() => navigate(item.screen, item.params)} isLast={i === TRENDING.length - 1} />
            ))}
          </View>
        </View>

        {/* CTA Arquivos */}
        <View style={cardStyles.sectionWrap}>
          <Pressable onPress={() => navigate("Tabs", { screen: "Arquivos" })} style={({ pressed }) => [styles.ctaCard, { opacity: pressed ? 0.85 : 1 }]}>
            <View style={styles.ctaGlow} />
            <View style={styles.ctaContent}>
              <View style={styles.ctaLeft}>
                <Text style={styles.ctaEmoji}>👽</Text>
              </View>
              <View style={styles.ctaText}>
                <Text style={styles.ctaEyebrow}>CASOS DOCUMENTADOS</Text>
                <Text style={styles.ctaTitle}>Arquivos Alienígenas</Text>
                <Text style={styles.ctaSub}>7 casos reais · 2 classificados</Text>
              </View>
              <View style={styles.ctaArrow}>
                <Text style={[styles.ctaArrowText, { color: Colors.biluGreen }]}>›</Text>
              </View>
            </View>
            <View style={styles.ctaGlowLine} />
          </Pressable>
        </View>

      </Animated.ScrollView>

      {/* Modal de zoom da APOD */}
      {apod && !isVideo && (
        <ApodImageModal
          visible={modalVisible}
          uri={apod.url}
          title={apod.title}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
}
