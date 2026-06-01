import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const FilterSelectorStyles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.extra_large_radius,
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
  },

  selectedContainer: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderColor: COLOR.SIN_COLOR,
  },

  selectedText: {
    color: COLOR.FONDO,
  },
});
