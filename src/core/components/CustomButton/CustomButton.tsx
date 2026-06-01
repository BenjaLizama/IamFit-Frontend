import React, { useMemo } from "react";
import { ActivityIndicator, Animated, Pressable } from "react-native";
import CustomText from "../CustomText";
import { CustomButtonStyles as styles } from "./CustomButton.styles";
import { CustomButtonProps } from "./CustomButton.types";
import { useShrinkButton } from "./useCustomButton"; // Importamos el hook corregido

export default function CustomButton({
  children,
  type,
  disabled,
  isLoading,
  widht, // Mantenemos el nombre de tu prop por compatibilidad, pero considera corregir el typo a 'width' luego
  onPress,
}: CustomButtonProps) {
  // Consumimos el hook con su nomenclatura correcta de React
  const { LOADED_COLORS, scaleValue, onPressIn, onPressOut } =
    useShrinkButton();

  const widthStyle = useMemo(() => (widht ? { width: widht } : null), [widht]);

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }, widthStyle]}>
      <Pressable
        disabled={isLoading || disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => [
          styles[type],
          type !== "extra" && styles.button_common,
          (disabled || isLoading) && styles.disabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={LOADED_COLORS[type] || "#FFFFFF"} />
        ) : (
          <CustomText type={`button_${type}`}>{children}</CustomText>
        )}
      </Pressable>
    </Animated.View>
  );
}
