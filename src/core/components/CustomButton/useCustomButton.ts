import { COLOR } from "@/src/theme";
import { useCallback, useMemo, useRef } from "react";
import { Animated } from "react-native";

export const ShrinkButton = () => {
  // 1. Memorizamos el objeto de colores para que no se recree en cada render
  const LOADED_COLORS: Record<string, string> = useMemo(
    () => ({
      primary: COLOR.FONDO,
      secondary: COLOR.TEXTO_PRINCIPAL,
      destructive: COLOR.FONDO,
    }),
    [],
  );

  const scaleValue = useRef(new Animated.Value(1)).current;

  // 2. CONGELAMOS onPressIn con useCallback
  const onPressIn = useCallback(() => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  }, [scaleValue]);

  // 3. CONGELAMOS onPressOut con useCallback
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
