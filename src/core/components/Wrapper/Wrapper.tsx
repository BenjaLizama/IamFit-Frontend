import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { UseWrapper } from "./useWrapper";
import { WrapperProps } from "./Wrapper.types";

export default function Wrapper({ children }: WrapperProps) {
  const { insets } = UseWrapper();

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        backgroundColor: COLOR.FONDO,
        alignItems: "stretch",
        justifyContent: "flex-start",
        flex: 1,
      }}
    >
      {children}
    </View>
  );
}
