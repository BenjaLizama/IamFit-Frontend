import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const INPUT_SELECTOR_OPTION_HEIGHT = 60;

export const InputSelectorStyles = StyleSheet.create({
  accessibilityWrapper: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  container: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },

  option: {
    height: INPUT_SELECTOR_OPTION_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  optionDisabled: {
    opacity: 0.3,
  },

  label: {
    fontSize: 48,
    color: COLOR.AZUL_PRIMARIO,
    textAlign: "center",
  },

  labelSelected: {
    fontWeight: "bold",
    fontSize: 48,
    color: COLOR.AZUL_PRIMARIO,
  },

  labelNeighbor: {
    fontSize: 16,
    color: COLOR.AZUL_SECUNDARIO,
    opacity: 0.7,
  },

  labelHidden: {
    opacity: 0,
  },

  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
});
