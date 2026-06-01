import { COLOR } from "@/src/theme";
import { useCallback, useMemo, useRef } from "react";
import { Animated } from "react-native";

// Cambiamos el nombre a convención estándar de React Hooks
export const useShrinkButton = () => {
  const LOADED_COLORS: Record<string, string> = useMemo(
    () => ({
      primary: COLOR.FONDO,
      secondary: COLOR.TEXTO_PRINCIPAL,
      destructive: COLOR.FONDO,
      extra: COLOR.TEXTO_PRINCIPAL, // Agregado "extra" por si acaso para evitar que sea undefined
    }),
    [],
  );

  const scaleValue = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  const onPressOut = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  return {
    LOADED_COLORS,
    scaleValue,
    onPressIn,
    onPressOut,
  };
};
