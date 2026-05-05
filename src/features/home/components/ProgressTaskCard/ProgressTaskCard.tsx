import MoreSquare from "@/assets/images/Icons/more-square.svg";
import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import CircleProgress from "../CircleProgress";
import { ProgressTaskCardStyles as styles } from "./ProgressTaskCard.styles";

// TODO: Terminar diseño y funcionalidad
export default function ProgressTaskCard() {
  return (
    <View style={styles.container}>
      <View style={styles.first}>
        <CustomText type="button_primary" size={14}>
          Tu desafío diario esta casi terminado!
        </CustomText>
        <CustomButton type="extra" widht={110}>
          Ver Desafío
        </CustomButton>
      </View>
      <View style={styles.second}>
        <CircleProgress percentage={85} size={70} strokeWidth={10} />
      </View>
      <View style={styles.options}>
        <CustomText type="h2">
          <MoreSquare height={30} width={30} />
        </CustomText>
      </View>
    </View>
  );
}
