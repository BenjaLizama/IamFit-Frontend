import RegisterStepScreen from "./RegisterStepScreen";

export default function RegisterPasswordScreen() {
  return (
    <RegisterStepScreen
      buttonLabel="Crear cuenta"
      inputProps={{
        placeholder: "Contraseña",
        returnKeyType: "done",
        secureTextEntry: true,
      }}
      nextRoute="/register/result"
      progress={87.5}
      stepLabel="Paso 7 de 8"
      title={"Crea una\ncontraseña"}
    />
  );
}
