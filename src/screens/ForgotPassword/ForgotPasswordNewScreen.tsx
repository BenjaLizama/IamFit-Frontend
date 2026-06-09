import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { resetPassword } from "@/src/services/auth/auth.service";
import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ForgotPasswordStyles as styles } from "./ForgotPassword.styles";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

interface Props {
  email: string;
  resetToken: string;
}

export default function ForgotPasswordNewScreen({ email, resetToken }: Props) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isConfirmValid =
    password === confirmPassword && confirmPassword.length > 0;
  const isValid = isPasswordValid && isConfirmValid;

  const validationError = React.useMemo(() => {
    if (password.length > 0 && !isPasswordValid) {
      return "Mínimo 8 caracteres, mayúscula, minuscula, nuúmero y carácter especial.";
    }

    if (confirmPassword.length > 0 && !isConfirmValid) {
      return "Las contraseñas no coinciden.";
    }

    return null;
  }, [
    confirmPassword.length,
    isConfirmValid,
    isPasswordValid,
    password.length,
  ]);

  const handleConfirm = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      void email;
      await resetPassword({ resetToken, newPassword: password });
      router.push("/forgot-password/success" as Href);
    } catch (resetError: any) {
      setError(
        resetError?.message ??
          "No se pudo actualizar la contraseña. Intenta nuevamente.",
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
            <CustomText type="h1">Nueva{"\n"}contraseña</CustomText>
            <CustomText type="body" style={styles.description}>
              Crea una contraseña segura para volver a ingresar a tu cuenta.
            </CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              placeholder="Nueva contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomFormInput
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              onSubmitEditing={handleConfirm}
            />
            {error || validationError ? (
              <CustomText type="body" style={styles.errorText}>
                {error ?? validationError}
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
              Confirmar
            </CustomButton>
          </View>
        }
      />
    </Wrapper>
  );
}
