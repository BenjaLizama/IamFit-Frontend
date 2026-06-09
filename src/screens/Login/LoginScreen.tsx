import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { COLOR } from "@/src/theme";
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
              placeholder="Correo electrónico"
              returnKeyType="next"
              submitBehavior="submit"
              error={email.errorMessage}
            />
            <CustomFormInput
              ref={password.inputProps.ref}
              onChangeText={password.inputProps.onChangeText}
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
              <View style={styles.error}>
                <CustomText type="body" color={COLOR.ERROR}>
                  {error || ""}
                </CustomText>
              </View>
              <CustomButton
                onPress={handleLogin}
                type="primary"
                isLoading={loading}
                disabled={buttonDisabled}
              >
                Acceder ahora
              </CustomButton>
              <CustomText onPress={goToForgotPassword} type="body_interactive">
                Olvide mi contraseña
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
