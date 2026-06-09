import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ForgotPasswordStyles as styles } from "../ForgotPassword/ForgotPassword.styles";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isNewPasswordValid = PASSWORD_REGEX.test(newPassword);
  const isValid =
    currentPassword.length >= 8 &&
    isNewPasswordValid &&
    currentPassword !== newPassword;

  const validationError = React.useMemo(() => {
    if (newPassword.length > 0 && !isNewPasswordValid) {
      return "La nueva contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y carácter especial.";
    }

    if (newPassword.length > 0 && currentPassword === newPassword) {
      return "La nueva contraseña debe ser distinta a la actual.";
    }

    return null;
  }, [currentPassword, isNewPasswordValid, newPassword]);

  const handleConfirm = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: call backend endpoint to change password with Authorization header.
      router.push("/change-password/success" as Href);
    } catch {
      setError("La contraseña actual es incorrecta.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <CustomText type="h1">Cambiar mi{"\n"}contrasena</CustomText>
            <CustomText type="body" style={styles.description}>
              Actualiza tu contraseña manteniendo tu sesion activa.
            </CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              placeholder="Contraseña actual"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
            />
            <CustomFormInput
              placeholder="Nueva contraseña"
              value={newPassword}
              onChangeText={setNewPassword}
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
            <CustomText type="body_interactive" onPress={() => router.back()}>
              Volver
            </CustomText>
          </View>
        }
      />
    </Wrapper>
  );
}
