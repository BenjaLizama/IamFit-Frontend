import { useRegisterForm } from "@/src/core/context/RegisterContext";
import InputSelector from "@/src/features/register/components/InputSelector";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_WEIGHT = 75;

const WEIGHT_OPTIONS = Array.from({ length: 111 }, (_, index) => {
  const weight = index + 40;
  return { label: `${weight}kg`, value: String(weight) };
});

export default function RegisterWeightScreen() {
  const { formData, updateData } = useRegisterForm();

  const handleWeightChange = (val: string) => {
    updateData({ weight: Number(val) });
  };

  const currentWeightValue =
    formData.weight !== undefined
      ? String(formData.weight)
      : String(INITIAL_WEIGHT);

  return (
    <RegisterStepScreen
      nextRoute="/register/sex"
      progress={37.5}
      stepLabel="Paso 3 de 8"
      title={"Selecciona tu\npeso"}
      disabled={false}
      inputComponent={
        <InputSelector
          key={currentWeightValue}
          maxVisibleOptions={3}
          onChange={handleWeightChange}
          options={WEIGHT_OPTIONS}
          value={currentWeightValue}
        />
      }
    />
  );
}
