import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { CustomFormInputStyles as styles } from "./CustomFormInput.styles";
import { CustomFormInputProps } from "./CustomFormInput.types";

export default function CustomFormInput({
  error,
  leftIcon,
  rightIcon,
  showPasswordToggle,
  secureTextEntry,
  editable = true,
  placeholder = "Correo electronico",
  placeholderTextColor = COLOR.TEXTO_SECUNDARIO,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  errorStyle,
  ...textInputProps
}: CustomFormInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const hasError = Boolean(error);
  const shouldShowPasswordToggle = Boolean(showPasswordToggle || secureTextEntry);
  const isSecureTextEntry = Boolean(secureTextEntry && !isPasswordVisible);

  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={[
          styles.inputContainer,
          hasError && styles.inputContainerError,
          !editable && styles.inputContainerDisabled,
          inputContainerStyle,
        ]}
      >
        {leftIcon ? <View style={styles.iconWrapper}>{leftIcon}</View> : null}

        <TextInput
          {...textInputProps}
          editable={editable}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={isSecureTextEntry}
          style={[styles.textInput, inputStyle]}
        />

        {shouldShowPasswordToggle ? (
          <Pressable
            accessibilityLabel={
              isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            accessibilityRole="button"
            disabled={!editable}
            hitSlop={8}
            onPress={() => setIsPasswordVisible((currentValue) => !currentValue)}
            style={styles.passwordToggle}
          >
            <Ionicons
              color={hasError ? "#D92D20" : COLOR.TEXTO_SECUNDARIO}
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
            />
          </Pressable>
        ) : rightIcon ? (
          <View style={styles.iconWrapper}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? <Text style={[styles.errorText, errorStyle]}>{error}</Text> : null}
    </View>
  );
}
