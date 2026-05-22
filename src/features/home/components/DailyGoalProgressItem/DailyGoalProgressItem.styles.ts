import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DailyGoalProgressItemPropsStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO_OPACO,
    paddingHorizontal: UI.LATERAL_PADDING,
    paddingVertical: 8,
    gap: 5,
    width: "48%",
    height: 90,
    justifyContent: "center",
    borderRadius: UI.meddium_radius,
  },
});
