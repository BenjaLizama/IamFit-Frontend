import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { CircularProgressProps } from "./CircularProgress.types";

export default function CircularProgress({
  percentage,
  size = 64,
  strokeWidth = 7,
  color = COLOR.SUCCESS,
  trackColor = COLOR.GRIS,
  children,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - clamped / 100);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          fill="none"
          rotation={-90}
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <View style={{ position: "absolute" }}>{children}</View>
    </View>
  );
}
