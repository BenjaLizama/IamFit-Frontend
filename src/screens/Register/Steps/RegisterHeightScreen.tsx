import { useRegisterForm } from "@/src/core/context/RegisterContext";
import InputSelector from "@/src/features/register/components/InputSelector";
import React from "react";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_HEIGHT = 170;

const HEIGHT_OPTIONS = Array.from({ length: 201 }, (_, index) => {
  const height = index + 30;
  return { label: `${height}cm`, value: String(height) };
});

export default function RegisterHeightScreen() {
  const { formData, updateData } = useRegisterForm();

  const handleHeightChange = (val: string) => {
    updateData({ height: Number(val) });
  };

  const currentHeightValue =
    formData.height !== undefined
      ? String(formData.height)
      : String(INITIAL_HEIGHT);

  return (
    <RegisterStepScreen
      nextRoute="/register/weight"
      progress={25}
      stepLabel="Paso 2 de 8"
      title={"Selecciona tu\nestatura"}
      disabled={false}
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={handleHeightChange}
          options={HEIGHT_OPTIONS}
          value={currentHeightValue}
        />
      }
    />
  );
}
