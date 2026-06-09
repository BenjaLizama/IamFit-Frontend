import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import CustomButton from "../CustomButton";
import CustomText from "../CustomText";
import { SuccessResultStyles as styles } from "./SuccessResult.styles";
import { SuccessResultProps } from "./SuccessResult.types";

export default function SuccessResult({
  title,
  buttonLabel,
  onPress,
}: SuccessResultProps) {
  return (
    <View style={styles.container}>
      <CustomText type="h1" style={styles.title}>
        {title}
      </CustomText>

      <View style={styles.iconCircle}>
        <Ionicons name="checkmark" size={48} color="#FFFFFF" />
      </View>

      <View style={styles.button}>
        <CustomButton type="primary" onPress={onPress}>
          {buttonLabel}
        </CustomButton>
      </View>
    </View>
  );
}
