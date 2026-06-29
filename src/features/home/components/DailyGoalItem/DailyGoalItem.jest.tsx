import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { COLOR } from "@/src/theme";
import DailyGoalItem from "./DailyGoalItem";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode; style: unknown } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar DailyGoalItem");
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

describe("DailyGoalItem", () => {
  it("muestra el valor de la meta diaria junto a su descripcion", () => {
    // Este test valida que el item de meta diaria renderice el numero principal y el texto explicativo.
    const renderer = renderWithAct(
      <DailyGoalItem
        item="2.000"
        text="Calorias"
        color={COLOR.AZUL_PRIMARIO}
      />,
    );

    const texts = renderer.root
      .findAllByType(Text)
      .map((node: TextNode) => textContent(node.props.children));

    expect(texts).toContain("2.000");
    expect(texts).toContain("Calorias");
  });
});
