import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { MessageResponseBoxStyles as styles } from "./MessageResponseBox.styles";
import { MessageResponseBoxProps } from "./MessageResponseText.types";

export default function MessageResponseBox({
  response,
}: MessageResponseBoxProps) {
  return (
    <View style={styles.messageContainer}>
      <CustomText type="body">{response}</CustomText>
      <View style={styles.extra}></View>
    </View>
  );
}
