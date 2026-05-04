import { Dimensions, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_WIDTH = 64;
const GAP = 13;

// La fórmula exacta para centrar considerando el gap interno:
// (Ancho pantalla / 2) - (Ancho item / 2)
const SIDE_SPACING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

export const CustomCarouselStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    // IMPORTANTE: Quitamos el gap de aquí y lo manejaremos con márgenes
    // o mantenemos el gap pero ajustamos el padding.
    // Vamos a mantener el gap pero asegurar el padding:
    gap: GAP,
    paddingHorizontal: SIDE_SPACING,
  },
});
