import { hp, wp } from "@/src/core/utils";
import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const CustomFormInputStyles = StyleSheet.create({
  container: {
    width: wp(340),
    gap: wp(6),
  },

  inputContainer: {
    height: hp(64),
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.button_radius,
    paddingHorizontal: wp(16),
    gap: wp(10),
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
    fontSize: hp(18),
    color: COLOR.TEXTO_PRINCIPAL,
  },

  iconWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  passwordToggle: {
    width: wp(28),
    height: hp(28),
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    fontFamily: FONT.PRINCIPAL_REGULAR,
    fontSize: hp(13),
    color: "#D92D20",
  },

  errorTextHidden: {
    color: COLOR.SIN_COLOR,
  },
});
