import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import React from "react";
import { View } from "react-native";
import { LoginScreenStyles as styles } from "./LoginScreen.styles";
import { useLoginScreen } from "./useLoginScreen";

export default function LoginScreen() {
  const { handleLogin, goToRegister, email, password } = useLoginScreen();

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
              ref={password.inputProps.ref}
              onChangeText={password.inputProps.onChangeText}
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
              <CustomButton onPress={handleLogin} type="primary">
                Acceder ahora
              </CustomButton>
              <CustomText
                type="body"
                style={{ textDecorationLine: "underline" }}
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
