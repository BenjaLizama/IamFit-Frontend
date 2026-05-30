import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const FoodSummaryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO_OPACO,
    paddingVertical: hp(15),
    paddingHorizontal: wp(20),
    borderRadius: UI.large_radius,
    gap: wp(5),
  },
});
