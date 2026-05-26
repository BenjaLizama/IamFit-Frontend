import AiLogo from "@/assets/images/Icons/ai-commentary.svg";
import Firework from "@/assets/images/Icons/firework.svg";
import CustomText from "@/src/core/components/CustomText/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { MiaHeaderStyles as styles } from "./MiaHeader.styles";

export default function MiaHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.iaLogoContainer}>
        <AiLogo color={COLOR.FONDO} />
      </View>

      <View style={styles.textContainer}>
        <View style={styles.miaText}>
          <CustomText type="button_secondary" color={COLOR.FONDO} size={18}>
            M.I.A
          </CustomText>
          <Firework />
        </View>

        <CustomText type="body" color={COLOR.FONDO} size={14}>
          IAMFIT
        </CustomText>
      </View>
    </View>
  );
}
