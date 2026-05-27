import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { MessageResponseTextStyles as styles } from "./MessageResponseText.styles";

export default function MessageResponseText() {
  return (
    <View style={styles.messageContainer}>
      <CustomText type="body">
        Esto es un mensaje de prueba DESDE LA IA CHAVAL!
      </CustomText>
      <View style={styles.extra}></View>
    </View>
  );
}
