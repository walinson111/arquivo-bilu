import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/Home/HomeScreen";
import { UniverseScreen } from "../screens/Universe/UniverseScreen";
import { UFOScreen } from "../screens/UFO/UFOScreen";
import { FavoritesScreen } from "../screens/Favorites/FavoritesScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Universo" component={UniverseScreen} />
      <Tab.Screen name="Arquivos" component={UFOScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}