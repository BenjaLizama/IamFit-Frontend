import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const DailyGoalItemStyles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(115),
    height: hp(115),
    paddingHorizontal: wp(10),
    borderRadius: UI.large_radius,
    backgroundColor: COLOR.FONDO_OPACO,
  },
});
