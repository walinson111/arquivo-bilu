import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

import { getAstronomyPicture } from "../../services/nasaApi";
import { Apod } from "../../types/apod";
import { Colors } from "../../theme/colors";
import { SpaceCard } from "../../components/SpaceCard";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {
  const [data, setData] = useState<Apod | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  async function loadData() {
    try {
      setLoading(true);

      const response = await getAstronomyPicture();

      setData(response);
    } catch {
      setError("Falha ao carregar dados da NASA.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={Colors.biluGreen}
        />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
          padding: 20,
        }}
      >
        <Text
          style={{
            color: Colors.text,
            textAlign: "center",
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <Image
        source={{ uri: data?.url }}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="cover"
      />

      <View
  style={{
    padding: 20,
  }}
>
  <Text
    style={{
      fontSize: 28,
      fontWeight: "bold",
      color: Colors.text,
      marginBottom: 8,
    }}
  >
    {data?.title}
  </Text>

  <Text
    style={{
      color: Colors.textSecondary,
      marginBottom: 16,
    }}
  >
    {data?.date}
  </Text>

  <Text
    style={{
      color: Colors.text,
      lineHeight: 24,
      marginBottom: 24,
    }}
  >
    {data?.explanation}
  </Text>

  <SpaceCard
    icon="🪐"
    title="Explorar Universo"
    onPress={() => {}}
  />

  <SpaceCard
    icon="⭐"
    title="Catálogo Estelar"
    onPress={() => {}}
  />

  <SpaceCard
    icon="🌌"
    title="Galáxias"
    onPress={() => {}}
  />

  <SpaceCard
    icon="🪐"
    title="Explorar Universo"
    onPress={() =>
      navigation.navigate("Universo" as never)
    }
  />
</View>
    </ScrollView>
  );
}