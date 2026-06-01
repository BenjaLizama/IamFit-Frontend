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

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={(val) => updateData({ sex: val })}
          options={SEX_OPTIONS}
          value={formData.sex || INITIAL_SEX}
        />
      }
      nextRoute="/register/nickname"
      progress={50}
      stepLabel="Paso 4 de 8"
      title={"Selecciona tu\nsexo"}
    />
  );
}
