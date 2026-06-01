import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { login } from "@/src/services/auth/auth.service";
import { useRouter } from "expo-router";
import React from "react";
import { TextInput, View } from "react-native";
import { LoginScreenStyles as styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const router = useRouter();
  const passwordInputRef = React.useRef<TextInput>(null);
  const emailValueRef = React.useRef("");
  const passwordValueRef = React.useRef("");

  const handleLogin = async () => {
    const email = emailValueRef.current.trim();
    const password = passwordValueRef.current;

    if (!email || !password) {
      console.warn("Ingresa tu correo y contrasena");
      return;
    }

    try {
      await login({
        login: {
          identifier: email,
          password,
          provider: "LOCAL",
        },
        session: {
          deviceId: "iamfit-mobile-device",
          deviceName: "Mobile Device",
        },
      });

      router.replace("/(main)/home");
    } catch (loginError) {
      console.error("No se pudo iniciar sesion", loginError);
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
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(value) => {
                emailValueRef.current = value;
              }}
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              placeholder="Correo electronico"
              returnKeyType="next"
              submitBehavior="submit"
            />
            <CustomFormInput
              ref={passwordInputRef}
              onChangeText={(value) => {
                passwordValueRef.current = value;
              }}
              onSubmitEditing={handleLogin}
              placeholder="Contrasena"
              returnKeyType="done"
              secureTextEntry
              submitBehavior="blurAndSubmit"
            />
          </View>
        }
        section3={
          <View style={styles.last}>
            <View style={styles.last_first}>
              <CustomButton onPress={handleLogin} type="primary">
                Acceder ahora
              </CustomButton>
              <CustomText type="body">Olvide mi contrasena</CustomText>
            </View>
            <CustomText type="body">
              No tienes una cuenta?
              <CustomText
                onPress={() => router.push("/register/age")}
                type="body_interactive"
              >
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
