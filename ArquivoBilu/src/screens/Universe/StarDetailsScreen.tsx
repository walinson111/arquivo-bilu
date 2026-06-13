import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "../../theme/colors";
import { starDetailsStyles as styles } from "./StarDetailsScreen.styles";
import { Fonts } from "../../theme/fonts";
import type { Star } from "../../services/solarSystemApi";
import { useFavoritesContext } from "../../context/FavoritesContext";
import { getBodyImage } from "../../constants/bodyImages";

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, unit, accent }: { label: string; value: string | number; unit?: string; accent: string }) {
  return (
    <View style={[styles.statCard, { borderColor: accent + "25" }]}>
      <Text style={[styles.statValue, { color: accent }]}>
        {value ?? "—"}
        {unit ? <Text style={styles.statUnit}> {unit}</Text> : null}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ─── Barra de comparação com o Sol ────────────────────────────────────────────

function SolarCompareBar({
  label,
  value,
  max,
  unit,
  accent,
}: {
  label: string;
  value: number;
  max: number;
  unit: string;
  accent: string;
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const percent = Math.min((value / max) * 100, 100);

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: percent,
      duration: 900,
      delay: 200,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.compareRow}>
      <View style={styles.compareHeader}>
        <Text style={styles.compareLabel}>{label}</Text>
        <Text style={[styles.compareValue, { color: accent }]}>
          {value >= 1000
            ? value.toLocaleString("pt-BR", { maximumFractionDigits: 0 })
            : value}
          {" "}{unit}
        </Text>
      </View>
      <View style={styles.compareTrack}>
        <Animated.View
          style={[
            styles.compareFill,
            {
              backgroundColor: accent,
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
        {/* Marcador do Sol */}
        <View style={[styles.solarMarker, { left: `${Math.min((1 / max) * 100, 100)}%` as any }]} />
      </View>
      <Text style={styles.compareHint}>☀️ = referência solar</Text>
    </View>
  );
}

// ─── Pulsação do hero ─────────────────────────────────────────────────────────

function StarHero({ star }: { star: Star }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim  = useRef(new Animated.Value(0.15)).current;
  const starImage = getBodyImage(star.id);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.06, duration: 2200, useNativeDriver: true }),
          Animated.timing(glowAnim,  { toValue: 0.32, duration: 2200, useNativeDriver: false }),
        ]),
        Animated.parallel([
          Animated.timing(pulseAnim, { toValue: 1.0, duration: 2200, useNativeDriver: true }),
          Animated.timing(glowAnim,  { toValue: 0.15, duration: 2200, useNativeDriver: false }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.heroSection}>
      {/* Glow externo animado */}
      <Animated.View style={[styles.heroGlow, { backgroundColor: star.accent, opacity: glowAnim }]} />

      {/* Imagem real ou emoji com pulso */}
      <Animated.View style={[styles.heroOrb, { borderColor: star.accent + "55", transform: [{ scale: pulseAnim }] }]}>
        {starImage ? (
          <Image source={starImage} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <Text style={styles.heroEmoji}>{star.emoji}</Text>
        )}
      </Animated.View>

      {/* Badge de classe */}
      <View style={[styles.classBadge, { backgroundColor: star.accent + "1A", borderColor: star.accent + "44" }]}>
        <Text style={[styles.classBadgeText, { color: star.accent }]}>{star.starClass}</Text>
      </View>

      <Text style={styles.starName}>{star.name}</Text>
      <Text style={styles.constellation}>✦ {star.constellation} · {star.spectralType}</Text>
      <Text style={styles.description}>{star.description}</Text>
    </View>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────

export function StarDetailsScreen({ route }: any) {
  const { star }: { star: Star } = route.params;
  const navigation = useNavigation();
  const insets     = useSafeAreaInsets();
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const favorited = isFavorite(star.id);

  const distanceDisplay =
    star.distanceLy < 1
      ? `${(star.distanceLy * 63241).toFixed(0)} UA`
      : star.distanceLy >= 1000
      ? `${(star.distanceLy / 1000).toFixed(2)} kly`
      : `${star.distanceLy} al`;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Botão favoritar */}
      <Pressable
        onPress={() => toggleFavorite({
          id: star.id,
          name: star.name,
          type: "star",
          emoji: star.emoji,
          accent: star.accent,
          subtitle: star.starClass,
          savedAt: Date.now(),
        })}
        style={[styles.favBtn, { borderColor: favorited ? star.accent + "88" : "rgba(255,255,255,0.15)" }]}
        accessibilityLabel={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      >
        <Text style={{ fontSize: 22 }}>{favorited ? "♥" : "♡"}</Text>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.75}>
            <Ionicons name="arrow-back" size={20} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerLabel}>ESTRELAS</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero */}
        <StarHero star={star} />

        {/* Grid de stats */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>CARACTERÍSTICAS</Text>
        <View style={styles.statsGrid}>
          <StatCard label="Temperatura" value={star.surfaceTemp.toLocaleString("pt-BR")} unit="K" accent={star.accent} />
          <StatCard label="Distância" value={distanceDisplay} accent={star.accent} />
          <StatCard label="Mag. Absoluta" value={star.absoluteMag} accent={star.accent} />
        </View>
        <View style={styles.statsGrid}>
          <StatCard label="Massa" value={star.mass} unit="M☉" accent={star.accent} />
          <StatCard label="Raio" value={star.radius} unit="R☉" accent={star.accent} />
          {star.age != null
            ? <StatCard label="Idade" value={star.age} unit="Ga" accent={star.accent} />
            : <StatCard label="Luminosidade" value={star.luminosity.toLocaleString("pt-BR", { maximumFractionDigits: 0 })} unit="L☉" accent={star.accent} />
          }
        </View>

        {/* Comparação com o Sol */}
        {star.id !== "sun" && (
          <>
            <Text style={[styles.sectionTitle, { color: star.accent }]}>COMPARAÇÃO COM O SOL</Text>
            <View style={[styles.compareCard, { borderColor: star.accent + "25" }]}>
              <SolarCompareBar
                label="Raio"
                value={star.radius}
                max={Math.max(star.radius * 1.2, 2)}
                unit="R☉"
                accent={star.accent}
              />
              <View style={styles.compareDivider} />
              <SolarCompareBar
                label="Massa"
                value={star.mass}
                max={Math.max(star.mass * 1.2, 2)}
                unit="M☉"
                accent={star.accent}
              />
              <View style={styles.compareDivider} />
              <SolarCompareBar
                label="Luminosidade"
                value={star.luminosity}
                max={Math.max(star.luminosity * 1.1, 2)}
                unit="L☉"
                accent={star.accent}
              />
            </View>
          </>
        )}

        {/* Curiosidade */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>CURIOSIDADE</Text>
        <View style={[styles.curiosityCard, { borderColor: star.accent + "30", borderLeftColor: star.accent }]}>
          <Text style={styles.curiosityEmoji}>💡</Text>
          <Text style={styles.curiosityText}>{star.curiosity}</Text>
        </View>

        {/* Info orbital */}
        <Text style={[styles.sectionTitle, { color: star.accent }]}>DADOS ESTELARES</Text>
        <View style={[styles.infoCard, { borderColor: star.accent + "25" }]}>
          {[
            { label: "Tipo Espectral",    value: star.spectralType },
            { label: "Classe Estelar",    value: star.starClass },
            { label: "Constelação",       value: star.constellation },
            { label: "Temperatura",       value: `${star.surfaceTemp.toLocaleString("pt-BR")} K` },
            { label: "Distância da Terra", value: distanceDisplay },
            ...(star.age != null ? [{ label: "Idade", value: `${star.age} bilhões de anos` }] : []),
          ].map((row, i) => (
            <View
              key={row.label}
              style={[styles.infoRow, i > 0 && { borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.05)" }]}
            >
              <Text style={styles.infoLabel}>{row.label}</Text>
              <Text style={styles.infoValue}>{row.value}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

