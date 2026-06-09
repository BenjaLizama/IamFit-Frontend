import { useField } from "@/src/core/hooks/useField";
import {
  isValidEmail,
  isValidPasswordSoft,
} from "@/src/core/utils/validations";
import { router } from "expo-router";

export const useLoginScreen = () => {
  const handleLogin = () => {};
  const goToRegister = () => router.push("/register/age");
  const goToForgotPassword = () => router.push("/forgot-password");

  const checkEmailError = (text: string): string => {
    if (text.length === 0) return "";
    if (!isValidEmail(text)) return "El formato del correo no es valido.";
    return "";
  };

  const checkPasswordError = (text: string): string => {
    if (text.length === 0) return "";
    if (!isValidPasswordSoft(text))
      return "La contraseña debe contener al menos 8 caracteres.";
    return "";
  };

  const email = useField({ validate: checkEmailError });
  const password = useField({ validate: checkPasswordError });

  return {
    handleLogin,
    goToRegister,
    goToForgotPassword,
    email,
    password,
  };
};
