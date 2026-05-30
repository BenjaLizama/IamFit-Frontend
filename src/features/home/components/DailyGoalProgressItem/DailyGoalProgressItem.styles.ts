import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const DailyGoalProgressItemPropsStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO_OPACO,
    paddingHorizontal: UI.LATERAL_PADDING,
    paddingVertical: hp(8),
    gap: wp(5),
    width: "48%",
    height: hp(90),
    justifyContent: "center",
    borderRadius: UI.meddium_radius,
  },
});
