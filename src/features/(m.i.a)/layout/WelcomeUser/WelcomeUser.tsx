import CustomText from "@/src/core/components/CustomText";
import { WelcomeUserProps } from "@/src/features/home/components/WelcomeUser";
import React from "react";
import { View } from "react-native";
import { WelcomeUserStyles as styles } from "./WelcomeUser.styles";
import { hp } from "@/src/core/utils";

export default function WelcomeUser({ name }: WelcomeUserProps) {
  return (
    <View style={styles.continer}>
      <CustomText type="body" size={hp(24)} style={{ textAlign: "center" }}>
        Bienvenido, {name}, ¿por dónde empezamos?
      </CustomText>
    </View>
  );
}