import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ActivityChartStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: UI.spacing.sm,
  },
  yAxis: {
    justifyContent: "space-between",
    paddingVertical: UI.spacing.xs,
    width: UI.spacing.xl,
  },
  chartColumn: {
    flex: 1,
  },
  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: UI.spacing.xs,
  },
  emptyContainer: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    borderWidth: 1,
    justifyContent: "center",
    padding: UI.spacing.md,
  },
});
