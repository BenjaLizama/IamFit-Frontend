import React from "react";
import { Text, TouchableOpacity } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import ExerciseListItem from "./ExerciseListItem";

// 1. Helper para renderizar de forma segura
const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

// 2. Helper para buscar texto exacto
const findNodeWithText = (renderer: ReactTestRenderer, text: string) => {
  return renderer.root.findAll((node) => node.props.children === text);
};

describe("ExerciseListItem", () => {
  const baseProps = {
    name: "Press de Banca",
    onAction: vi.fn(),
    checked: false,
  };

  it("renderiza el nombre del ejercicio correctamente", () => {
    // Usamos as any o un cast rápido si TypeSript pide props obligatorios de kind,
    // o simplemente le pasamos el tipo mínimo requerido.
    const renderer = renderWithAct(<ExerciseListItem {...baseProps} kind="weight" series={3} reps={10} />);
    expect(findNodeWithText(renderer, "Press de Banca").length).toBeGreaterThan(0);
  });

  describe("Cuando es de tipo 'weight' (Peso)", () => {
    it("renderiza series, reps y peso si se proporciona", () => {
      const renderer = renderWithAct(
        <ExerciseListItem {...baseProps} kind="weight" series={4} reps={12} weight={60} />
      );
      
      expect(findNodeWithText(renderer, "4 x 12 reps - 60 kg").length).toBeGreaterThan(0);
    });

    it("omite el peso si viene en null", () => {
      const renderer = renderWithAct(
        <ExerciseListItem {...baseProps} kind="weight" series={3} reps={15} weight={null} />
      );
      
      expect(findNodeWithText(renderer, "3 x 15 reps").length).toBeGreaterThan(0);
    });
  });

  describe("Cuando es de tipo 'time' (Tiempo)", () => {
    it("renderiza tiempo e intensidad si se proporciona", () => {
      const renderer = renderWithAct(
        <ExerciseListItem {...baseProps} kind="time" time="15 min" intensity="Alta" />
      );
      
      expect(findNodeWithText(renderer, "15 min - Alta").length).toBeGreaterThan(0);
    });

    it("omite la intensidad si no se proporciona", () => {
      const renderer = renderWithAct(
        <ExerciseListItem {...baseProps} kind="time" time="30 min" />
      );
      
      expect(findNodeWithText(renderer, "30 min").length).toBeGreaterThan(0);
    });
  });

  it("dispara la función onAction al ser presionado", () => {
    const onActionMock = vi.fn();
    const renderer = renderWithAct(
      <ExerciseListItem {...baseProps} kind="time" time="10 min" onAction={onActionMock} />
    );

    const touchable = renderer.root.findByType(TouchableOpacity);

    // Simulamos el toque del usuario
    act(() => {
      touchable.props.onPress();
    });

    expect(onActionMock).toHaveBeenCalledTimes(1);
  });

  it("renderiza el rightItem correctamente", () => {
    const renderer = renderWithAct(
      <ExerciseListItem 
        {...baseProps} 
        kind="time" 
        time="5 min" 
        rightItem={<Text>Icono Check</Text>} 
      />
    );

    expect(findNodeWithText(renderer, "Icono Check").length).toBeGreaterThan(0);
  });
});