import CustomText from "@/src/core/components/CustomText";
import ProgressBar from "@/src/core/components/ProgressBar/ProgressBar";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { DailyGoalProgressItemPropsStyles as styles } from "./DailyGoalProgressItem.styles";
import { DailyGoalProgressItemProps } from "./DailyGoalProgressItem.types";

// TODO: Mejorar los datos solicitados... tal vez solo se necesita
// la meta de x actividad, el progreso actual y con esa info deberia
// calcularse de forma automatica el progreso. [Extra: Revisar componente
// ProgressBar y asegurar la conexion correcta de estos componentes.]
export default function DailyGoalProgressItem({
  goal,
  subtitle,
  progress,
  color,
}: DailyGoalProgressItemProps) {
  return (
    <View style={styles.container}>
      <CustomText type="button_primary" color={COLOR.TEXTO_PRINCIPAL}>
        {goal}
      </CustomText>
      <CustomText type="body_secondary">{subtitle}</CustomText>
      <ProgressBar progress={progress} color={color} />
    </View>
  );
}
