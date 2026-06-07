import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageResponseBoxStyles = StyleSheet.create({
  messageContainer: {
    marginTop: hp(12),
    position: "relative",
    backgroundColor: COLOR.GRIS,
    paddingVertical: UI.spacing.sm,
    paddingHorizontal: UI.spacing.md,
    borderRadius: UI.small_radius,
    maxWidth: "75%",
    alignSelf: "flex-start",
  },

  extra: {
    left: wp(0),
    position: "absolute",
    backgroundColor: COLOR.GRIS,
    height: hp(20),
    width: wp(20),
    zIndex: -1,
    borderRadius: UI.small_radius,
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
