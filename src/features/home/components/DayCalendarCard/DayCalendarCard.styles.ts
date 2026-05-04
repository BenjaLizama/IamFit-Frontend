import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DayCalendarCardStyles = StyleSheet.create({
  container: {
    height: 84,
    width: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    backgroundColor: COLOR.FONDO_OPACO,
  },

  selected: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
  },

  text: {
    color: COLOR.FONDO,
  },
});
