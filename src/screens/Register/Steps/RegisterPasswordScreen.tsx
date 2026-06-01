import CustomFormInput from "@/src/core/components/CustomFormInput"; // Importamos tu input
import { useRegisterForm } from "@/src/core/context/RegisterContext";
import { useRegisterInput } from "@/src/core/hooks/useRegisterInput";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterPasswordScreen() {
  const { value, onChangeText, handleContinue } = useRegisterInput(
    "password",
    "/register/result",
  );

  const { formData } = useRegisterForm();

  const handleFinalSubmit = () => {
    console.log("🚀 Enviando datos a la API:", formData);
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
      /* 🎯 INYECTAMOS EL COMPONENTE COMPLETO DESDE AQUÍ */
      inputComponent={
        <CustomFormInput
          placeholder="Contraseña"
          returnKeyType="done"
          secureTextEntry={true}
          value={value}
          onChangeText={onChangeText}
        />
      }
    />
  );
}
