import { COLOR, UI } from "@/src/theme";
import { FONT } from "@/src/theme/fonts";
import { Platform, StyleSheet } from "react-native";

export const CustomTextStyle = StyleSheet.create({
  defaultCorrection: {
    ...Platform.select({
      android: {
        includeFontPadding: false,
        textAlignVertical: "center",
      },
      ios: {
        textAlignVertical: "center",
      },
    }),
  },

  body: {
    fontFamily: FONT.PRINCIPAL_REGULAR,
    fontSize: UI.body_size,
    color: COLOR.TEXTO_PRINCIPAL,
  },

  body_secondary: {
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: UI.body_size,
    color: COLOR.TEXTO_SECUNDARIO,
  },

  body_interactive: {
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: UI.body_size,
    color: COLOR.AZUL_PRIMARIO,
  },

  h1: {
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: 32,
    color: COLOR.TEXTO_PRINCIPAL,
  },

  h2: {
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: 24,
    color: COLOR.TEXTO_PRINCIPAL,
  },
});
