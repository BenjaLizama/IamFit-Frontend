import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageUserBoxStyles = StyleSheet.create({
  messageContainer: {
    position: "relative",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    paddingVertical: UI.spacing.sm,
    paddingHorizontal: UI.spacing.md,
    borderRadius: UI.small_radius,
    maxWidth: "75%",
    alignSelf: "flex-end",
    marginRight: 2,
  },

  extra: {
    right: 0,
    position: "absolute",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    height: 20,
    width: 20,
    zIndex: -1,
    borderRadius: 3,
  },
});
