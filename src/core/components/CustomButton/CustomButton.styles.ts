import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const CustomButtonStyles = StyleSheet.create({
  button_common: {
    height: 58,
    minWidth: 180,
    width: 280,
    boxSizing: "border-box",
    paddingTop: UI.padding_top,
    paddingBottom: UI.padding_bottom,
    paddingLeft: UI.padding_left,
    paddingRight: UI.padding_right,
    borderRadius: UI.button_radius,
    justifyContent: "center",
    alignItems: "center",
  },

  primary: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
  },
  secondary: {
    backgroundColor: COLOR.SIN_COLOR,
    borderRadius: UI.button_radius,
    borderColor: COLOR.TEXTO_PRINCIPAL,
    borderWidth: 2,
  },
  destructive: {
    backgroundColor: COLOR.TEXTO_PRINCIPAL,
  },

  loading_primary: { backgroundColor: COLOR.AZUL_PRIMARIO },
  loading_secondary: { backgroundColor: COLOR.SIN_COLOR },
  loading_destructive: { backgroundColor: COLOR.TEXTO_PRINCIPAL },

  disabled: { opacity: 0.8 },
});
