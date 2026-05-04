import { useBottomSheet } from "@/src/core/components/BottomSheet/useBottomSheet";
import CustomButton from "@/src/core/components/CustomButton";
import CustomFormInput from "@/src/core/components/CustomFormInput";
import CustomText from "@/src/core/components/CustomText";
import IamfitIcon from "@/src/core/components/IamfitIcon";
import Wrapper from "@/src/core/components/Wrapper";
import AuthFormTemplate from "@/src/core/templates/AuthForm/AuthFormTemplate";
import { useRouter } from "expo-router";
import React from "react";
import { TextInput, View } from "react-native";
import { LoginScreenStyles as styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const { sheetRef, openSheet } = useBottomSheet();
  const router = useRouter();
  const passwordInputRef = React.useRef<TextInput>(null);

  return (
    <Wrapper>
      <AuthFormTemplate
        section1={
          <View style={styles.first}>
            <IamfitIcon size={90} />
            <CustomText type="h1">Accede a tu{"\n"}cuenta</CustomText>
          </View>
        }
        section2={
          <View style={styles.second}>
            <CustomFormInput
              keyboardType="email-address"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              placeholder="Correo electrónico"
              returnKeyType="next"
              submitBehavior="submit"
              error=""
            />
            <CustomFormInput
              ref={passwordInputRef}
              placeholder="Contraseña"
              returnKeyType="done"
              secureTextEntry
              submitBehavior="blurAndSubmit"
            />
          </View>
        }
        section3={
          <View style={styles.last}>
            <View style={styles.last_first}>
              <CustomButton
                type="primary"
                onPress={() => router.push("/(main)/home")}
              >
                Acceder ahora
              </CustomButton>
              <CustomText type="body">Olvide mi contraseña</CustomText>
            </View>
            <CustomText type="body">
              ¿No tienes una cuenta?
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
