import { StyleProp, TextStyle } from "react-native";

export interface CustomTextProps {
  children: React.ReactNode;
  type: CustomTextTypes;
  color?: string;
  size?: number;
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

type CustomTextTypes =
  | "body"
  | "body_secondary"
  | "body_interactive"
  | "h1"
  | "h2"
  | "button_primary"
  | "button_secondary"
  | "button_destructive";
