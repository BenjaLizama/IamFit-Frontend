import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MessageResponseBoxStyles = StyleSheet.create({
  messageContainer: {
    marginTop: 12,
    position: "relative",
    backgroundColor: COLOR.GRIS,
    paddingVertical: UI.spacing.sm,
    paddingHorizontal: UI.spacing.md,
    borderRadius: UI.small_radius,
    maxWidth: "75%",
    alignSelf: "flex-start",
  },

  extra: {
    left: 0,
    position: "absolute",
    backgroundColor: COLOR.GRIS,
    height: 20,
    width: 20,
    zIndex: -1,
    borderRadius: 5,
  },
});
