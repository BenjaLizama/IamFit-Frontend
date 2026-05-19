import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ProgressBarStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLOR.FONDO_OPACO2,
    borderRadius: 6,
    overflow: "hidden",
  },
  filler: {
    height: 4,
    borderRadius: UI.large_radius,
  },
});
