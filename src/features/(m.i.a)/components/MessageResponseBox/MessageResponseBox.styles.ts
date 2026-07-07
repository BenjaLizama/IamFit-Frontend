import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageResponseBoxStyles = StyleSheet.create({
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: COLOR.GRIS,
    borderRadius: UI.small_radius,
    borderBottomLeftRadius: wp(4),
    marginTop: hp(10),
    maxWidth: "88%",
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },

  responseText: {
    lineHeight: hp(22),
  },

  actionList: {
    gap: UI.spacing.sm,
    marginTop: UI.spacing.md,
  },

  actionButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: COLOR.BOTON_PRIMARIO,
    borderRadius: UI.small_radius,
    flexDirection: "row",
    gap: UI.spacing.xs,
    minHeight: hp(40),
    justifyContent: "center",
    maxWidth: "100%",
    paddingHorizontal: UI.spacing.md,
    paddingVertical: UI.spacing.sm,
  },

  actionButtonDisabled: {
    opacity: 0.55,
  },

  actionButtonText: {
    color: COLOR.TEXTO_BOTON_PRIMARIO,
  },
});
