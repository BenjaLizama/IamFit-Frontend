import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DayCalendarCardStyles = StyleSheet.create({
  container: {
    height: 104,
    width: 84,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#00000016",
  },

  selected: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
  },

  text: {
    color: COLOR.FONDO,
  },
});
