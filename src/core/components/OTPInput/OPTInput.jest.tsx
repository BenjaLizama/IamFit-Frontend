import React from "react";
import { Pressable, Text, TextInput } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import OTPInput from "./OTPInput";

// 1. Mock de CustomText corregido
vi.mock("../CustomText", () => {
  // Extraemos children y evitamos usar {...props} en el Text nativo
  // para no duplicar las propiedades en el árbol de renderizado de pruebas.
  const MockCustomText = React.forwardRef(({ children }: any, ref: any) => (
    <Text testID={`mock-custom-text-${children}`}>{children}</Text>
  ));
  MockCustomText.displayName = "MockCustomText";
  return { __esModule: true, default: MockCustomText };
});

// 2. Mock del Hook
const mockHandlePress = vi.fn();
const mockHandleChange = vi.fn();
const mockInputRef = React.createRef<TextInput>();

vi.mock("./useOTPInput", () => ({
  useOTPInput: vi.fn(() => ({
    inputRef: mockInputRef,
    // Simulamos un estado donde el usuario ya escribió "12" en un OTP de 5 dígitos
    cells: [
      { index: 0, char: "1", isFilled: true, isActive: false },
      { index: 1, char: "2", isFilled: true, isActive: false },
      { index: 2, char: "", isFilled: false, isActive: true },
      { index: 3, char: "", isFilled: false, isActive: false },
      { index: 4, char: "", isFilled: false, isActive: false },
    ],
    handlePress: mockHandlePress,
    handleChange: mockHandleChange,
  })),
}));

// 3. Helper de renderizado seguro
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

describe("OTPInput", () => {
  const defaultProps = {
    value: "12",
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<OTPInput {...defaultProps} />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("renderiza la cantidad correcta de celdas según el hook", () => {
    const renderer = renderWithAct(<OTPInput {...defaultProps} />);

    // Ahora esto encontrará exactamente 5, porque el Text nativo ya no hereda la prop 'type'
    const customTexts = renderer.root.findAllByProps({ type: "body" });

    expect(customTexts.length).toBe(5);
  });

  it("llama a handlePress al presionar el contenedor principal", () => {
    const renderer = renderWithAct(<OTPInput {...defaultProps} />);

    const pressable = renderer.root.findByType(Pressable);

    act(() => {
      pressable.props.onPress();
    });

    expect(mockHandlePress).toHaveBeenCalledTimes(1);
  });

  it("llama a handleChange cuando el TextInput oculto recibe texto", () => {
    const renderer = renderWithAct(<OTPInput {...defaultProps} />);

    const textInput = renderer.root.findByType(TextInput);

    act(() => {
      textInput.props.onChangeText("123");
    });

    expect(mockHandleChange).toHaveBeenCalledWith("123");
  });
});
