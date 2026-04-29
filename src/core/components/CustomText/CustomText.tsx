import React from "react";
import { Text } from "react-native";
import { CustomTextStyle as styles } from "./CustomText.style";
import { CustomTextProps } from "./CustomText.types";

export default function CustomText({
  children,
  type = "body",
}: CustomTextProps) {
  return (
    <Text style={[styles[type], styles.defaultCorrection]}>{children}</Text>
  );
}
