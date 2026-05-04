import { useState } from "react";
import InputSelector from "../components/InputSelector";
import RegisterStepScreen from "./RegisterStepScreen";

const INITIAL_HEIGHT = "170";

const HEIGHT_OPTIONS = Array.from({ length: 201 }, (_, index) => {
  const height = index + 30;

  return {
    label: `${height}cm`,
    value: String(height),
  };
});

export default function RegisterHeightScreen() {
  const [selectedHeight, setSelectedHeight] = useState(INITIAL_HEIGHT);

  return (
    <RegisterStepScreen
      inputComponent={
        <InputSelector
          maxVisibleOptions={3}
          onChange={setSelectedHeight}
          options={HEIGHT_OPTIONS}
          value={selectedHeight}
        />
      }
      nextRoute="/register/weight"
      progress={25}
      stepLabel="Paso 2 de 8"
      title={"Selecciona tu\nestatura"}
    />
  );
}
