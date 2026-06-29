import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import Wrapper from "./Wrapper";

// 1. Mock del Tema
vi.mock("@/src/theme", () => ({
  COLOR: {
    FONDO: "#MOCKED_FONDO",
  },
}));

// 2. Mock del Hook para controlar el safe area
vi.mock("./useWrapper", () => ({
  useWrapper: vi.fn(() => ({
    insets: {
      top: 45,
      bottom: 30,
      left: 10,
      right: 15,
    },
  })),
}));

// Helper de renderizado seguro
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

describe("Wrapper", () => {
  it("se renderiza correctamente y muestra sus hijos", () => {
    const renderer = renderWithAct(
      <Wrapper>
        <Text>Contenido de prueba</Text>
      </Wrapper>
    );
    expect(renderer.toJSON()).not.toBeNull();

    // Validamos que el hijo fue renderizado dentro del Wrapper
    const childText = renderer.root.findByType(Text);
    expect(childText.props.children).toBe("Contenido de prueba");
  });

  it("aplica los estilos correctos de insets y theme al contenedor principal", () => {
    const renderer = renderWithAct(
      <Wrapper>
        <Text>Contenido</Text>
      </Wrapper>
    );

    // Al ser un contenedor principal, buscamos todos los Views y tomamos el primero
    const containerView = renderer.root.findAllByType(View)[0];

    // Aplanamos el objeto de estilos
    const flattenedStyle = StyleSheet.flatten(containerView.props.style);

    // 1. Validamos los insets del SafeArea (que definimos en el mock)
    expect(flattenedStyle.paddingTop).toBe(45);
    expect(flattenedStyle.paddingBottom).toBe(30);
    expect(flattenedStyle.paddingLeft).toBe(10);
    expect(flattenedStyle.paddingRight).toBe(15);

    // 2. Validamos el color del tema
    expect(flattenedStyle.backgroundColor).toBe("#MOCKED_FONDO");

    // 3. Validamos las propiedades estáticas definidas en el componente
    expect(flattenedStyle.flex).toBe(1);
    expect(flattenedStyle.alignItems).toBe("stretch");
    expect(flattenedStyle.justifyContent).toBe("flex-start");
  });
});
