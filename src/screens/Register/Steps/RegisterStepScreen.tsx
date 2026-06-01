import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import { COLOR } from "@/src/theme";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
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
  onButtonPress,
  onPrivacyPolicyPress,
}: RegisterStepScreenProps & { onPrivacyPolicyPress?: () => void }) {
  const router = useRouter();
  const inputRef = React.useRef<TextInput>(null);

  // Memoizar el inputComponent para evitar rerenders inconsistentes
  const memoizedInputComponent = useMemo(
    () => inputComponent,
    [inputComponent],
  );

  // Función de navegación directa sin efectos colaterales en los hooks
  const goNext = useMemo(
    () => () => {
      if (typeof onButtonPress === "function") {
        onButtonPress();
      } else {
        router.push(nextRoute as any);
      }
    },
    [onButtonPress, nextRoute, router],
  );

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
          {/* Barra Superior de Progreso */}
          <View style={styles.topBar}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <CustomText type="body_interactive">Volver</CustomText>
            </Pressable>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <CustomText type="body_secondary">{stepLabel}</CustomText>
          </View>

          {/* Área de Preguntas e Instrucciones */}
          <View style={styles.questionArea}>
            <CustomText type="h1">{title}</CustomText>
            {helperText ? (
              <CustomText type="body_secondary">{helperText}</CustomText>
            ) : null}
          </View>

          {/* Área Dinámica de Inputs */}
          <View style={styles.inputArea}>
            {memoizedInputComponent}

            {memoizedInputComponent === undefined && (
              <CustomFormInput
                ref={inputRef}
                onSubmitEditing={goNext}
                returnKeyType="next"
                submitBehavior="submit"
                {...inputProps}
              />
            )}
          </View>

          {/* Botón de Acción Principal */}
          <View style={styles.actions}>
            <CustomButton type="primary" onPress={goNext}>
              {buttonLabel}
            </CustomButton>
          </View>

          {/* Textos Legales Inferiores */}
          <CustomText
            type="body"
            style={{ textAlign: "center", marginTop: 20 }}
          >
            Al crear una cuenta, acepta nuestra{" "}
            <CustomText type="body_interactive" onPress={onPrivacyPolicyPress}>
              Política de Privacidad
            </CustomText>{" "}
            y los{" "}
            <CustomText type="body_interactive" onPress={onPrivacyPolicyPress}>
              Términos de Servicio.
            </CustomText>
          </CustomText>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
