import { COLOR } from "@/src/theme";
import { UseFoodSummaryCardProps } from "./FoodSummaryCard.types";

export const useFoodSummaryCard = ({ tipoComida }: UseFoodSummaryCardProps) => {
  let typeFoodColor = COLOR.TEXTO_PRINCIPAL;
  if (tipoComida === "Desayuno") {
    typeFoodColor = COLOR.AZUL_PRIMARIO;
  }
  if (tipoComida === "Almuerzo") {
    typeFoodColor = COLOR.SUCCESS;
  }
  if (tipoComida === "Cena") {
    typeFoodColor = COLOR.MORADO;
  }
  return {
    typeFoodColor,
  };
};
