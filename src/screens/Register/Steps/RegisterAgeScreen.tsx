import { useRegisterForm } from "@/src/core/context/RegisterContext";
import InputSelector from "@/src/features/register/components/InputSelector";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_AGE = 18;

const AGE_OPTIONS = Array.from({ length: 83 }, (_, index) => {
  const age = index + 18;
  return { label: `${age}`, value: String(age) };
});

export default function RegisterAgeScreen() {
  const { formData, updateData } = useRegisterForm();
  const handleAgeChange = (val: string) => {
    updateData({ age: Number(val) });
  };

  const currentAgeValue =
    formData.age !== undefined ? String(formData.age) : String(INITIAL_AGE);

  return (
    <RegisterStepScreen
      nextRoute="/register/height"
      progress={12.5}
      stepLabel="Paso 1 de 8"
      title={"Selecciona tu\nedad"}
      disabled={false}
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={handleAgeChange}
          options={AGE_OPTIONS}
          value={currentAgeValue}
        />
      }
    />
  );
}
