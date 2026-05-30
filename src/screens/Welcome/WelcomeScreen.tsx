import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import { hp } from "@/src/core/utils";
import { COLOR } from "@/src/theme";
import React from "react";
import { View } from "react-native";

export default function WelcomeScreen() {
  return (
    <Wrapper>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View></View>
        <IamfitIcon size={113} />
        <View style={{ marginBottom: hp(70) }}>
          <CustomText type="h2" color={COLOR.AZUL_PRIMARIO}>
            IAMFIT
          </CustomText>
        </View>
      </View>
    </Wrapper>
  );
}
