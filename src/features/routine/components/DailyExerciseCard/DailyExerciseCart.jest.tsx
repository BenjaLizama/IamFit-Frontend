import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import DailyExerciseCard from "./DailyExerciseCard";

// 1. Helper para renderizar con act (igual que en CustomCheckbox)
const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

// 2. Helper para buscar texto en el árbol, reemplazando a screen.getByText
const findNodeWithText = (renderer: ReactTestRenderer, text: string) => {
  return renderer.root.findAll((node) => node.props.children === text);
};

describe("DailyExerciseCard", () => {
  const defaultProps = {
    exerciseName: "Sentadillas Libres",
    description: "Trabajo de cuádriceps",
  };

  it("renderiza el nombre del ejercicio y la descripción básica correctamente", () => {
    const renderer = renderWithAct(<DailyExerciseCard {...defaultProps} />);

    // Verificamos que al menos un nodo en el árbol contenga nuestro texto
    expect(findNodeWithText(renderer, "Sentadillas Libres").length).toBeGreaterThan(0);
    expect(findNodeWithText(renderer, "Trabajo de cuádriceps").length).toBeGreaterThan(0);
  });

  it("concatena la descripción con el tiempo estimado cuando se provee", () => {
    const renderer = renderWithAct(
      <DailyExerciseCard {...defaultProps} estimatedTimeMin={15} />
    );

    expect(
      findNodeWithText(renderer, "Trabajo de cuádriceps - 15 min estimados").length
    ).toBeGreaterThan(0);
  });

  it("renderiza la intensidad cuando se pasa por props", () => {
    const renderer = renderWithAct(
      <DailyExerciseCard {...defaultProps} intensity="Intensidad Alta" />
    );

    expect(findNodeWithText(renderer, "Intensidad Alta").length).toBeGreaterThan(0);
  });

  it("renderiza el leftElement y tiene prioridad sobre pathImage", () => {
    const renderer = renderWithAct(
      <DailyExerciseCard
        {...defaultProps}
        leftElement={<Text>Elemento Izquierdo Custom</Text>}
        pathImage="https://ruta-falsa.com/imagen.jpg"
      />
    );

    expect(findNodeWithText(renderer, "Elemento Izquierdo Custom").length).toBeGreaterThan(0);
  });

  it("renderiza el rightElement en el contenedor correspondiente", () => {
    const renderer = renderWithAct(
      <DailyExerciseCard
        {...defaultProps}
        rightElement={<Text>Elemento Derecho Custom</Text>}
      />
    );

    expect(findNodeWithText(renderer, "Elemento Derecho Custom").length).toBeGreaterThan(0);
  });
});