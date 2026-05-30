import { hp } from "@/src/core/utils";
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
    fontSize: hp(32),
    lineHeight: hp(38),
    textAlign: "center",
    color: COLOR.TEXTO_PRINCIPAL,
  },

  h2: {
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: hp(24),
    color: COLOR.TEXTO_PRINCIPAL,
  },

  button_primary: {
    ...Platform.select({
      android: { marginBottom: 0 },
      ios: { marginBottom: 2 },
    }),
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: hp(16),
    color: COLOR.FONDO,
  },
  button_secondary: {
    ...Platform.select({
      android: { marginBottom: 0 },
      ios: { marginBottom: 2 },
    }),
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: hp(16),
    color: COLOR.TEXTO_PRINCIPAL,
  },
  button_destructive: {
    ...Platform.select({
      android: { marginBottom: 0 },
      ios: { marginBottom: 2 },
    }),
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: hp(16),
    color: COLOR.FONDO,
  },
  button_extra: {
    ...Platform.select({
      android: { marginBottom: 0 },
      ios: { marginBottom: 2 },
    }),
    fontFamily: FONT.PRINCIPAL_BOLD,
    fontSize: hp(14),
    color: COLOR.AZUL_PRIMARIO,
  },
});
