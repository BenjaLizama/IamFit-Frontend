import React from "react";
import { Text } from "react-native";
import { Circle } from "react-native-svg";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import CircleProgress from "./CircleProgress";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar CircleProgress");
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

describe("CircleProgress", () => {
  it("muestra el porcentaje redondeado y configura los circulos SVG del progreso", () => {
    // Este test valida que el indicador circular muestre el porcentaje y calcule su trazo de progreso.
    const renderer = renderWithAct(
      <CircleProgress percentage={66.6} size={100} strokeWidth={10} />,
    );

    const texts = renderer.root
      .findAllByType(Text)
      .map((node: TextNode) => textContent(node.props.children));
    const circles = renderer.root.findAllByType(Circle);
    const radius = 45;
    const circumference = radius * 2 * Math.PI;
    const progressCircle = circles.find(
      (circle) => circle.props.strokeDasharray === circumference,
    );

    expect(texts).toContain("67%");
    expect(circles.some((circle) => circle.props.r === radius)).toBe(true);
    expect(progressCircle?.props.strokeDashoffset).toBeCloseTo(
      circumference - (circumference * 66.6) / 100,
    );
  });
});
