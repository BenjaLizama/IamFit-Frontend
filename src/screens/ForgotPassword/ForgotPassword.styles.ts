import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ForgotPasswordStyles = StyleSheet.create({
  first: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: UI.spacing.xl,
  },
  second: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: UI.spacing.md,
  },
  last: {
    alignItems: "center",
    gap: UI.spacing.lg,
  },
  description: {
    textAlign: "center",
    color: COLOR.TEXTO_TENUE,
  },
  emailHighlight: {
    color: COLOR.TEXTO_PRINCIPAL,
    fontWeight: "700",
  },
  errorText: {
    textAlign: "center",
    color: "#E53935",
    fontSize: 13,
  },
});
