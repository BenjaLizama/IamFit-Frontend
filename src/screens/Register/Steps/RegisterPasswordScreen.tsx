import { useRegisterForm } from "@/src/core/context/RegisterContext";
import { useRegisterInput } from "@/src/core/hooks/useRegisterInput";
import { isValidPassword } from "@/src/core/utils/validations";
import { RegisterRequest } from "@/src/services/auth/auth.dtos";
import { register } from "@/src/services/auth/auth.service";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterPasswordScreen() {
  const { value, onChangeText, handleContinue } = useRegisterInput(
    "password",
    "/register/result",
  );

  const { formData } = useRegisterForm();

  const handleFinalSubmit = () => {
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
      },
      session: {
        deviceId: "App IamFit",
        deviceName: "App IamFit",
      },
    };

    console.log(register(data));

    console.log(
      "🚀 Enviando datos a la API:",
      `Edad: ${formData.age} | Correo: ${formData.email} | Altura: ${formData.height}cm | Apodo: ${formData.nickname}  | Contraseña: ${formData.password} | Sexo: ${formData.sex} | Peso: ${formData.weight}kg.`,
    );
    handleContinue();
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
