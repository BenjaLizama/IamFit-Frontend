import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import React from "react";
import { View } from "react-native";
import { LoginScreenStyles as styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const router = useRouter();
  const passwordInputRef = React.useRef<TextInput>(null);
  const emailValueRef = React.useRef("");
  const passwordValueRef = React.useRef("");
  const isLoggingInRef = React.useRef(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const handleLogin = async () => {
    if (isLoggingInRef.current) return;

    const email = emailValueRef.current.trim();
    const password = passwordValueRef.current;

    if (!email || !password) {
      console.warn("Ingresa tu correo y contraseña");
      return;
    }

    isLoggingInRef.current = true;
    setIsLoggingIn(true);

    try {
      await clearTokens();
      const session = await getDeviceSession();
      const response = await login({
        login: {
          identifier: email,
          password,
          provider: "LOCAL",
        },
        session,
      });

      await clearNickname();
      clearStoredMiaMessages();

      await loadUserInfo(response.accessToken);

      await saveTokens(response.accessToken, response.refreshToken);

      console.log("Tokens guardados con éxito. Redirigiendo...");

      router.replace("/(main)/home");
    } catch (loginError) {
      console.error("No se pudo iniciar sesión", loginError);
    } finally {
      isLoggingInRef.current = false;
      setIsLoggingIn(false);
    }
  };

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <IamfitIcon />
            <CustomText type="h1">Accede a tu{"\n"}cuenta</CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              ref={email.inputProps.ref}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={email.inputProps.onChangeText}
              onSubmitEditing={() => password.ref.current?.focus()}
              placeholder="Correo electrónico"
              returnKeyType="next"
              submitBehavior="submit"
              error={email.errorMessage}
            />
            <CustomFormInput
              ref={passwordInputRef}
              onChangeText={(value) => {
                passwordValueRef.current = value;
              }}
              onSubmitEditing={handleLogin}
              placeholder="Contraseña"
              returnKeyType="done"
              secureTextEntry
              submitBehavior="blurAndSubmit"
              error={password.errorMessage}
            />
          </View>
        }
        section3={
          <View style={styles.last}>
            <View style={styles.last_first}>
              <CustomButton
                disabled={isLoggingIn}
                isLoading={isLoggingIn}
                onPress={handleLogin}
                type="primary"
              >
                Acceder ahora
              </CustomButton>
              <CustomText
                onPress={() => router.push("/forgot-password" as Href)}
                type="body_interactive"
              >
                Olvidé mi contraseña
              </CustomText>
            </View>
            <CustomText type="body">
              ¿No tienes una cuenta?
              <CustomText onPress={goToRegister} type="body_interactive">
                {" "}
                Registrate ahora
              </CustomText>
            </CustomText>
          </View>
        }
      />
    </Wrapper>
  );
}
