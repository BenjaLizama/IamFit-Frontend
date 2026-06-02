import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CircleProgressStyles as styles } from "./CircleProgress.styles";
import { CircleProgressProps } from "./CircleProgress.types";

export default function CircleProgress({
  percentage,
  size,
  strokeWidth,
}: CircleProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Circulo de fondo */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLOR.AZUL_PRIMARIO}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Circulo de progreso*/}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={COLOR.FONDO}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-15"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <View style={{ position: "absolute" }}>
        <CustomText type="button_primary">{Math.round(percentage)}%</CustomText>
      </View>
    </View>
  );
}
