import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterEmailScreen() {
  return (
    <RegisterStepScreen
      inputProps={{
        autoCapitalize: "none",
        keyboardType: "email-address",
        placeholder: "Correo electrónico",
      }}
      nextRoute="/register/password"
      progress={75}
      stepLabel="Paso 6 de 8"
      title={"Tu correo\nelectrónico"}
    />
  );
}
