import { hp } from "@/src/core/utils";
import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MainTabIconStyles = StyleSheet.create({
  container: {
    position: "relative",
    height: hp(48),
    width: hp(48),
    backgroundColor: COLOR.BLANCO_TRANSPARENTE,
    borderRadius: hp(90),
    justifyContent: "center",
    alignItems: "center",
  },

  selected: {
    position: "absolute",
    height: hp(3),
    width: hp(3),
    borderRadius: hp(100),
    backgroundColor: COLOR.FONDO,
    bottom: hp(5),
  },

  big: {
    height: hp(70),
    width: hp(70),
    backgroundColor: COLOR.BOTON_TAB_NAVEGACION_BIG,
    borderRadius: hp(35),
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 5,
    elevation: 5,
  },
});
