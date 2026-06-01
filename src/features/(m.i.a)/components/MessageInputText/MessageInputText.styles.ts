import { hp, wp } from "@/src/core/utils";
import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageInputTextStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: wp(10),
    borderRadius: UI.large_radius,
  },

  inputContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp(5),
  },

  input: {
    width: "80%",
    paddingHorizontal: wp(15),
    paddingVertical: hp(8),
    fontFamily: FONT.PRINCIPAL_REGULAR,
    color: COLOR.TEXTO_BOTON_PRIMARIO,
  },

  hiddenContent: {
    position: "absolute",
    backgroundColor: COLOR.FONDO,
    width: "200%",
    height: hp(50),
    bottom: hp(-20),
    zIndex: -1,
  },
});
