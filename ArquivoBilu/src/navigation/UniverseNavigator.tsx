import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { UniverseScreen } from "../screens/Universe/UniverseScreen";
import { PlanetDetailsScreen } from "../screens/Universe/PlanetDetailsScreen";

const Stack = createNativeStackNavigator();

export function UniverseNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UniverseList"
        component={UniverseScreen}
        options={{
          title: "Planetas",
        }}
      />

      <Stack.Screen
        name="PlanetDetails"
        component={PlanetDetailsScreen}
        options={{
          title: "Detalhes"
        }}
      />
    </Stack.Navigator>
  );
}