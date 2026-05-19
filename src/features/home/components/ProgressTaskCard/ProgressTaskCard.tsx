import CustomText from "@/src/core/components/CustomText";
import formatToLocalNumber from "@/src/core/utils";
import React from "react";
import { View } from "react-native";
import CircleProgress from "../CircleProgress";
import { ProgressTaskCardStyles as styles } from "./ProgressTaskCard.styles";
import { ProgressTaskCardProps } from "./ProgressTaskCard.types";
import { useProgressTaskCard } from "./useProgressTaskCard";

export default function ProgressTaskCard({
  actualCalories,
  goal,
}: ProgressTaskCardProps) {
  const { progressPercentage } = useProgressTaskCard({ actualCalories, goal });

  return (
    <View style={styles.container}>
      <View style={styles.second}>
        <CircleProgress
          percentage={progressPercentage}
          size={75}
          strokeWidth={10}
        />
      </View>
      <View style={styles.first}>
        <CustomText type="button_primary" size={14}>
          ¡Tu progreso de hoy!
        </CustomText>
        <CustomText type="button_primary" size={24}>
          {formatToLocalNumber(actualCalories)} kcal
        </CustomText>
        <View>
          <CustomText type="button_primary" size={14}>
            Meta: {formatToLocalNumber(goal)} kcal
          </CustomText>
          <CustomText type="button_primary" size={14}>
            Faltan: {formatToLocalNumber(goal - actualCalories)} kcal
          </CustomText>
        </View>
      </View>
    </View>
  );
}
