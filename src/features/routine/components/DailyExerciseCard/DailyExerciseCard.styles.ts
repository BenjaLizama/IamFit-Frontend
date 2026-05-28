import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const DailyExerciseCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.meddium_radius,
    minHeight: 96,
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.md,
    marginTop: UI.spacing.sm,
    borderColor: COLOR.FONDO_OPACO2,
    borderWidth: 2,
  },
  imageContainer: {
    marginRight: UI.spacing.md,
    borderRadius: UI.small_radius,
    backgroundColor: COLOR.BOTON_TAB_NAVEGACION_BIG,
    overflow: "hidden",
  },
  image: {
    borderRadius: UI.small_radius,
    width: 58,
    height: 58,
  },
  content: {
    flex: 1,
    gap: UI.spacing.xxs,
  },
  titleText: {
    lineHeight: 18,
  },
  detailText: {
    lineHeight: 15,
  },
  dayContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: UI.spacing.sm,
  },
});
