import { hp } from "@/src/core/utils";
import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const RoutineScreenStyles = StyleSheet.create({
  scrollContent: {
    paddingBottom: UI.spacing.xl,
    paddingHorizontal: UI.LATERAL_PADDING,
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: UI.spacing.md,
  },
  screenTitle: {
    lineHeight: hp(30),
  },
  filterRow: {
    flexDirection: "row",
    gap: UI.spacing.sm,
    marginBottom: UI.spacing.sm,
  },
  routineList: {
    gap: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  aiButton: {
    alignItems: "center",
    flexDirection: "row",
    gap: UI.spacing.sm,
    justifyContent: "center",
    marginTop: UI.spacing.lg,
    minHeight: hp(56),
  },
  aiButtonText: {
    lineHeight: hp(18),
  },
});
