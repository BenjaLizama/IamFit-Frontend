import { COLOR } from "@/src/theme";
import React from "react";
import { Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import DailyGoalProgressItem from "./DailyGoalProgressItem";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) {
    throw new Error("No se pudo renderizar DailyGoalProgressItem");
  }
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

describe("DailyGoalProgressItem", () => {
  it("muestra una meta con subtitulo y barra de progreso coloreada", () => {
    // Este test valida que la meta con progreso renderice sus textos y pase porcentaje/color a la barra.
    const renderer = renderWithAct(
      <DailyGoalProgressItem
        goal="1.5 L"
        subtitle="Agua consumida"
        progress={75}
        color={COLOR.SUCCESS}
      />,
    );

    const texts = renderer.root
      .findAllByType(Text)
      .map((node: TextNode) => textContent(node.props.children));
    const filler = renderer.root.findAllByType(View).find((node: any) => {
      const style = node.props.style;
      return (
        Array.isArray(style) && style.some((item) => item?.width === "75%")
      );
    });

    expect(texts).toContain("1.5 L");
    expect(texts).toContain("Agua consumida");
    expect(filler?.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          width: "75%",
          backgroundColor: COLOR.SUCCESS,
        }),
      ]),
    );
  });
});
