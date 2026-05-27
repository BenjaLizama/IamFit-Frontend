import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MainTabBarStyles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    width: "92%",
    height: 60,
    borderRadius: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },

  touchIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 59,
    width: 59,
    borderRadius: 100,
    backgroundColor: "#FFFFFF32",
    borderColor: "#FFFFFF78",
    borderWidth: 1,
    overflow: "hidden",
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 8,
        blurRadius: 16,
        color: "#00000030",
      },
      {
        offsetX: 0,
        offsetY: -2,
        blurRadius: 8,
        color: "#FFFFFF5C",
      },
    ],
  },

  touchIndicatorHighlight: {
    position: "absolute",
    top: 8,
    left: 11,
    height: 17,
    width: 27,
    borderRadius: 100,
    backgroundColor: "#FFFFFF80",
    opacity: 0.82,
    transform: [{ rotate: "-16deg" }],
  },

  touchIndicatorSpark: {
    position: "absolute",
    top: 13,
    left: 19,
    height: 5,
    width: 9,
    borderRadius: 100,
    backgroundColor: "#FFFFFFD6",
    opacity: 0.86,
    transform: [{ rotate: "-20deg" }],
  },
  expandableContainer: {
    justifyContent: "space-between",
    height: "99%",
  },
});
