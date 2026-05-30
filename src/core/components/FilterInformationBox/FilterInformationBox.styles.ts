import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const FilterInformationBoxStyles = StyleSheet.create({
  container: {
    paddingVertical: hp(6),
    paddingHorizontal: wp(8),
    borderRadius: UI.large_radius,
    justifyContent: "center",
    alignItems: "center",
  },
});
