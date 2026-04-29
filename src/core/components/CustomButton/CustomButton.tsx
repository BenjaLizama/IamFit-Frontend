import React from "react";
import { ActivityIndicator, Animated, Pressable } from "react-native";
import CustomText from "../CustomText";
import { CustomButtonStyles as styles } from "./CustomButton.styles";
import { CustomButtonProps } from "./CustomButton.types";
import { ShrinkButton } from "./useCustomButton";

export default function CustomButton({
  children,
  type,
  disabled,
  isLoading,
  onPress,
}: CustomButtonProps) {
  const { LOADED_COLORS, scaleValue, onPressIn, onPressOut } = ShrinkButton();

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
      <Pressable
        disabled={isLoading || disabled}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={[
          styles[type],
          styles.button_common,
          (disabled || isLoading) && styles.disabled,
        ]}
      >
        {isLoading ? (
          <ActivityIndicator color={LOADED_COLORS[type]} />
        ) : (
          <CustomText type={`button_${type}`}>{children}</CustomText>
        )}
      </Pressable>
    </Animated.View>
  );
}
