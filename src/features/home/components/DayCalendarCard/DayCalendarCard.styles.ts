import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const DayCalendarCardStyles = StyleSheet.create({
  container: {
    height: hp(84),
    width: wp(64),
    borderRadius: UI.meddium_radius,
    justifyContent: "center",
    alignItems: "center",
    gap: wp(2),
    backgroundColor: COLOR.FONDO_OPACO,
  },

  selected: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
  },

  text: {
    color: COLOR.FONDO,
  },
});
