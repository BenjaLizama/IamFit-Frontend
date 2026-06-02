import { hp } from "@/src/core/utils";
import { UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const AuthFormTemplateStyles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    width: "100%",
  },

  container: {
    flex: 1,
    width: "100%",
  },

  contentContainer: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: UI.spacing.xxl,
  },

  section1: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minHeight: hp(0),
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  section2: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minHeight: hp(0),
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },

  section3: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    minHeight: hp(0),
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
