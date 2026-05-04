import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MainTabIconStyles = StyleSheet.create({
  container: {
    position: "relative",
    height: 40,
    width: 40,
    backgroundColor: COLOR.BLANCO_TRANSPARENTE,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    position: "absolute",
    height: 3,
    width: 3,
    borderRadius: 100,
    backgroundColor: COLOR.FONDO,
    bottom: 5,
  },

  big: {
    height: 64,
    width: 64,
    backgroundColor: COLOR.BOTON_TAB_NAVEGACION_BIG,
    top: -6,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 5,
        color: "#0000003a",
      },
    ],
  },
});
