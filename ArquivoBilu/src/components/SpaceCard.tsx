import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/colors";

interface SpaceCardProps {
  title: string;
  icon: string;
  onPress: () => void;
}

export function SpaceCard({
  title,
  icon,
  onPress,
}: SpaceCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <Text style={styles.icon}>{icon}</Text>

      <Text style={styles.title}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.biluGreen,
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
  },
});