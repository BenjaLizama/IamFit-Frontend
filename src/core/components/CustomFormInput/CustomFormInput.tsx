import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { CustomFormInputStyles as styles } from "./CustomFormInput.styles";
import { CustomFormInputProps } from "./CustomFormInput.types";

const CustomFormInput = React.forwardRef<TextInput, CustomFormInputProps>(
  (
    {
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
    },
    ref,
  ) => {
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
          ref={ref}
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

      <Text
        style={[
          styles.errorText,
          !hasError && styles.errorTextHidden,
          errorStyle,
        ]}
      >
        {error || "\u00A0"}
      </Text>
    </View>
  );
  },
);

CustomFormInput.displayName = "CustomFormInput";

export default CustomFormInput;
