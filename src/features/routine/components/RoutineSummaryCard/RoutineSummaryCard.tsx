import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { RoutineSummaryCardStyles as style } from "./RoutineSummaryCard.styles";
import { RoutineSummaryCardProps } from "./RoutineSummaryCard.types";
export default function RoutineSummaryCard({
  equipment,
  exerciseCount,
  level,
  nextSessionLabel,
  estimatedTime,
}: RoutineSummaryCardProps) {
  return (
    <View style={style.container}>
      <View style={style.textBlock}>
        <CustomText
          type="body"
          size={13}
          color={COLOR.FONDO}
          style={style.labelText}
        >
          Proxima sesion - {nextSessionLabel}
        </CustomText>
      </View>
      <View style={style.textBlock}>
        <CustomText
          type="button_primary"
          size={26}
          style={style.titleText}
          color={COLOR.FONDO}
        >
          {exerciseCount} ejercicios - ~{estimatedTime} min
        </CustomText>
      </View>
      <View style={style.textBlock}>
        <CustomText
          type="body"
          size={12}
          color={COLOR.FONDO}
          style={style.detailText}
        >
          Nivel: {level} Equipo: {equipment}
        </CustomText>
      </View>
    </View>
  );
}
