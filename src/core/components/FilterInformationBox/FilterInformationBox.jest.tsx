import React from "react";
import { Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import { RendererType } from "../../types/RenderType";
import FilterInformationBox from "./FilterInformationBox";

// 1. Mockeamos tanto "hp" como "wp" para que los estilos no fallen al importarlos
vi.mock("@/src/core/utils", () => ({
  hp: vi.fn((val: number) => val),
  wp: vi.fn((val: number) => val),
}));

// 2. Mockeamos los colores del tema
vi.mock("@/src/theme/colors", () => ({
  COLOR: {
    FILTER_INFORMATION_BOX: "#MOCKED_COLOR",
  },
}));

// 3. Mockeamos CustomText
vi.mock("../CustomText", () => {
  const MockCustomText = React.forwardRef((props: any, ref: any) => {
    return (
      <Text testID="mock-custom-text" {...props}>
        {props.children}
      </Text>
    );
  });
  MockCustomText.displayName = "MockCustomText";

  return {
    __esModule: true,
    default: MockCustomText,
  };
});

const renderWithAct = (element: React.ReactElement): RendererType => {
  let renderer: RendererType | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("FilterInformationBox", () => {
  it("se renderiza correctamente con el texto proporcionado", () => {
    const renderer = renderWithAct(
      <FilterInformationBox>Texto del filtro</FilterInformationBox>,
    );
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("aplica el color de fondo personalizado al contenedor", () => {
    const testColor = "#FF5733";
    const renderer = renderWithAct(
      <FilterInformationBox color={testColor}>Filtro</FilterInformationBox>,
    );

    const containerView = renderer.root.findAllByType(View)[0];

    expect(containerView.props.style).toContainEqual({
      backgroundColor: testColor,
    });
  });

  it("pasa las propiedades correctas al CustomText", () => {
    const renderer = renderWithAct(
      <FilterInformationBox>Etiqueta</FilterInformationBox>,
    );

    const customTextMock = renderer.root.findByProps({
      testID: "mock-custom-text",
    });

    expect(customTextMock.props.type).toBe("button_secondary");
    expect(customTextMock.props.size).toBe(12);
    expect(customTextMock.props.color).toBe("#MOCKED_COLOR");
    expect(customTextMock.props.children).toBe("Etiqueta");
  });
});
