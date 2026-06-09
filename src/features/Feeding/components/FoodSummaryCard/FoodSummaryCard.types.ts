export interface FoodSummaryCardProps {
  tipoComida: TipoComida;
  calorias: number;
  descripcion: string;
  dato1: number;
  dato2: number;
  dato3: number;
}

export interface UseFoodSummaryCardProps {
  tipoComida: TipoComida;
}

type TipoComida = "Desayuno" | "Almuerzo" | "Cena" | "Snack";
