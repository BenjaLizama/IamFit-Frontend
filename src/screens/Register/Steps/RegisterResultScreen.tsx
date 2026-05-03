import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import { RegisterStepStyles as styles } from "./RegisterStep.styles";

export default function RegisterResultScreen() {
  const router = useRouter();

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
          <CustomText type="h1">Cuenta{"\n"}creada</CustomText>
        </View>

        <View style={styles.actions}>
          <CustomButton onPress={() => router.replace("/login")} type="primary">
            Completado
          </CustomButton>
        </View>
      </ScrollView>
    </Wrapper>
  );
}
