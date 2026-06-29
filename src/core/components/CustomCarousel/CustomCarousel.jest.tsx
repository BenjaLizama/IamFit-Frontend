import React from "react";
import { View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import { RendererType } from "../../types/RenderType";
import CustomCarousel from "./CustomCarousel";

// 2. Mocks integrados
vi.mock("./useCustomCarousel", () => ({
  useCustomCarousel: () => ({
    initialContentOffset: { x: 0, y: 0 },
    scrollRef: { current: null },
    INTERVAL: 75,
  }),
}));

vi.mock("react-native-gesture-handler", () => ({
  // Definimos el componente directamente aquí, evitando referencias a variables externas
  ScrollView: (props: any) => React.createElement(View, props, props.children),
}));

const renderWithAct = (element: React.ReactElement): RendererType => {
  let renderer: RendererType | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("CustomCarousel Component", () => {
  it("se renderiza correctamente con hijos", () => {
    const renderer = renderWithAct(
      <CustomCarousel>
        <View testID="child-1" />
        <View testID="child-2" />
      </CustomCarousel>,
    );

    // En lugar de buscar por MockScrollView, busca por el componente de React Native View
    // que es lo que nuestro mock está devolviendo realmente.
    const views = renderer.root.findAllByType(View);
    // El primer View es el contenedor principal, los siguientes son los hijos
    expect(views.length).toBeGreaterThanOrEqual(2);
  });

  it("pasa las props correctas al ScrollView", () => {
    const renderer = renderWithAct(
      <CustomCarousel>
        <View />
      </CustomCarousel>,
    );

    // Buscamos el componente que reemplazó a ScrollView
    const scrollView = renderer.root.findByProps({ snapToInterval: 75 });
    expect(scrollView).toBeDefined();
    expect(scrollView.props.horizontal).toBe(true);
  });
});
