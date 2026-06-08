import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const OTPInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  cell: {
    width: 52,
    height: 60,
    borderWidth: 1.5,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.FONDO,
  },
  cellActive: {
    borderColor: COLOR.AZUL_PRIMARIO,
  },
  cellFilled: {
    borderColor: COLOR.AZUL_PRIMARIO,
    backgroundColor: "#EBF1FF",
  },
  cellText: {
    fontSize: 24,
    color: COLOR.AZUL_PRIMARIO,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
