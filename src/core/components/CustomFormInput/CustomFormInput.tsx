import { COLOR } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
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
    const shouldShowPasswordToggle = Boolean(
      showPasswordToggle || secureTextEntry,
    );
    const isSecureTextEntry = Boolean(secureTextEntry && !isPasswordVisible);

    // 1. Creamos nuestra propia referencia interna
    const internalRef = useRef<TextInput>(null);

    // 2. Combinamos tu ref externa con la interna
    const handleRef = (instance: TextInput | null) => {
      internalRef.current = instance as TextInput;
      if (typeof ref === "function") {
        ref(instance);
      } else if (ref) {
        (ref as React.MutableRefObject<TextInput | null>).current = instance;
      }
    };

    // 3. La función maestra para el toggle
    const togglePasswordVisibility = () => {
      setIsPasswordVisible((currentValue) => !currentValue);

      // 🔥 EL FIX PARA EL BUG NATIVO DE iOS 🔥
      // Inyectamos el texto de nuevo directamente en el puente nativo
      // después de que React re-renderiza, para cancelar el borrado de iOS.
      if (Platform.OS === "ios" && textInputProps.value !== undefined) {
        setTimeout(() => {
          internalRef.current?.setNativeProps({ text: textInputProps.value });
        }, 10);
      }
    };

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
            ref={handleRef} // <-- Usamos la ref combinada
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={isSecureTextEntry}
            // Mantenemos esta protección extra para el teclado
            autoCorrect={secureTextEntry ? false : textInputProps.autoCorrect}
            autoCapitalize={
              secureTextEntry ? "none" : textInputProps.autoCapitalize
            }
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
              onPress={togglePasswordVisibility} // <-- Llamamos a nuestra función
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
