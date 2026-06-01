import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";
import { MessageUserBoxStyles as styles } from "./MessageUserBox.styles";
import { MessageUserBoxProps } from "./MessageUserBox.types";

export default function MessageUserBox({ message }: MessageUserBoxProps) {
  return (
    <View style={styles.messageContainer}>
      <CustomText type="body" color={COLOR.FONDO}>
        {message}
      </CustomText>
      <View style={styles.extra}></View>
    </View>
  );
}
