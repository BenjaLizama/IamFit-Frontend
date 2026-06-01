import { useRegisterForm } from "@/src/core/context/RegisterContext";
import React from "react";
import InputSelector from "../../../features/register/components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_AGE = "18";
const AGE_OPTIONS = Array.from({ length: 83 }, (_, index) => {
  const age = index + 18;
  return { label: `${age}`, value: String(age) };
});

export default function RegisterAgeScreen() {
  const { formData, updateData } = useRegisterForm();

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={(val) => updateData({ age: val })}
          options={AGE_OPTIONS}
          value={formData.age || INITIAL_AGE}
        />
      }
      nextRoute="/register/height"
      progress={12.5}
      stepLabel="Paso 1 de 8"
      title={"Selecciona tu\nedad"}
    />
  );
}
