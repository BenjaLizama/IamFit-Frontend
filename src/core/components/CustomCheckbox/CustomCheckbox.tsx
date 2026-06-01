import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { CustomCheckboxStyles as styles } from "./CustomCheckbox.styles";
import { CustomCheckboxProps } from "./CustomCheckbox.types";

export default function CustomCheckbox({
  checked,
  onPress,
  disabled,
  size = 22,
  color = COLOR.AZUL_PRIMARIO,
}: CustomCheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled]}
    >
      <View
        style={[
          styles.box,
          {
            width: size,
            height: size,
            borderColor: color,
          },
        ]}
      >
        {checked && (
          <Ionicons name="checkmark" size={size * 0.8} color={color} />
        )}
      </View>
    </Pressable>
  );
}
