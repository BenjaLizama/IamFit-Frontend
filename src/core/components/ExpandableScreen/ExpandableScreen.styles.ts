import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const ExpandableScreenStyles = StyleSheet.create({
  container: {},
  baseCard: {},
  baseContent: {
    opacity: 1,
  },
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
  },
  headerSmallContent: {
    overflow: "hidden",
  },
  transitionContent: {
    elevation: 2,
    zIndex: 2,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: wp(12),
  },
  bodyKeyboard: {
    flex: 1,
  },
  bodyScroll: {
    flex: 1,
  },
  bodyScrollContent: {
    flexGrow: 1,
  },
});
