import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const DailyExerciseCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderRadius: UI.meddium_radius,
    minHeight: hp(96),
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
    alignItems: "center",
    justifyContent: "center",
    width: wp(58),
    height: hp(58),
  },
  imageContainerBlue: {
    backgroundColor: "#EEF5FF",
  },
  imageContainerRed: {
    backgroundColor: "#FFF1F1",
  },
  imageContainerPurple: {
    backgroundColor: "#F6F1FF",
  },
  image: {
    borderRadius: UI.small_radius,
    width: wp(58),
    height: hp(58),
  },
  content: {
    flex: 1,
    gap: UI.spacing.xxs,
  },
  titleText: {
    lineHeight: hp(18),
  },
  detailText: {
    lineHeight: hp(15),
  },
  dayContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: UI.spacing.sm,
  },
});
