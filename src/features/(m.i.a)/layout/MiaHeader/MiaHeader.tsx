import CustomText from "@/src/core/components/CustomText/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { MiaHeaderStyles as styles } from "./MiaHeader.styles";

export default function MiaHeader() {
  return (
    <View style={styles.container}>
      <CustomText type="button_secondary" color={COLOR.FONDO} size={20}>
        M.I.A
      </CustomText>
    </View>
  );
}
