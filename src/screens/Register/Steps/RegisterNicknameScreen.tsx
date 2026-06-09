import { useRegisterInput } from "@/src/core/hooks/useRegisterInput";
import { isValidNickname } from "@/src/core/utils/validations";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterNicknameScreen() {
  const { value, onChangeText, handleContinue } = useRegisterInput(
    "nickname",
    "/register/email",
  );

  const error =
    value.length > 0 && !isValidNickname(value)
      ? "El apodo debe contener al menos 3 caracteres."
      : "";

  return (
    <RegisterStepScreen
      inputProps={{
        autoCapitalize: "words",
        placeholder: "Apodo",
        value: value,
        onChangeText: onChangeText,
      }}
      onButtonPress={() => handleContinue()}
      nextRoute="/register/email"
      progress={62.5}
      stepLabel="Paso 5 de 8"
      title={"Selecciona tu\napodo"}
      disabled={!isValidNickname(value)}
      error={error}
    />
  );
}
