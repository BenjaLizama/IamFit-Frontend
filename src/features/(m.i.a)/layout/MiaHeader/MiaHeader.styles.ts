import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MiaHeaderStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
    width: "100%",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    gap: UI.spacing.md,
    paddingHorizontal: UI.padding_left,
  },

  iaLogoContainer: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: UI.small_radius,
    backgroundColor: COLOR.FONDO_OPACO2,
  },

  textContainer: {
    flexDirection: "column",
  },

  miaText: {
    flexDirection: "row",
  },
});
