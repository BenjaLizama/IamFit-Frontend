import { useRegisterForm } from "@/src/core/context/RegisterContext";
import React from "react";
import InputSelector from "../../../features/register/components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_SEX = "MALE";

const SEX_OPTIONS = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
];

export default function RegisterSexScreen() {
  const { formData, updateData } = useRegisterForm();

  const handleSexChange = (val: string) => {
    updateData({ sex: val as "MALE" | "FEMALE" });
  };

  const currentSexValue = formData.sex || INITIAL_SEX;

  return (
    <RegisterStepScreen
      nextRoute="/register/nickname"
      progress={50}
      stepLabel="Paso 4 de 8"
      title={"Selecciona tu\nsexo"}
      disabled={false}
      inputComponent={
        <InputSelector
          key={currentSexValue}
          maxVisibleOptions={2}
          onChange={handleSexChange}
          options={SEX_OPTIONS}
          value={currentSexValue}
        />
      }
    />
  );
}
