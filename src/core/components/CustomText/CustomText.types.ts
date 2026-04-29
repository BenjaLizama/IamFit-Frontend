export interface CustomTextProps {
  children: React.ReactNode;
  type: CustomTextTypes;
}

type CustomTextTypes =
  | "body"
  | "body_secondary"
  | "body_interactive"
  | "h1"
  | "h2";
