import CustomButton from "@/src/core/components/CustomButton/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import React from "react";
import { View } from "react-native";

export default function LoginScreen() {
  return (
    <Wrapper>
      <CustomText type="body">body</CustomText>
      <CustomText type="body_secondary">body_secondary</CustomText>
      <CustomText type="body_interactive">body_interactive</CustomText>
      <CustomText type="h1">h1</CustomText>
      <CustomText type="h2">h2</CustomText>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          justifyContent: "center",
        }}
      >
        <CustomButton type="secondary" isLoading={false}>
          Hola, soy un botón
        </CustomButton>
        <CustomButton type="primary" isLoading={false}>
          Hola, soy un botón
        </CustomButton>
      </View>
      <CustomButton type="destructive" isLoading={false}>
        Hola, soy un botón
      </CustomButton>
    </Wrapper>
  );
}
