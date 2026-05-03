import { BottomSheet } from "@/src/core/components/BottomSheet/BottomSheet";
import { useBottomSheet } from "@/src/core/components/BottomSheet/useBottomSheet";
import CustomButton from "@/src/core/components/CustomButton/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import PrivacyPolicyScreen from "@/src/features/legal/screens/PrivacyPolicy/PrivacyPolicyScreen";
import React from "react";
import { View } from "react-native";

export default function LoginScreen() {
  const { sheetRef, openSheet } = useBottomSheet();

  return (
    <Wrapper>
      <IamfitIcon size={150} />
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
      <CustomButton type="destructive" isLoading={false} onPress={openSheet}>
        Hola, soy un botón
      </CustomButton>
      <CustomFormInput
        placeholder="Contraseña"
        secureTextEntry
        error="Si, falla"
      ></CustomFormInput>
      <BottomSheet ref={sheetRef}>
        <PrivacyPolicyScreen />
      </BottomSheet>
    </Wrapper>
  );
}
