import { TouchableOpacity, Text } from "react-native";
import { Colors } from "../theme/colors";
import { spaceCardStyles as styles } from "./SpaceCard.styles";

interface SpaceCardProps {
  title: string;
  icon: string;
  onPress: () => void;
}

export function SpaceCard({ title, icon, onPress }: SpaceCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
