import { useRegisterForm } from "@/src/core/context/RegisterContext";
import React from "react";
import InputSelector from "../../../features/register/components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_WEIGHT = "75";
const WEIGHT_OPTIONS = Array.from({ length: 111 }, (_, index) => {
  const weight = index + 40;
  return { label: `${weight}kg`, value: String(weight) };
});

export default function RegisterWeightScreen() {
  const { formData, updateData } = useRegisterForm();

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={(val) => updateData({ weight: val })}
          options={WEIGHT_OPTIONS}
          value={formData.weight || INITIAL_WEIGHT}
        />
      }
      nextRoute="/register/sex"
      progress={37.5}
      stepLabel="Paso 3 de 8"
      title={"Selecciona tu\npeso"}
    />
  );
}
