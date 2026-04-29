import { COLOR } from "@/src/theme";
import { useRef } from "react";
import { Animated } from "react-native";

export const ShrinkButton = () => {
  const LOADED_COLORS: Record<string, string> = {
    primary: COLOR.FONDO,
    secondary: COLOR.TEXTO_PRINCIPAL,
    destructive: COLOR.FONDO,
  };

  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return {
    LOADED_COLORS,
    scaleValue,
    onPressIn,
    onPressOut,
  };
};
