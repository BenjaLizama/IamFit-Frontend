import { COLOR } from "@/src/theme";
import { StyleSheet } from "react-native";

export const IamfitIconStyles = StyleSheet.create({
  shadowWrapper: {
    // === SOMBRA PARA IOS ===
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,

    // === SOMBRA PARA ANDROID ===
    elevation: 2,

    // El fondo si o si necesita un color de fondo
    backgroundColor: COLOR.FONDO,
    borderRadius: 45,
  },

  icon: {
    borderColor: COLOR.AZUL_PRIMARIO,
    borderWidth: 4,
    borderRadius: 45,
  },
});
