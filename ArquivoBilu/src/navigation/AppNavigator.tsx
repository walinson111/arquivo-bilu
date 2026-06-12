import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CustomTabBar }       from "../components/Customtabbar";
import { FavoritesScreen }    from "../screens/Favorites/FavoritesScreen";
import { HomeScreen }         from "../screens/Home/HomeScreen";
import { ProfileScreen }      from "../screens/Profile/ProfileScreen";
import { PlanetDetailsScreen } from "../screens/Universe/PlanetDetailsScreen";
import { StarDetailsScreen }   from "../screens/Universe/StarDetailsScreen";
import { UFONavigator }        from "./UFONavigator";
import { UniverseNavigator }   from "./UniverseNavigator";
import { AuthNavigator }       from "./AuthNavigator";
import { Colors } from "../theme/colors";
import { Fonts }  from "../theme/fonts";
import { useAuth } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Início"    component={HomeScreen} />
      <Tab.Screen name="Universo"  component={UniverseNavigator} />
      <Tab.Screen name="Arquivos"  component={UFONavigator} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Perfil"    component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { state } = useAuth();

  // Splash enquanto verifica sessão salva
  if (state.status === "loading") {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={Colors.biluGreen} size="large" />
      </View>
    );
  }

  // Não autenticado → fluxo de login/cadastro
  if (state.status === "unauthenticated") {
    return <AuthNavigator />;
  }

  // Autenticado → app completo
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="PlanetDetails"
        component={PlanetDetailsScreen as any}
        options={{
          headerShown: true,
          title: "",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: Fonts.orbitron },
        }}
      />
      <Stack.Screen
        name="StarDetails"
        component={StarDetailsScreen as any}
        options={{
          headerShown: true,
          title: "",
          headerStyle: { backgroundColor: Colors.background },
          headerTintColor: Colors.text,
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: Fonts.orbitron },
        }}
      />
    </Stack.Navigator>
  );
}