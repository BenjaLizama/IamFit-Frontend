import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const RegisterStepStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },

  scrollView: {
    flex: 1,
    width: "100%",
  },

  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: UI.spacing.xxl,
    paddingVertical: UI.spacing.xxl,
    width: "100%",
  },

  topBar: {
    alignItems: "center",
    gap: UI.spacing.md,
    width: "100%",
  },

  backButton: {
    alignSelf: "flex-start",
  },

  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E9EEF6",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: COLOR.AZUL_PRIMARIO,
  },

  questionArea: {
    alignItems: "center",
    gap: UI.spacing.lg,
    width: "100%",
  },

  inputArea: {
    alignItems: "center",
    width: "100%",
  },

  actions: {
    alignItems: "center",
    gap: UI.spacing.lg,
    width: "100%",
  },

  resultContentContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: UI.spacing.xxl,
    paddingVertical: UI.spacing.xxxl,
    width: "100%",
  },

  resultHeader: {
    alignItems: "center",
    gap: UI.spacing.md,
    width: "100%",
  },

  resultMessage: {
    alignItems: "center",
    gap: UI.spacing.lg,
    width: "100%",
  },

});
