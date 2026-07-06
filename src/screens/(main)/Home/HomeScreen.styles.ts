import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: UI.LATERAL_PADDING,
  },
  emptyProgress: {
    alignItems: "center",
    paddingVertical: UI.spacing.lg,
  },
  progressGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: UI.spacing.md,
    justifyContent: "space-between",
  },
});
