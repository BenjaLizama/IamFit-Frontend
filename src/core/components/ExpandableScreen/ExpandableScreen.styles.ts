import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ExpandableScreenStyles = StyleSheet.create({
  container: {},
  baseCard: {},
  expandedCard: {
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.4,
    shadowRadius: 9,
  },
  modalOverlay: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  header: {
    width: "100%",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    overflow: "hidden",
    alignItems: "center",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
});
