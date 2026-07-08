import CustomText from "@/src/core/components/CustomText";
import { hp } from "@/src/core/utils";
import React from "react";
import { Pressable, View } from "react-native";
import { FoodSummaryCardStyles as styles } from "./FoodSummaryCard.styles";
import { FoodSummaryCardProps } from "./FoodSummaryCard.types";
import { useFoodSummaryCard } from "./useFoodSummaryCard";

const getBriefDescription = (text: string, maxLength = 80) => {
  const firstSentence = text.split(/(?<=[.!?])\s+/)[0];

  if (firstSentence.length <= maxLength) {
    return firstSentence;
  }

  return `${firstSentence.slice(0, maxLength).trimEnd()}…`;
};

export default function FoodSummaryCard({
  tipoComida,
  calorias,
  descripcion,
  dato1,
  dato2,
  dato3,
  showNutrition = true,
  onPress,
  isActive = false,
}: FoodSummaryCardProps) {
  const { typeFoodColor } = useFoodSummaryCard({ tipoComida });
  const briefDescription = getBriefDescription(descripcion, 70);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[styles.container, isActive && styles.containerActive]}
    >
      <View style={styles.headerRow}>
        <View style={styles.titleColumn}>
          <CustomText color={typeFoodColor} type="body_interactive">
            {tipoComida}
          </CustomText>
          {showNutrition && typeof calorias === "number" ? (
            <CustomText type="body_secondary" style={styles.caloriesText}>
              {`${calorias} kcal`}
            </CustomText>
          ) : null}
        </View>
        {onPress && (
          <CustomText type="body_secondary" style={styles.arrow}>
            {isActive ? "▲" : "▼"}
          </CustomText>
        )}
      </View>
      <View>
        <CustomText size={hp(17)} type="body">
          {briefDescription}
        </CustomText>
      </View>
      {showNutrition && (
        <View>
          <CustomText type="body_secondary">{`P: ${dato1} - C: ${dato2} - G: ${dato3}`}</CustomText>
        </View>
      )}
    </Pressable>
  );
}
