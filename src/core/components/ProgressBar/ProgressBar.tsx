import React from "react";
import { View } from "react-native";
import { ProgressBarStyles as styles } from "./ProgressBar.styles";
import { ProgressBarProps } from "./ProgressBar.types";

export default function ProgressBar({
  progress,
  color,
  height,
  style,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, { height }, style]}>
      <View
        style={[
          styles.filler,
          { width: `${clampedProgress}%`, backgroundColor: color },
        ]}
      ></View>
    </View>
  );
}
