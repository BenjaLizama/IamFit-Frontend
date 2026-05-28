import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import { BottomSheet } from "@/src/core/components/BottomSheet";
import { useBottomSheet } from "@/src/core/components/BottomSheet/useBottomSheet";
import PrivacyPolicyScreen from "@/src/screens/PrivacyPolicy";
import { COLOR } from "@/src/theme";
import { useRouter } from "expo-router";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisterStepStyles as styles } from "./RegisterStep.styles";
import { RegisterStepScreenProps } from "./RegisterStep.types";

export default function RegisterStepScreen({
  title,
  stepLabel,
  helperText,
  inputProps,
  inputComponent,
  nextRoute,
  progress = 0,
  buttonLabel = "Continuar",
}: RegisterStepScreenProps) {
  const router = useRouter();
  const inputRef = React.useRef<TextInput>(null);
  const { sheetRef, openSheet } = useBottomSheet();

  const goNext = () => {
    router.push(nextRoute);
  };


  return (
    <SafeAreaView
      edges={["top", "bottom", "left", "right"]}
      style={{ flex: 1, backgroundColor: COLOR.FONDO }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          scrollEnabled={false}
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
        >
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <CustomText type="body_interactive">Volver</CustomText>
            </Pressable>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <CustomText type="body_secondary">{stepLabel}</CustomText>
          </View>

          <View style={styles.questionArea}>
            <CustomText type="h1">{title}</CustomText>
            {helperText ? (
              <CustomText type="body_secondary">{helperText}</CustomText>
            ) : null}
          </View>

          <View style={styles.inputArea}>
            {inputComponent ? (
              inputComponent
            ) : (
              <CustomFormInput
                ref={inputRef}
                onSubmitEditing={goNext}
                returnKeyType="next"
                submitBehavior="submit"
                {...inputProps}
              />
            )}
          </View>

          <View style={styles.actions}>
            <CustomButton onPress={goNext} type="primary">
              {buttonLabel}
            </CustomButton>
          </View>
          <CustomText type="body" style={{ textAlign: "center" }}>
            Al crear una cuenta, acepta nuestra{" "}
            <CustomText
              type="body_interactive"
              onPress={openSheet}
            >
              Política de Privacidad
            </CustomText>{" "}
            y los{" "}
            <CustomText
              type="body_interactive"
              onPress={openSheet}
            >
              Términos de Servicio.
            </CustomText>
          </CustomText>
        </ScrollView>
      </KeyboardAvoidingView>

      <BottomSheet ref={sheetRef}>
        <PrivacyPolicyScreen />
      </BottomSheet>
    </SafeAreaView>
  );
}
