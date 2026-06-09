import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Colors } from "../theme/colors";
import { Fonts } from "../theme/fonts";
import { UFOScreen } from "../screens/UFO/UFOScreen";
import { UFODetailsScreen } from "../screens/UFO/UFODetailsScreen";

const Stack = createNativeStackNavigator();

export function UFONavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="UFOList"    component={UFOScreen} />
      <Stack.Screen name="UFODetails" component={UFODetailsScreen} />
    </Stack.Navigator>
  );
}