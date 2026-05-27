import CustomText from "@/src/core/components/CustomText";
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
}: FoodSummaryCardProps) {
  const { typeFoodColor } = useFoodSummaryCard({ tipoComida });
  return (
    <View style={styles.container}>
      <View>
        <CustomText
          color={typeFoodColor}
          type="body_interactive"
        >{`${tipoComida} - ${calorias} kcal`}</CustomText>
      </View>
      <View>
        <CustomText size={18} type="body">
          {descripcion}
        </CustomText>
      </View>
      <View>
        <CustomText type="body_secondary">{`P: ${dato1} - C: ${dato2} - G: ${dato3}`}</CustomText>
      </View>
    </View>
  );
}
