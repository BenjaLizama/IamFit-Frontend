import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SuccessResult from "./SuccessResult";

// 1. Mock de Ionicons
vi.mock("@expo/vector-icons", () => ({
  // Inyectamos el nombre del icono en el testID para encontrarlo fácilmente
  Ionicons: (props: any) => (
    <Text testID={`mock-ionicons-${props.name}`} {...props} />
  ),
}));

// 2. Mock de CustomText
vi.mock("../CustomText", () => {
  const MockCustomText = React.forwardRef(
    ({ children, ...props }: any, ref: any) => (
      <Text testID={`mock-custom-text-${children}`} {...props}>
        {children}
      </Text>
    )
  );
  MockCustomText.displayName = "MockCustomText";
  return { __esModule: true, default: MockCustomText };
});

// 3. Mock de CustomButton
vi.mock("../CustomButton", () => {
  const MockCustomButton = React.forwardRef(
    ({ children, onPress, ...props }: any, ref: any) => (
      // Le pasamos el onPress al Text del mock para simular el evento de forma nativa
      <Text
        testID={`mock-custom-button-${children}`}
        onPress={onPress}
        {...props}
      >
        {children}
      </Text>
    )
  );
  MockCustomButton.displayName = "MockCustomButton";
  return { __esModule: true, default: MockCustomButton };
});

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

describe("SuccessResult", () => {
  const defaultProps = {
    title: "¡Operación Exitosa!",
    buttonLabel: "Continuar",
    onPress: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<SuccessResult {...defaultProps} />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("muestra el título con el tipo de texto correcto", () => {
    const renderer = renderWithAct(<SuccessResult {...defaultProps} />);

    // Usamos el testID dinámico que creamos en el mock
    const titleElement = renderer.root.findByProps({
      testID: `mock-custom-text-${defaultProps.title}`,
    });

    expect(titleElement).toBeDefined();
    // Validamos que el CustomText recibió la prop type="h1"
    expect(titleElement.props.type).toBe("h1");
  });

  it("renderiza el icono checkmark de Ionicons con tamaño y color correctos", () => {
    const renderer = renderWithAct(<SuccessResult {...defaultProps} />);

    const iconElement = renderer.root.findByProps({
      testID: "mock-ionicons-checkmark",
    });

    expect(iconElement).toBeDefined();
    expect(iconElement.props.size).toBe(48);
    expect(iconElement.props.color).toBe("#FFFFFF");
  });

  it("pasa las props al CustomButton y ejecuta onPress al interactuar", () => {
    const renderer = renderWithAct(<SuccessResult {...defaultProps} />);

    const buttonElement = renderer.root.findByProps({
      testID: `mock-custom-button-${defaultProps.buttonLabel}`,
    });

    // Verificamos que se le pase el type="primary"
    expect(buttonElement.props.type).toBe("primary");

    // Simulamos la interacción de presionar el botón
    act(() => {
      buttonElement.props.onPress();
    });

    // Comprobamos que la función recibida por props fue llamada
    expect(defaultProps.onPress).toHaveBeenCalledTimes(1);
  });
});
