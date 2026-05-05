import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const ProgressTaskCardStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "relative",
    marginTop: 50,
    marginHorizontal: 12,
    width: 280,
    borderRadius: UI.large_radius,
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: COLOR.AZUL_PRIMARIO,
    justifyContent: "center",
  },

  first: {
    width: 150,
    gap: 15,
  },

  second: {
    justifyContent: "flex-end",
  },

  options: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});
