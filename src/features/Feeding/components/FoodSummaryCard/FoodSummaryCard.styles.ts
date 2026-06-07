import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const FoodSummaryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: wp(7),
    paddingHorizontal: wp(20),
    paddingVertical: hp(16),
  },
});
