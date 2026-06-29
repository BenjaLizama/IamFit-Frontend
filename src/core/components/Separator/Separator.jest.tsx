import React from "react";
import { StyleSheet, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import Separator from "./Separator";

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

describe("Separator", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<Separator />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("aplica los estilos y propiedades por defecto si no se le pasan props", () => {
    const renderer = renderWithAct(<Separator />);

    // Al ser un solo componente View, findByType funciona perfectamente
    const view = renderer.root.findByType(View);

    // Aplanamos el arreglo de estilos para validarlo
    const flattenedStyle = StyleSheet.flatten(view.props.style);

    // Verificamos los valores por defecto que definiste en los parámetros del componente
    expect(flattenedStyle.marginVertical).toBe(20);
    expect(flattenedStyle.backgroundColor).toBe("#E0E0E0");
    expect(flattenedStyle.width).toBe("100%");
  });

  it("aplica correctamente las propiedades personalizadas (color, marginVertical, width)", () => {
    const customColor = "#FF5733";
    const customMargin = 10;
    const customWidth = "50%";

    const renderer = renderWithAct(
      <Separator
        color={customColor}
        marginVertical={customMargin}
        width={customWidth}
      />
    );

    const view = renderer.root.findByType(View);
    const flattenedStyle = StyleSheet.flatten(view.props.style);

    // Verificamos que los valores inyectados reemplazaron a los por defecto
    expect(flattenedStyle.marginVertical).toBe(customMargin);
    expect(flattenedStyle.backgroundColor).toBe(customColor);
    expect(flattenedStyle.width).toBe(customWidth);
  });
});
