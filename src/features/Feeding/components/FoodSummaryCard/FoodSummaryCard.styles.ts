import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const FoodSummaryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO_OPACO,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: UI.large_radius,
    gap: 5,
  },
});
