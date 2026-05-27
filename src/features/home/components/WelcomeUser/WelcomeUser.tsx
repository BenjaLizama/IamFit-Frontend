import CustomText from "@/src/core/components/CustomText";
import React from "react";
import { View } from "react-native";
import { useWelcomeUser } from "./useWelcomeUser";
import { WelcomeUserStyles as styles } from "./WelcomeUser.styles";
import { WelcomeUserProps } from "./WelcomeUser.types";

export default function WelcomeUser({ name }: WelcomeUserProps) {
  const { formatedName } = useWelcomeUser({ name });

  return (
    <View style={styles.container}>
      <CustomText type="h2" style={{ textAlign: "center" }}>
        {`Buenas tardes, ${formatedName}, aqui esta tu resumen diario.`}
      </CustomText>
    </View>
  );
}
