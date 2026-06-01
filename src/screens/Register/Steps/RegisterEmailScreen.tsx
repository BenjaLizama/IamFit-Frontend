import { useRegisterInput } from "@/src/core/hooks/useRegisterInput";
import { isValidEmail } from "@/src/core/utils/validations";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterEmailScreen() {
  const { value, onChangeText, handleContinue } = useRegisterInput(
    "email",
    "/register/password",
  );

  return (
    <RegisterStepScreen
      inputProps={{
        autoCapitalize: "none",
        keyboardType: "email-address",
        placeholder: "Correo electrónico",
        value: value,
        onChangeText: onChangeText,
      }}
      onButtonPress={() => handleContinue()}
      nextRoute="/register/password"
      progress={75}
      stepLabel="Paso 6 de 8"
      title={"Tu correo\nelectrónico"}
      disabled={!isValidEmail(value)}
    />
  );
}
