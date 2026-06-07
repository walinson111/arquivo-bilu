import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Colors } from "../../theme/colors";
import { getBodies } from "../../services/solarSystemApi";

export function UniverseScreen() {
  const [planets, setPlanets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPlanets() {
    try {
      const bodies = await getBodies();

      const onlyPlanets = bodies.filter(
        (body: any) => body.isPlanet
      );

      setPlanets(onlyPlanets);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPlanets();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={planets}
      keyExtractor={(item) => item.id}
      style={{
        backgroundColor: Colors.background,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            backgroundColor: Colors.card,
            margin: 10,
            padding: 20,
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontSize: 20,
            }}
          >
            {item.englishName}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}