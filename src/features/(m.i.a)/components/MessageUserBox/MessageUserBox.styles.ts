import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageUserBoxStyles = StyleSheet.create({
  messageContainer: {
    marginTop: hp(12),
    position: "relative",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    paddingVertical: UI.spacing.sm,
    paddingHorizontal: UI.spacing.md,
    borderRadius: UI.small_radius,
    maxWidth: "75%",
    alignSelf: "flex-end",
  },

  extra: {
    right: wp(0.1),
    position: "absolute",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    height: hp(20),
    width: wp(20),
    zIndex: -1,
    borderRadius: UI.small_radius,
  },
});
