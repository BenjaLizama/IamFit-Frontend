import React from "react";
import { Text } from "react-native";
import { CustomTextStyle as styles } from "./CustomText.styles";
import { CustomTextProps } from "./CustomText.types";

export default function CustomText({
  children,
  type = "body",
  color,
  size,
  style,
  onPress,
  numberOfLines,
  ellipsizeMode,
}: CustomTextProps) {
  return (
    <Text
      style={[
        style,
        styles[type],
        styles.defaultCorrection,
        color ? { color: color } : null,
        size ? { fontSize: size } : null,
      ]}
      onPress={onPress}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
    >
      {children}
    </Text>
  );
}
