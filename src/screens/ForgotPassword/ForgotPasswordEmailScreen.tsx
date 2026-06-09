import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ForgotPasswordStyles as styles } from "./ForgotPassword.styles";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordEmailScreen() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const normalizedEmail = email.trim().toLowerCase();
  const isValid = EMAIL_REGEX.test(normalizedEmail);

  const handleConfirm = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: call backend endpoint to request password reset OTP.
      router.push(
        `/forgot-password/otp?email=${encodeURIComponent(normalizedEmail)}` as Href,
      );
    } catch {
      setError("No encontramos una cuenta con ese correo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <IamfitIcon />
            <CustomText type="h1">Recuperar mi{"\n"}contrasena</CustomText>
            <CustomText type="body" style={styles.description}>
              Ingresa tu correo para enviarte un codigo de recuperacion.
            </CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              placeholder="Correo electronico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleConfirm}
            />
            {error ? (
              <CustomText type="body" style={styles.errorText}>
                {error}
              </CustomText>
            ) : null}
          </View>
        }
        section3={
          <View style={styles.last}>
            <CustomButton
              type="primary"
              onPress={handleConfirm}
              disabled={!isValid}
              isLoading={isLoading}
            >
              Enviar codigo
            </CustomButton>
            <CustomText
              type="body_interactive"
              onPress={() => router.back()}
            >
              Volver
            </CustomText>
          </View>
        }
      />
    </Wrapper>
  );
}
