import { hp, wp } from "@/src/core/utils";
import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MainTabBarStyles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    width: "100%",
    maxWidth: wp(350),
    height: hp(60),
    borderRadius: hp(42),
    paddingHorizontal: wp(16),
    paddingVertical: hp(10),
    marginBottom: hp(12),
    justifyContent: "space-between",
    alignItems: "center",
  },
  touchIndicatorHost: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  touchIndicatorMask: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    borderRadius: 44,
  },

  touchIndicator: {
    position: "absolute",
    top: 0,
    left: 0,
    height: hp(54),
    width: wp(54),
    borderRadius: 500,
    backgroundColor: "#FFFFFF32",
    borderColor: "#FFFFFF78",
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
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
