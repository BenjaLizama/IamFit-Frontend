import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { ProgressTaskCardStyles as styles } from "./ProgressTaskCard.styles";

// TODO: Terminar diseño y funcionalidad
export default function ProgressTaskCard() {
  return (
    <View style={styles.container}>
      <View>
        <CustomText type="button_primary">
          Tus tareas de hoy estan casi completas
        </CustomText>
        <CustomButton type="extra" widht={100}>
          Ver tareas
        </CustomButton>
      </View>
      <View></View>
      <View></View>
    </View>
  );
}
