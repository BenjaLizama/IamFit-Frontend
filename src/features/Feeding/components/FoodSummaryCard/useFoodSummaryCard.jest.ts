import { COLOR } from "@/src/theme";
import { describe, expect, it } from "vitest";
import { useFoodSummaryCard } from "./useFoodSummaryCard";

describe("useFoodSummaryCard", () => {
  it("asigna color azul al desayuno", () => {
    // Este test valida el color usado para identificar comidas de tipo desayuno.
    expect(useFoodSummaryCard({ tipoComida: "Desayuno" }).typeFoodColor).toBe(
      COLOR.AZUL_PRIMARIO,
    );
  });

  it("asigna color verde al almuerzo", () => {
    // Este test valida el color usado para identificar comidas de tipo almuerzo.
    expect(useFoodSummaryCard({ tipoComida: "Almuerzo" }).typeFoodColor).toBe(
      COLOR.SUCCESS,
    );
  });

  it("asigna color morado a la cena", () => {
    // Este test valida el color usado para identificar comidas de tipo cena.
    expect(useFoodSummaryCard({ tipoComida: "Cena" }).typeFoodColor).toBe(
      COLOR.MORADO,
    );
  });

  it("asigna color de advertencia al snack", () => {
    // Este test valida el color usado para identificar comidas de tipo snack.
    expect(useFoodSummaryCard({ tipoComida: "Snack" }).typeFoodColor).toBe(
      COLOR.WARNING,
    );
  });
});
