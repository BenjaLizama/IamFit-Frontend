import { COLOR } from "@/src/theme";
import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import FoodSummaryCard from "./FoodSummaryCard";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode; style: unknown } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar FoodSummaryCard");
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

const getTextNodes = (renderer: Renderer) =>
  renderer.root.findAllByType(Text) as TextNode[];

describe("FoodSummaryCard", () => {
  it("muestra el tipo de comida, calorias, descripcion y macronutrientes", () => {
    // Este test valida que la tarjeta muestre el resumen nutricional principal de una comida.
    const renderer = renderWithAct(
      <FoodSummaryCard
        tipoComida="Almuerzo"
        calorias={620}
        descripcion="Pollo con arroz y ensalada"
        dato1={42}
        dato2={68}
        dato3={18}
      />,
    );

    const texts = getTextNodes(renderer).map((node) =>
      textContent(node.props.children),
    );

    expect(texts).toContain("Almuerzo - 620 kcal");
    expect(texts).toContain("Pollo con arroz y ensalada");
    expect(texts).toContain("P: 42 - C: 68 - G: 18");
  });

  it("aplica el color correspondiente al tipo de comida", () => {
    // Este test valida que el tipo de comida use el color definido por el hook de Feeding.
    const renderer = renderWithAct(
      <FoodSummaryCard
        tipoComida="Snack"
        calorias={210}
        descripcion="Yogurt con fruta"
        dato1={12}
        dato2={28}
        dato3={5}
      />,
    );

    const titleNode = getTextNodes(renderer).find(
      (node) => textContent(node.props.children) === "Snack - 210 kcal",
    );

    expect(titleNode?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: COLOR.WARNING }),
      ]),
    );
  });
});
