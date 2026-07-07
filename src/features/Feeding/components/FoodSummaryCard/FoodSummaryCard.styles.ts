import { hp, wp } from "@/src/core/utils";
import { COLOR, UI } from "@/src/theme";
import { StyleSheet } from "react-native";

export const FoodSummaryCardStyles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.FONDO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: UI.meddium_radius,
    borderWidth: 1,
    gap: wp(7),
    paddingHorizontal: wp(20),
    paddingVertical: hp(16),
  },
  headerRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(10),
  },
  titleColumn: {
    flex: 1,
    marginRight: wp(10),
  },
  checkCircle: {
    alignItems: "center",
    backgroundColor: COLOR.FONDO_OPACO,
    borderColor: COLOR.FONDO_OPACO2,
    borderRadius: 16,
    borderWidth: 1,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  checkCircleActive: {
    backgroundColor: COLOR.AZUL_PRIMARIO,
    borderColor: COLOR.AZUL_PRIMARIO,
  },
});
