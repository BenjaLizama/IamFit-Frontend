import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const PrivacyPolicyScreenStyles = StyleSheet.create({
  container: {},

  title: {
    marginBottom: 18,
    alignItems: "center",
  },

  lastUpdateSubtitle: {
    marginBottom: 18,
    alignItems: "center",
  },

  first: {
    marginBottom: 22,
  },

  itemContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginLeft: 10,
  },

  element: {
    marginBottom: 22,
  },

  hr: {
    height: 2,
    alignSelf: "center",
    color: COLOR.AZUL_SECUNDARIO,
  },
});
