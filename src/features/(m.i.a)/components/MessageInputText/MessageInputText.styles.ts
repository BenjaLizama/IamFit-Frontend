import { hp, wp } from "@/src/core/utils";
import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageInputTextStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.large_radius,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: wp(10),
    shadowColor: COLOR.TEXTO_PRINCIPAL,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    width: "100%",
  },

  containerDisabled: {
    opacity: 0.82,
  },

  inputContainer: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: wp(8),
    justifyContent: "center",
    maxWidth: "100%",
  },

  leadingIcon: {
    alignItems: "center",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.small_radius,
    height: hp(36),
    justifyContent: "center",
    width: hp(36),
  },

  input: {
    color: COLOR.TEXTO_PRINCIPAL,
    flex: 1,
    fontFamily: FONT.PRINCIPAL_REGULAR,
    maxHeight: hp(112),
    minHeight: hp(40),
    paddingHorizontal: wp(4),
    paddingVertical: hp(8),
  },

  sendButton: {
    alignItems: "center",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.small_radius,
    height: hp(40),
    justifyContent: "center",
    width: hp(40),
  },

  sendButtonDisabled: {
    opacity: 0.42,
  },
});
