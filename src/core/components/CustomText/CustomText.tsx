import React from "react";
import { Text } from "react-native";
import { CustomTextStyle as styles } from "./CustomText.style";
import { CustomTextProps } from "./CustomText.types";

export default function CustomText({
  children,
  type = "body",
  onPress,
}: CustomTextProps) {
  return (
    <Text style={[styles[type], styles.defaultCorrection]} onPress={onPress}>
      {children}
    </Text>
  );
}
