import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const LoginScreenStyles = StyleSheet.create({
  first: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: UI.spacing.xxxl,
  },

  second: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: UI.spacing.md,
  },

  last: {
    alignItems: "center",
    gap: UI.spacing.jumbo,
  },

  last_first: {
    justifyContent: "center",
    alignItems: "center",
    gap: UI.spacing.lg,
  },
});
