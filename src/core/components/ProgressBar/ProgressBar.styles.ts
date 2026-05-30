import { hp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ProgressBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.small_radius,
    overflow: "hidden",
  },
  filler: {
    height: hp(4),
    borderRadius: UI.large_radius,
  },
});
