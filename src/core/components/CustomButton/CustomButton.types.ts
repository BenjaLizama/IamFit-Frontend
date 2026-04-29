export interface CustomButtonProps {
  children: React.ReactNode;
  type: CustomButtonType;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

type CustomButtonType = "primary" | "secondary" | "destructive";
