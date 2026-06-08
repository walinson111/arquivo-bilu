import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { CustomTabBar } from "../components/Customtabbar";
import { FavoritesScreen } from "../screens/Favorites/FavoritesScreen";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";
import { UFOScreen } from "../screens/UFO/UFOScreen";
import { UniverseNavigator } from "./UniverseNavigator";
import { SolarSystemScreen } from "../screens/Universe/SolarSystemScreen";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Universo" component={UniverseNavigator} />
      <Tab.Screen name="Arquivos" component={UFOScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Perfil" component={SolarSystemScreen} />
    </Tab.Navigator>
  );
}