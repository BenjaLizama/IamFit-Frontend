import { COLOR, FONT, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageInputTextStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    borderRadius: UI.large_radius,
  },

  inputContainer: {
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  input: {
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontFamily: FONT.PRINCIPAL_REGULAR,
    color: COLOR.TEXTO_BOTON_PRIMARIO,
  },
});
