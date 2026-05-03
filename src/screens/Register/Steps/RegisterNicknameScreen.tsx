import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterNicknameScreen() {
  return (
    <RegisterStepScreen
      inputProps={{
        autoCapitalize: "words",
        placeholder: "Apodo",
      }}
      nextRoute="/register/email"
      progress={62.5}
      stepLabel="Paso 5 de 8"
      title={"Selecciona tu\napodo"}
    />
  );
}
