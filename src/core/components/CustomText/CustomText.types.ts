export interface CustomTextProps {
  children: React.ReactNode;
  type: CustomTextTypes;
  onPress?: () => void;
}

type CustomTextTypes =
  | "body"
  | "body_secondary"
  | "body_interactive"
  | "h1"
  | "h2";
