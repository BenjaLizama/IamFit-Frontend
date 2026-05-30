import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const CustomCheckboxStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },

  box: {
    width: wp(22),
    height: hp(22),
    borderRadius: UI.small_radius,
    borderWidth: 2,
    borderColor: COLOR.AZUL_PRIMARIO,
    alignItems: "center",
    justifyContent: "center",
  },

  disabled: {
    opacity: 0.5,
  },
});
