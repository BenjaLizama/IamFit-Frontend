import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import ProgressTaskCard from "./ProgressTaskCard";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar ProgressTaskCard");
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

describe("ProgressTaskCard", () => {
  it("muestra calorias actuales, meta, faltante y porcentaje de avance", () => {
    // Este test valida el resumen principal de progreso calorico del home.
    const renderer = renderWithAct(
      <ProgressTaskCard actualCalories={1250} goal={2000} />,
    );

    const texts = renderer.root
      .findAllByType(Text)
      .map((node: TextNode) => textContent(node.props.children));

    expect(texts.some((text) => text.includes("Tu progreso de hoy"))).toBe(
      true,
    );
    expect(texts).toContain("1.250 kcal");
    expect(texts).toContain("Meta: 2.000 kcal");
    expect(texts).toContain("Faltan: 750 kcal");
    expect(texts).toContain("63%");
  });
});
