import { useField } from "@/src/core/hooks/useField";
import {
  isValidEmail,
  isValidPasswordSoft,
} from "@/src/core/utils/validations";
import { login } from "@/src/services/auth/auth.service";
import { ErrorResponse } from "@/src/services/errors.dto";
import { clearStoredMiaMessages } from "@/src/services/mia";
import { getDeviceSession } from "@/src/services/session/device.storage";
import { clearTokens, saveTokens } from "@/src/services/session/token.storage";
import { clearNickname } from "@/src/services/session/user.storage";
import { loadUserInfo } from "@/src/services/user-profile/user-profile.service";
import { Href, router } from "expo-router";
import { useRef, useState } from "react";

export const useLoginScreen = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const isLoggingInRef = useRef(false);
  const goToRegister = () => router.push("/register/age");
  const goToForgotPassword = () => router.push("/forgot-password" as Href);

  const handleLogin = async () => {
    if (isLoggingInRef.current) return;

    isLoggingInRef.current = true;
    setLoading(true);
    setError("");

    try {
      await clearTokens();
      const session = await getDeviceSession();
      const response = await login({
        login: {
          identifier: email.inputProps.value.trim().toLowerCase(),
          password: password.inputProps.value,
          provider: "LOCAL",
        },
        session,
      });

      await clearNickname();
      clearStoredMiaMessages();

      await loadUserInfo(response.accessToken);

      await saveTokens(response.accessToken, response.refreshToken);

      console.log("Tokens guardados con éxito. Redirigiendo...");

      router.replace("/(main)/home");
    } catch (loginError: any) {
      const finalError = loginError as ErrorResponse;

      console.log("No se pudo iniciar sesión", loginError);
      setError(finalError.message);
    } finally {
      isLoggingInRef.current = false;
      setLoading(false);
      return;
    }
  };

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

  const buttonDisabled =
    !email.inputProps.value ||
    !password.inputProps.value ||
    checkEmailError(email.inputProps.value) !== "" ||
    checkPasswordError(password.inputProps.value) !== "" ||
    loading;

  return {
    handleLogin,
    goToRegister,
    goToForgotPassword,
    email,
    password,
    loading,
    buttonDisabled,
    error,
  };
};
