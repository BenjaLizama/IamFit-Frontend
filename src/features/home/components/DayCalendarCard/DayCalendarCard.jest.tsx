import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import DayCalendarCard from "./DayCalendarCard";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar DayCalendarCard");
  return renderer;
};

const textContent = (value: React.ReactNode): string =>
  Array.isArray(value) ? value.map(textContent).join("") : String(value ?? "");

const getTextValues = (renderer: Renderer) =>
  renderer.root
    .findAllByType(Text)
    .map((node: TextNode) => textContent(node.props.children));

describe("DayCalendarCard", () => {
  it("muestra mes y dia abreviados con el numero del calendario", () => {
    // Este test valida que la tarjeta del calendario formatee mes/dia a tres letras.
    const renderer = renderWithAct(
      <DayCalendarCard month="Enero" dayNumber={12} dayText="Lunes" />,
    );

    expect(getTextValues(renderer)).toEqual(["Ene", "12", "Lun"]);
  });

  it("renderiza correctamente la variante seleccionada", () => {
    // Este test valida que la tarjeta seleccionada mantenga la misma informacion visible.
    const renderer = renderWithAct(
      <DayCalendarCard
        month="Marzo"
        dayNumber={7}
        dayText="Viernes"
        type="selected"
      />,
    );

    expect(getTextValues(renderer)).toEqual(["Mar", "7", "Vie"]);
  });
});
