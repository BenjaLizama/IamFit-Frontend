import { useState } from "react";
import InputSelector from "../../../features/register/components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_SEX = "MALE";

const SEX_OPTIONS = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
];

export default function RegisterSexScreen() {
  const [selectedSex, setSelectedSex] = useState(INITIAL_SEX);

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={setSelectedSex}
          options={SEX_OPTIONS}
          value={selectedSex}
        />
      }
      nextRoute="/register/nickname"
      progress={50}
      stepLabel="Paso 4 de 8"
      title={"Selecciona tu\nsexo"}
    />
  );
}
