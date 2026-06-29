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
  const {
    handleLogin,
    goToRegister,
    goToForgotPassword,
    email,
    password,
    loading,
    buttonDisabled,
    error,
  } = useLoginScreen();

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
              placeholder="Correo electronico"
              returnKeyType="next"
              submitBehavior="submit"
              value={email.inputProps.value}
              error={email.errorMessage}
            />
            <CustomFormInput
              ref={password.inputProps.ref}
              onChangeText={password.inputProps.onChangeText}
              onSubmitEditing={handleLogin}
              placeholder="Contrasena"
              returnKeyType="done"
              secureTextEntry
              submitBehavior="blurAndSubmit"
              value={password.inputProps.value}
              error={password.errorMessage || error}
            />
          </View>
        }
        section3={
          <View style={styles.last}>
            <View style={styles.last_first}>
              <CustomButton
                disabled={buttonDisabled}
                isLoading={loading}
                onPress={handleLogin}
                type="primary"
              >
                Acceder ahora
              </CustomButton>
              <CustomText
                onPress={goToForgotPassword}
                type="body_interactive"
              >
                Olvide mi contrasena
              </CustomText>
            </View>
            <CustomText type="body">
              No tienes una cuenta?
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
