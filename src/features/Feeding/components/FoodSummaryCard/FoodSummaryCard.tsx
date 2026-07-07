import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
import React from "react";
import { View } from "react-native";
import { FoodSummaryCardStyles as styles } from "./FoodSummaryCard.styles";
import { FoodSummaryCardProps } from "./FoodSummaryCard.types";
import { useFoodSummaryCard } from "./useFoodSummaryCard";

export default function FoodSummaryCard({
  tipoComida,
  calorias,
  descripcion,
  dato1,
  dato2,
  dato3,
  showNutrition = true,
}: FoodSummaryCardProps) {
  const { typeFoodColor } = useFoodSummaryCard({ tipoComida });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <CustomText color={typeFoodColor} type="body_interactive">
            {showNutrition ? `${tipoComida} - ${calorias} kcal` : tipoComida}
          </CustomText>
        </View>
      </View>
      <View>
        <CustomText size={hp(18)} type="body">
          {descripcion}
        </CustomText>
      </View>
      {showNutrition && (
        <View>
          <CustomText type="body_secondary">{`P: ${dato1} - C: ${dato2} - G: ${dato3}`}</CustomText>
        </View>
      )}
    </View>
  );
}
