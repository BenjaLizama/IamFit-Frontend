import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const ProgressTaskCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: UI.large_radius,
    paddingHorizontal: wp(10),
    paddingVertical: hp(20),
    backgroundColor: COLOR.AZUL_PRIMARIO,
    justifyContent: "space-evenly",
  },

  first: {
    gap: wp(4),
  },

  second: {
    justifyContent: "center",
  },
});
