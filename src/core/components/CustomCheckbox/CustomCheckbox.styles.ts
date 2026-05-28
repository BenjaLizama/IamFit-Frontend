import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const CustomCheckboxStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: 22,
    height: 22,
    borderRadius: UI.spacing.xs,
    borderWidth: 2,
    borderColor: COLOR.AZUL_PRIMARIO,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    opacity: 0.5,
  },
});
