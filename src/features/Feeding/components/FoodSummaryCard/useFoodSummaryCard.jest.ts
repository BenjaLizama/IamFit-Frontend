import { COLOR } from "@/src/theme";
import { describe, expect, it } from "vitest";
import { useFoodSummaryCard } from "./useFoodSummaryCard";

describe("useFoodSummaryCard", () => {
  it("maps breakfast color", () => {
    expect(useFoodSummaryCard({ tipoComida: "Desayuno" }).typeFoodColor).toBe(
      COLOR.AZUL_PRIMARIO,
    );
  });

  it("maps lunch color", () => {
    expect(useFoodSummaryCard({ tipoComida: "Almuerzo" }).typeFoodColor).toBe(
      COLOR.SUCCESS,
    );
  });

  it("maps dinner color", () => {
    expect(useFoodSummaryCard({ tipoComida: "Cena" }).typeFoodColor).toBe(
      COLOR.MORADO,
    );
  });

  it("uses default color for unknown type", () => {
    expect(useFoodSummaryCard({ tipoComida: "Colación" }).typeFoodColor).toBe(
      COLOR.TEXTO_PRINCIPAL,
    );
  });
});

