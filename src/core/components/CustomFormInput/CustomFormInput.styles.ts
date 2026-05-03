import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const CustomFormInputStyles = StyleSheet.create({
  container: {
    width: 340,
    gap: 6,
  },

  inputContainer: {
    height: 64,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.button_radius,
    paddingHorizontal: 16,
    gap: 10,
  },

  inputContainerError: {
    borderColor: "#D92D20",
  },

  inputContainerDisabled: {
    opacity: 0.6,
  },

  textInput: {
    flex: 1,
    height: "100%",
    padding: 0,
    fontFamily: FONT.PRINCIPAL_REGULAR,
    fontSize: 18,
    color: COLOR.TEXTO_PRINCIPAL,
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  passwordToggle: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    fontFamily: FONT.PRINCIPAL_REGULAR,
    fontSize: 13,
    color: "#D92D20",
  },

  errorTextHidden: {
    color: COLOR.SIN_COLOR,
  },
});
