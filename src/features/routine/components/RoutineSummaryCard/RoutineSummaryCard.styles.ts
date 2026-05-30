import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const RoutineSummaryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.meddium_radius,
    paddingHorizontal: UI.spacing.lg,
    paddingVertical: UI.spacing.md,
    gap: UI.spacing.xxs,
    width: "90%",
  },

  textBlock: {
    width: "90%",
  },

  labelText: {
    lineHeight: 16,
    flexShrink: 1,
  },

  titleText: {
    lineHeight: 28,
    flexShrink: 1,
  },

  detailText: {
    lineHeight: 13,
    flexShrink: 1,
  },
});
