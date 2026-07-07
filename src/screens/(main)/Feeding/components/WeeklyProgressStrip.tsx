import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";

type WeeklyProgressStripProps = {
  userId?: string;
  progress?: number;
  activeDay?: string;
};

export default function WeeklyProgressStrip({
  progress = 0,
  activeDay,
}: WeeklyProgressStripProps) {
  return (
    <View
      style={{
        padding: 12,
        borderRadius: 12,
        backgroundColor: COLOR.FONDO_OPACO,
        marginTop: 12,
      }}
    >
      <CustomText type="body_secondary">Progreso semanal</CustomText>
      <CustomText type="h2" style={{ marginTop: 4 }}>
        {Math.round(progress)}%
      </CustomText>
      {activeDay ? (
        <CustomText type="body_secondary" style={{ marginTop: 4 }}>
          Día activo: {activeDay}
        </CustomText>
      ) : null}
    </View>
  );
}
