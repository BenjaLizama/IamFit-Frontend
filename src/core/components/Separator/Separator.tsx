import React from "react";
import { View } from "react-native";
import { SeparatorStyles as styles } from "./Separator.styles";
import { SeparatorPops } from "./Separator.types";

export default function Separator({
  color = "#E0E0E0",
  marginVertical = 20,
  width = "100%",
}: SeparatorPops) {
  return (
    <View
      style={[
        styles.hr,
        {
          marginVertical,
          backgroundColor: color,
          width,
        },
      ]}
    ></View>
  );
}
