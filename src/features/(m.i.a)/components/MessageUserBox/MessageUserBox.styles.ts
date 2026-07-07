import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageUserBoxStyles = StyleSheet.create({
  messageContainer: {
    alignSelf: "flex-end",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderRadius: UI.small_radius,
    borderBottomRightRadius: wp(4),
    marginTop: hp(10),
    maxWidth: "84%",
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },
});
