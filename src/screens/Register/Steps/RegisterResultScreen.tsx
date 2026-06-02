import SuccessIcon from "@/assets/images/Icons/tick-circle.svg";
import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import { useRegisterForm } from "@/src/core/context/RegisterContext";
import { COLOR } from "@/src/theme";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { RegisterStepStyles as styles } from "./RegisterStep.styles";

export default function RegisterResultScreen() {
  const router = useRouter();
  const { resetForm } = useRegisterForm();

  const handleFinish = () => {
    resetForm();
    router.replace("/login");
  };

  return (
    <Wrapper>
      <ScrollView
        contentContainerStyle={styles.resultContentContainer}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.resultHeader}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: "100%" }]} />
          </View>
          <CustomText type="body_secondary">Paso 8 de 8</CustomText>
        </View>

        <View style={styles.resultMessage}>
          <CustomText type="h1">
            Tu cuenta ha sido{"\n"}creada con éxito
          </CustomText>
        </View>
        <SuccessIcon height={120} width={120} fill={COLOR.AZUL_PRIMARIO} />
        <View></View>

        <View style={styles.actions}>
          <CustomButton onPress={handleFinish} type="primary">
            Completado
          </CustomButton>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
