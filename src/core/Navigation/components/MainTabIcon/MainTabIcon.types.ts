import type { Href } from "expo-router";
import type { GestureResponderEvent } from "react-native";

export interface MainTabIconProps {
  children: React.ReactNode;
  href?: Href;
  onPress?: (event: GestureResponderEvent) => void;
  type?: MainTabIconType;
  selected?: boolean;
  accessibilityLabel?: string;
}

type MainTabIconType = "big" | undefined;
