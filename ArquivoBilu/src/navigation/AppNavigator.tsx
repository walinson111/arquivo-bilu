import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "../screens/Home/HomeScreen";
import { UniverseNavigator } from "./UniverseNavigator";
import { UFOScreen } from "../screens/UFO/UFOScreen";
import { FavoritesScreen } from "../screens/Favorites/FavoritesScreen";
import { ProfileScreen } from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Universo" component={UniverseNavigator} />
      <Tab.Screen name="Arquivos" component={UFOScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}