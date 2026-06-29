import React from "react";
import { StyleSheet, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import ProgressBar from "./ProgressBar";

// Helper de renderizado seguro con tipado correcto
const renderWithAct = (
  element: React.ReactElement
): ReturnType<typeof TestRenderer.create> => {
  let renderer: ReturnType<typeof TestRenderer.create> | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("ProgressBar", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<ProgressBar progress={50} />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("aplica el width correcto basado en el prop progress", () => {
    const renderer = renderWithAct(<ProgressBar progress={50} />);

    // El componente tiene 2 Views: [0] es el contenedor, [1] es el filler
    const views = renderer.root.findAllByType(View);
    const fillerView = views[1];

    // Usamos StyleSheet.flatten para aplanar el arreglo de estilos y evaluarlo fácil
    const flattenedStyle = StyleSheet.flatten(fillerView.props.style);

    expect(flattenedStyle.width).toBe("50%");
  });

  it("limita el progreso a 100% si se pasa un valor mayor a 100", () => {
    const renderer = renderWithAct(<ProgressBar progress={150} />);

    const views = renderer.root.findAllByType(View);
    const fillerView = views[1];

    const flattenedStyle = StyleSheet.flatten(fillerView.props.style);
    expect(flattenedStyle.width).toBe("100%");
  });

  it("limita el progreso a 0% si se pasa un valor negativo", () => {
    const renderer = renderWithAct(<ProgressBar progress={-20} />);

    const views = renderer.root.findAllByType(View);
    const fillerView = views[1];

    const flattenedStyle = StyleSheet.flatten(fillerView.props.style);
    expect(flattenedStyle.width).toBe("0%");
  });

  it("aplica correctamente las propiedades de color, height y style personalizado", () => {
    const customStyle = { margin: 15 };
    const testColor = "#FF5733";
    const testHeight = 20;

    const renderer = renderWithAct(
      <ProgressBar
        progress={75}
        color={testColor}
        height={testHeight}
        style={customStyle}
      />
    );

    const views = renderer.root.findAllByType(View);
    const containerView = views[0];
    const fillerView = views[1];

    const flattenedContainerStyle = StyleSheet.flatten(
      containerView.props.style
    );
    const flattenedFillerStyle = StyleSheet.flatten(fillerView.props.style);

    // Verificamos el contenedor (height y custom style)
    expect(flattenedContainerStyle.height).toBe(testHeight);
    expect(flattenedContainerStyle.margin).toBe(15);

    // Verificamos el filler (color inyectado)
    expect(flattenedFillerStyle.backgroundColor).toBe(testColor);
  });
});
