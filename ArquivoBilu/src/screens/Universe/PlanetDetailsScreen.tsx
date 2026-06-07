import { View, Text } from "react-native";
import { Colors } from "../../theme/colors";

export function PlanetDetailsScreen({ route }: any) {
  const { planet } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: Colors.text,
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        {planet.englishName}
      </Text>

      <Text
        style={{
          color: Colors.text,
          marginBottom: 10,
        }}
      >
        Gravidade: {planet.gravity}
      </Text>

      <Text
        style={{
          color: Colors.text,
          marginBottom: 10,
        }}
      >
        Densidade: {planet.density}
      </Text>

      <Text
        style={{
          color: Colors.text,
        }}
      >
        Descoberto por: {planet.discoveredBy || "Desconhecido"}
      </Text>
    </View>
  );
}