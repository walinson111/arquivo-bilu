import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors } from "../theme/colors";
import { Fonts } from "../theme/fonts";
import { PlanetDetailsScreen } from "../screens/Universe/PlanetDetailsScreen";
import { SolarSystemScreen } from "../screens/Universe/SolarSystemScreen";
import { StarDetailsScreen } from "../screens/Universe/StarDetailsScreen";
import { UniverseScreen } from "../screens/Universe/UniverseScreen";

const Stack = createNativeStackNavigator();

function UniverseHeader({ navigation, route }: any) {
  const is3D = route.name === "SolarSystem";

  return (
    <View style={header.wrap}>
      <Pressable
        onPress={() => navigation.navigate("UniverseList")}
        style={[header.tab, !is3D && header.tabActive]}
      >
        <Text style={[header.tabText, !is3D && header.tabTextActive]}>☰ Lista</Text>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("SolarSystem")}
        style={[header.tab, is3D && header.tabActive]}
      >
        <Text style={[header.tabText, is3D && header.tabTextActive]}>🪐 3D</Text>
      </Pressable>
    </View>
  );
}

const DETAIL_SCREENS = ["PlanetDetails", "StarDetails"];

const header = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "rgba(2,6,23,0.97)",
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(56,189,248,0.15)",
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(30,41,59,0.4)",
  },
  tabActive: {
    backgroundColor: Colors.biluGreen + "18",
    borderColor: Colors.biluGreen + "55",
  },
  tabText: {
    fontFamily: Fonts.spaceGroteskMedium,
    fontSize: 13,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.biluGreen,
  },
});

export function UniverseNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        headerStyle: { backgroundColor: "rgba(2,6,23,0.97)" },
        headerTintColor: Colors.text,
        headerTitleStyle: { fontFamily: Fonts.orbitron, fontSize: 14, letterSpacing: 1 },
        headerShadowVisible: false,
        headerBottom: () =>
          !DETAIL_SCREENS.includes(route.name) ? (
            <UniverseHeader navigation={navigation} route={route} />
          ) : null,
      })}
    >
      <Stack.Screen
        name="UniverseList"
        component={UniverseScreen}
        options={{ title: "Universo", headerShown: true }}
      />
      <Stack.Screen
        name="SolarSystem"
        component={SolarSystemScreen}
        options={{ title: "Universo", headerShown: true }}
      />
      <Stack.Screen
        name="PlanetDetails"
        component={PlanetDetailsScreen}
        options={{ title: "", headerShown: true }}
      />
      <Stack.Screen
        name="StarDetails"
        component={StarDetailsScreen}
        options={{ title: "", headerShown: true }}
      />
    </Stack.Navigator>
  );
}