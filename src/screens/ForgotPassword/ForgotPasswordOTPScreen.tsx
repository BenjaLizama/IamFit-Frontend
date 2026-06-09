import CustomButton from "@/src/core/components/CustomButton";
import CustomText from "@/src/core/components/CustomText";
import OTPInput from "@/src/core/components/OTPInput";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { verifyForgotPassword } from "@/src/services/auth/auth.service";
import { Href, router } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { ForgotPasswordStyles as styles } from "./ForgotPassword.styles";

interface Props {
  email: string;
}

export default function ForgotPasswordOTPScreen({ email }: Props) {
  const [code, setCode] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const isValid = code.length === 6;

  const handleConfirm = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await verifyForgotPassword({ email, code });
      const resetToken =
        response.resetToken ??
        (response as any).token ??
        (response as any).data?.resetToken;

      if (!resetToken) {
        throw new Error("No se recibió el token de recuperación.");
      }

      router.push(
        `/forgot-password/new-password?email=${encodeURIComponent(
          email,
        )}&resetToken=${encodeURIComponent(resetToken)}` as Href,
      );
    } catch (verifyError: any) {
      setError(
        verifyError?.message ??
          "El código ingresado no es válido. Intenta nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <CustomText type="h1">Validar{"\n"}codigo</CustomText>
            <CustomText type="body" style={styles.description}>
              Se ha enviado un código de recuperación al correo{" "}
              <Text style={styles.emailHighlight}>{email}</Text>.
            </CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <OTPInput length={6} value={code} onChange={setCode} autoFocus />
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
              Válidar codigo
            </CustomButton>
            <CustomText type="body_interactive" onPress={() => router.back()}>
              Volver
            </CustomText>
          </View>
        }
      />
    </Wrapper>
  );
}
