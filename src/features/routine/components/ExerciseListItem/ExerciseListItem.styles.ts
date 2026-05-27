import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ExerciseListItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: UI.spacing.giant,
    paddingHorizontal: UI.spacing.xs,
    paddingVertical: UI.spacing.sm,
    borderBottomColor: COLOR.FONDO_OPACO2,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    gap: UI.spacing.xxs,
  },
  rightItemContainer: {
    minWidth: UI.spacing.xxxl,
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: UI.spacing.md,
  },
});
