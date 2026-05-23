import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const FilterSelectorStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.extra_large_radius,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  selectedContainer: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderColor: COLOR.SIN_COLOR,
  },

  selectedText: {
    color: COLOR.FONDO,
  },
});
