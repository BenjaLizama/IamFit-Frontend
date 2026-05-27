import { StyleSheet } from "react-native";

export const MiaChatScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
    position: "relative",
  },
  messagesHost: {
    flex: 1,
    position: "relative",
  },
  messagesScroll: {
    flex: 1,
    paddingBottom: 16,
  },
  messagesContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    gap: 12,
    paddingBottom: 12,
  },
  inputHost: {
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 12,
  },
});
