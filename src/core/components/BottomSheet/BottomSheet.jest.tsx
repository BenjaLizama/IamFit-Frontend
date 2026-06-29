import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import { RendererType } from "../../types/RenderType";
import { BottomSheet } from "./BottomSheet";

const renderWithAct = (element: React.ReactElement): RendererType => {
  let renderer: RendererType | null = null;

  act(() => {
    renderer = TestRenderer.create(element);
  });

  if (!renderer) {
    throw new Error("No se pudo renderizar el componente");
  }

  return renderer;
};

// 1. Mock de librerías externas
vi.mock("@gorhom/bottom-sheet", () => ({
  __esModule: true,
  // Mock del componente principal
  default: vi.fn(({ children, ...props }) =>
    React.createElement(
      "mock-bottom-sheet",
      { ...props, testID: "bottom-sheet-mock" },
      children,
    ),
  ),
  // Mock de componentes secundarios
  BottomSheetScrollView: vi.fn(({ children, ...props }) =>
    React.createElement("mock-scroll-view", props, children),
  ),
  useBottomSheetSpringConfigs: vi.fn(() => ({})),
  BottomSheetBackdrop: vi.fn(() => null),
}));

// 2. Mock del hook. Nota: simulamos la estructura que devuelve tu archivo `useBottomSheet`
vi.mock("./useBottomSheet", () => ({
  useBottomSheet: () => ({
    sheetRef: { current: null },
    snapPoints: ["85%"],
    renderBackdrop: () => null,
    openSheet: vi.fn(),
    closeSheet: vi.fn(),
  }),
}));

// 3. Mock de utilidades
vi.mock("@/src/core/utils", () => ({
  wp: (val: number) => val,
  hp: (val: number) => val,
}));

describe("BottomSheet Component", () => {
  it("se renderiza correctamente con el contenido proporcionado", () => {
    const renderer = renderWithAct(
      <BottomSheet>
        <Text>Contenido de prueba</Text>
      </BottomSheet>,
    );
    const root = renderer.root;

    // Verificamos que el mock del BottomSheet existe
    const bottomSheet = root.findByProps({ testID: "bottom-sheet-mock" });
    expect(bottomSheet).toBeDefined();

    // Verificamos que el componente Text (hijo) se haya renderizado dentro
    const textComponent = root.findByType(Text);
    expect(textComponent.props.children).toBe("Contenido de prueba");
  });

  it("pasa las propiedades correctas al componente de Gorhom", () => {
    const renderer = renderWithAct(
      <BottomSheet>
        <Text>Test</Text>
      </BottomSheet>,
    );

    const bottomSheet = renderer.root.findByProps({
      testID: "bottom-sheet-mock",
    });

    // Validamos que el BottomSheet reciba las props que definiste en tu componente
    expect(bottomSheet.props.index).toBe(-1);
    expect(bottomSheet.props.enablePanDownToClose).toBe(true);
    expect(bottomSheet.props.snapPoints).toEqual(["85%"]);
  });
});
