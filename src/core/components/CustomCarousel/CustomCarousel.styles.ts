import { UI } from "@/src/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 64;
const GAP = 11;

// La fórmula exacta para centrar considerando el gap interno:
// (Ancho pantalla / 2) - (Ancho item / 2)
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

export const CustomCarouselStyles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: SCREEN_WIDTH,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: GAP,
  },
  defaultContentContainer: {
    paddingLeft: UI.LATERAL_PADDING,
  },
  centeredContentContainer: {
    paddingHorizontal: SIDE_SPACING,
  },
});
