import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const MainTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.AZUL_PRIMARIO,
    width: "92%",
    height: 60,
    borderRadius: 44,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
