import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { DayCalendarCardStyles as styles } from "./DayCalendarCard.styles";
import { DayCalendarCardProps } from "./DayCalendarCard.types";
import { useDayCalendarCard } from "./useDayCalendarCard";

export default function DayCalendarCard({
  month,
  dayNumber,
  dayText,
  type = undefined,
}: DayCalendarCardProps) {
  const { formatMonth, fomatDay } = useDayCalendarCard({
    month,
    dayNumber,
    dayText,
  });
  const textType = type === "selected" ? "button_primary" : "button_secondary";

  return (
    <View style={[styles.container, type ? styles[type] : null]}>
      <CustomText type={textType}>{formatMonth}</CustomText>
      <CustomText type={textType} size={26}>
        {dayNumber}
      </CustomText>
      <CustomText type={textType}>{fomatDay}</CustomText>
    </View>
  );
}
