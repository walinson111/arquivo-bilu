import {
  Orbitron_700Bold,
  Orbitron_900Black,
} from "@expo-google-fonts/orbitron";
import {
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { Colors } from "./src/theme/colors";

// Mantém a splash screen visível enquanto as fontes carregam
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_700Bold,
    Orbitron_900Black,
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Enquanto as fontes não carregam, mostra fundo escuro
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: Colors.background }} />;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
}