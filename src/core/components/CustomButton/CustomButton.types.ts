export interface CustomButtonProps {
  children: React.ReactNode;
  type: CustomButtonType;
  onPress?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  widht?: number;
}

type CustomButtonType = "primary" | "secondary" | "destructive" | "extra";
