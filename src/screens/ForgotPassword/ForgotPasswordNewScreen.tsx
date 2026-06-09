import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { Href, router } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ForgotPasswordStyles as styles } from "./ForgotPassword.styles";

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

interface Props {
  email: string;
  code: string;
}

export default function ForgotPasswordNewScreen({ email, code }: Props) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const isPasswordValid = PASSWORD_REGEX.test(password);
  const isConfirmValid = password === confirmPassword && confirmPassword.length > 0;
  const isValid = isPasswordValid && isConfirmValid;

  const validationError = React.useMemo(() => {
    if (password.length > 0 && !isPasswordValid) {
      return "Minimo 8 caracteres, mayuscula, minuscula, numero y caracter especial.";
    }

    if (confirmPassword.length > 0 && !isConfirmValid) {
      return "Las contrasenas no coinciden.";
    }

    return null;
  }, [confirmPassword.length, isConfirmValid, isPasswordValid, password.length]);

  const handleConfirm = async () => {
    if (!isValid) return;

    setIsLoading(true);
    setError(null);

    try {
      // TODO: call backend endpoint to reset password with email, code and new password.
      void email;
      void code;
      router.push("/forgot-password/success" as Href);
    } catch {
      setError("No se pudo actualizar la contrasena. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <CustomText type="h1">Nueva{"\n"}contrasena</CustomText>
            <CustomText type="body" style={styles.description}>
              Crea una contrasena segura para volver a ingresar a tu cuenta.
            </CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              placeholder="Nueva contrasena"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <CustomFormInput
              placeholder="Repite tu contrasena"
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
