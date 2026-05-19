import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ProgressTaskCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    borderRadius: UI.large_radius,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: COLOR.AZUL_PRIMARIO,
    justifyContent: "space-evenly",
  },

  first: {
    gap: 4,
  },

  second: {
    justifyContent: "center",
  },
});
