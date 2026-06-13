import { Ionicons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../theme/colors";
import { tabBarStyles as styles } from "./CustomTabBar.styles";

// ─── Configuração das abas ────────────────────────────────────────────────────

type TabConfig = {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconActive: keyof typeof Ionicons.glyphMap;
  isCenter?: boolean;
};

const TABS: TabConfig[] = [
  {
    name: "Início",
    label: "Início",
    icon: "home-outline",
    iconActive: "home",
  },
  {
    name: "Universo",
    label: "Universo",
    icon: "planet-outline",
    iconActive: "planet",
  },
  {
    name: "Arquivos",
    label: "Arquivos",
    icon: "radio-outline",
    iconActive: "radio",
    isCenter: true,
  },
  {
    name: "Favoritos",
    label: "Favoritos",
    icon: "heart-outline",
    iconActive: "heart",
  },
  {
    name: "Perfil",
    label: "Perfil",
    icon: "person-outline",
    iconActive: "person",
  },
];

// ─── Botão individual ─────────────────────────────────────────────────────────

function TabButton({
  config,
  isActive,
  onPress,
}: {
  config: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: isActive ? 1.08 : 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(glowAnim, {
        toValue: isActive ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive]);

  // ── Botão central elevado ──
  if (config.isCenter) {
    return (
      <Pressable
        onPress={onPress}
        style={styles.centerWrapper}
        android_ripple={{ color: Colors.biluGreen + "33", borderless: true, radius: 34 }}
      >
        <Animated.View
          style={[
            styles.centerBtn,
            {
              transform: [{ scale: scaleAnim }],
              backgroundColor: isActive
                ? Colors.biluGreen
                : "rgba(0,255,157,0.12)",
              borderColor: isActive
                ? Colors.biluGreen
                : "rgba(0,255,157,0.4)",
              shadowColor: Colors.biluGreen,
              shadowOpacity: isActive ? 0.55 : 0.2,
            },
          ]}
        >
          <Ionicons
            name={isActive ? config.iconActive : config.icon}
            size={26}
            color={isActive ? Colors.background : Colors.biluGreen}
          />
        </Animated.View>
        <Text style={[styles.centerLabel, { color: isActive ? Colors.biluGreen : Colors.textSecondary }]}>
          {config.label}
        </Text>
      </Pressable>
    );
  }

  // ── Botões normais ──
  const iconBgColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0)", "rgba(0,255,157,0.12)"],
  });

  return (
    <Pressable
      onPress={onPress}
      style={styles.tabBtn}
      android_ripple={{ color: Colors.biluGreen + "22", borderless: true, radius: 28 }}
    >
      <Animated.View
        style={[
          styles.iconWrap,
          { backgroundColor: iconBgColor },
        ]}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Ionicons
            name={isActive ? config.iconActive : config.icon}
            size={22}
            color={isActive ? Colors.biluGreen : Colors.textSecondary}
          />
        </Animated.View>
      </Animated.View>
      <Text
        style={[
          styles.tabLabel,
          { color: isActive ? Colors.biluGreen : Colors.textSecondary },
        ]}
        numberOfLines={1}
      >
        {config.label}
      </Text>
    </Pressable>
  );
}

// ─── Barra principal ──────────────────────────────────────────────────────────

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {/* Linha de brilho no topo da barra */}
      <View style={styles.topGlow} />

      <View style={styles.row}>
        {TABS.map((config, index) => {
          const route = state.routes[index];
          if (!route) return null;
          const isActive = state.index === index;

          return (
            <TabButton
              key={config.name}
              config={config}
              isActive={isActive}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

