import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DailyGoalItemStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 115,
    height: 115,
    paddingHorizontal: 10,
    borderRadius: UI.large_radius,
    backgroundColor: COLOR.FONDO_OPACO,
  },
});
