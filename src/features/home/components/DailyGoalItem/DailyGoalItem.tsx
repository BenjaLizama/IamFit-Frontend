import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { DailyGoalItemStyles as styles } from "./DailyGoalItem.styles";
import { DailyGoalItemProps } from "./DailyGoalItem.type";
import { hp } from "@/src/core/utils";

export default function DailyGoalItem({
  item,
  color,
  text,
}: DailyGoalItemProps) {
  return (
    <View style={styles.container}>
      <CustomText type="button_primary" color={color} size={hp(24)}>
        {item}
      </CustomText>
      <CustomText
        type="body_secondary"
        size={hp(14)}
        style={{ textAlign: "center" }}
      >
        {text}
      </CustomText>
    </View>
  );
}