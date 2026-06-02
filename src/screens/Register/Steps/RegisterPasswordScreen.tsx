import { useRegisterForm } from "@/src/core/context/RegisterContext";
import { useRegisterInput } from "@/src/core/hooks/useRegisterInput";
import { isValidPassword } from "@/src/core/utils/validations";
import { RegisterRequest } from "@/src/services/auth/auth.dtos";
import { register } from "@/src/services/auth/auth.service";
import { getDeviceSession } from "@/src/services/session/device.storage";
import { saveTokens } from "@/src/services/session/token.storage";
import { saveNickname } from "@/src/services/session/user.storage";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterPasswordScreen() {
  const { value, onChangeText, handleContinue } = useRegisterInput(
    "password",
    "/register/result",
  );

  const { formData } = useRegisterForm();

  // CORREGIDO: Una sola función asíncrona limpia
  const handleFinalSubmit = async () => {
    const session = await getDeviceSession();
    const data: RegisterRequest = {
      register: {
        email: formData.email,
        password: formData.password,
      },
      UserProfile: {
        age: formData.age,
        height: formData.height,
        weight: formData.weight,
        nickname: formData.nickname,
        sex: formData.sex,
        sexo: formData.sex,
      },
      session,
    };

    console.log(
      "🚀 Enviando datos a la API:",
      `Edad: ${formData.age} | Correo: ${formData.email} | Altura: ${formData.height}cm | Apodo: ${formData.nickname} | Sexo: ${formData.sex} | Peso: ${formData.weight}kg.`,
    );

    try {
      // Esperamos la respuesta real de Spring Boot en tu Ubuntu
      const respuestaBackend = await register(data);

      // ¡AQUÍ ESTÁ TU TOKEN! 🎉
      console.log(
        "🎉 ¡Registro Exitoso! Respuesta del servidor:",
        respuestaBackend,
      );

      // Guardamos el nickname de forma temporal
      saveNickname(formData.nickname);

      console.log("Token recibido:", respuestaBackend.accessToken);
      await saveTokens(
        respuestaBackend.accessToken,
        respuestaBackend.refreshToken,
      );

      // Si todo sale bien, recién ahí avanzamos de pantalla
      handleContinue();
    } catch (error: any) {
      // Si el backend en Docker falla, el error saltará aquí y el usuario no cambiará de pantalla a ciegas
      console.error("❌ Error al registrar en el componente:", error.message);
    }
  };

  return (
    <RegisterStepScreen
      buttonLabel="Crear cuenta"
      onButtonPress={handleFinalSubmit}
      nextRoute="/register/result"
      progress={87.5}
      stepLabel="Paso 7 de 8"
      title={"Crea una\ncontraseña"}
      disabled={!isValidPassword(value)}
      inputProps={{
        placeholder: "Contraseña",
        returnKeyType: "done",
        secureTextEntry: true,
        value: value,
        onChangeText: onChangeText,
      }}
    />
  );
}
