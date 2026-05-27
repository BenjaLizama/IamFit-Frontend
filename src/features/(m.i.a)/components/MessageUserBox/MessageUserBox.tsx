import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { MessageUserBoxStyles as styles } from "./MessageUserBox.styles";

export default function MessageUserBox() {
  return (
    <View style={styles.messageContainer}>
      <CustomText type="body" color={COLOR.FONDO}>
        Esto es una prueba de mensaje!
      </CustomText>
      <View style={styles.extra}></View>
    </View>
  );
}
