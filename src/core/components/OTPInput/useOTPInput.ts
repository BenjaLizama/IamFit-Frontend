import { useRef } from "react";
import { TextInput } from "react-native";
import { OTPInputProps } from "./OTPInput.types";

export function useOTPInput({ length = 5, value, onChange }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, "").slice(0, length);
    onChange(cleaned);
  };

  const cells = Array.from({ length }, (_, index) => ({
    index,
    char: value[index] ?? "",
    isFilled: index < value.length,
    isActive: index === value.length,
  }));

  return {
    inputRef,
    cells,
    handlePress,
    handleChange,
  };
}
