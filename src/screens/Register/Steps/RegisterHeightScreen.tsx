import { useRegisterForm } from "@/src/core/context/RegisterContext";
import React from "react";
import InputSelector from "../../../features/register/components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_HEIGHT = "170";
const HEIGHT_OPTIONS = Array.from({ length: 201 }, (_, index) => {
  const height = index + 30;
  return { label: `${height}cm`, value: String(height) };
});

export default function RegisterHeightScreen() {
  const { formData, updateData } = useRegisterForm();

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={(val) => updateData({ height: val })}
          options={HEIGHT_OPTIONS}
          value={formData.height || INITIAL_HEIGHT}
        />
      }
      nextRoute="/register/weight"
      progress={25}
      stepLabel="Paso 2 de 8"
      title={"Selecciona tu\nestatura"}
    />
  );
}
