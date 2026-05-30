import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";
import { hp, wp } from "@/src/core/utils";

export const PrivacyPolicyScreenStyles = StyleSheet.create({
  container: {},

  title: {
    marginBottom: hp(18),
    alignItems: "center",
  },

  lastUpdateSubtitle: {
    marginBottom: hp(18),
    alignItems: "center",
  },

  first: {
    marginBottom: hp(22),
  },

  itemContainer: {
    flexDirection: "row",
    marginTop: hp(5),
    marginLeft: wp(10),
  },

  element: {
    marginBottom: hp(22),
  },

  hr: {
    height: hp(2),
    alignSelf: "center",
    color: COLOR.AZUL_SECUNDARIO,
  },
});
