import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const OTPInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  cell: {
    width: 44,
    height: 54,
    borderWidth: 1.5,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: 10,
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
    fontSize: 22,
    color: COLOR.AZUL_PRIMARIO,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
