import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const INPUT_SELECTOR_OPTION_HEIGHT = hp(60);

export const InputSelectorStyles = StyleSheet.create({
  accessibilityWrapper: {
    height: hp(250),
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  container: {
    width: "100%",
    overflow: "hidden",
    borderRadius: UI.small_radius,
  },

  option: {
    height: INPUT_SELECTOR_OPTION_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(20),
  },

  optionDisabled: {
    opacity: 0.3,
  },

  label: {
    fontSize: hp(48),
    color: COLOR.AZUL_PRIMARIO,
    textAlign: "center",
  },

  labelSelected: {
    fontWeight: "bold",
    fontSize: hp(48),
    color: COLOR.AZUL_PRIMARIO,
  },

  labelNeighbor: {
    fontSize: hp(16),
    color: COLOR.AZUL_SECUNDARIO,
    opacity: 0.7,
  },

  labelHidden: {
    opacity: 0,
  },

  helperText: {
    fontSize: hp(12),
    color: "#666",
    marginTop: hp(2),
  },
});
