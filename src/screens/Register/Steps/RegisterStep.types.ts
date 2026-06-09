import { Href } from "expo-router";
import { TextInputProps } from "react-native";

export interface RegisterStepScreenProps {
  title: string;
  stepLabel: string;
  helperText?: string;
  inputProps?: TextInputProps;
  inputComponent?: React.ReactNode;
  nextRoute: Href;
  progress?: number;
  buttonLabel?: string;
  onButtonPress?: () => void;
  disabled: boolean;
  loading?: boolean;
  error?: string;
}
