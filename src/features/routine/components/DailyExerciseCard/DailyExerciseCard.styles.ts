import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DailyExcerciseCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.FONDO_OPACO,
    alignItems: "center",
    borderRadius: UI.small_radius,
    padding: UI.spacing.lg,
    marginTop: UI.spacing.sm,
    borderColor: COLOR.FONDO_OPACO2,
    borderWidth: 2,
  },
  imageContainer: {
    marginRight: UI.spacing.md,
    borderRadius: UI.small_radius,
  },
  image: {
    borderRadius: UI.small_radius,
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  dayContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.xs,
  },
});
