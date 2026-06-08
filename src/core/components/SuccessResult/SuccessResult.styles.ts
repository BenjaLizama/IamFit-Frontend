import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const SuccessResultStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    paddingHorizontal: 24,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLOR.AZUL_PRIMARIO,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    lineHeight: 36,
  },
  button: {
    width: "100%",
    alignItems: "center",
  },
});
