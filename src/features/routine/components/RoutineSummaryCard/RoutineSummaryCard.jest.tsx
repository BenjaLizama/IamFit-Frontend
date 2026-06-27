import React from "react";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import RoutineSummaryCard from "./RoutineSummaryCard";

// 1. Helper de renderizado
const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

// 2. Helper MEJORADO: Ahora une los arreglos de texto creados por la interpolación de variables
const findNodeWithText = (renderer: ReactTestRenderer, text: string) => {
  return renderer.root.findAll((node) => {
    const children = node.props.children;
    // Si es un string simple
    if (typeof children === "string") return children === text;
    // Si es un arreglo (resultado de mezclar variables y texto fijo en JSX)
    if (Array.isArray(children)) return children.join("") === text;
    return false;
  });
};

describe("RoutineSummaryCard", () => {
  const baseProps = {
    equipment: "Mancuernas",
    exerciseCount: 5,
    level: "Intermedio",
    nextSessionLabel: "Mañana",
    estimatedTime: 45,
  };

  it("renderiza correctamente la etiqueta de la próxima sesión", () => {
    const renderer = renderWithAct(<RoutineSummaryCard {...baseProps} />);
    
    // Valida: Proxima sesion - {nextSessionLabel}
    expect(findNodeWithText(renderer, "Proxima sesion - Mañana").length).toBeGreaterThan(0);
  });

  it("renderiza correctamente la cantidad de ejercicios y el tiempo estimado", () => {
    const renderer = renderWithAct(<RoutineSummaryCard {...baseProps} />);
    
    // Valida: {exerciseCount} ejercicios - ~{estimatedTime} min
    expect(findNodeWithText(renderer, "5 ejercicios - ~45 min").length).toBeGreaterThan(0);
  });

  it("renderiza correctamente el nivel y el equipo necesario", () => {
    const renderer = renderWithAct(<RoutineSummaryCard {...baseProps} />);
    
    // Valida: Nivel: {level} Equipo: {equipment}
    expect(findNodeWithText(renderer, "Nivel: Intermedio Equipo: Mancuernas").length).toBeGreaterThan(0);
  });

  it("maneja datos numéricos o vacíos sin romperse", () => {
    const renderer = renderWithAct(
      <RoutineSummaryCard 
        equipment="Ninguno"
        exerciseCount={0}
        level="Principiante"
        nextSessionLabel="Hoy"
        estimatedTime={0} 
      />
    );
    
    // Verifica que el número 0 se formatea bien y no se oculta por falsy values
    expect(findNodeWithText(renderer, "0 ejercicios - ~0 min").length).toBeGreaterThan(0);
  });
});