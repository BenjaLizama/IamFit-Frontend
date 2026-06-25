import React from "react";
import { Text, TextInput } from "react-native";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import CustomFormInput from "./CustomFormInput";

// 1. Mock de Ionicons (evita problemas de fuentes)
vi.mock("@expo/vector-icons", () => ({
  Ionicons: (props: any) => React.createElement("mock-icon", props),
}));

const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("CustomFormInput", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(
      <CustomFormInput placeholder="Test input" />,
    );
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("muestra el error cuando se proporciona la prop error", () => {
    const errorMessage = "Campo obligatorio";
    const renderer = renderWithAct(<CustomFormInput error={errorMessage} />);

    // 1. Buscamos todos los componentes Text
    const allTexts = renderer.root.findAllByType(Text);

    // 2. Filtramos el que contiene nuestro mensaje de error
    const errorText = allTexts.find(
      (node) => node.props.children === errorMessage,
    );

    // 3. Verificamos que existe
    expect(errorText).toBeDefined();

    // 4. Verificamos que el estilo sea el correcto (opcional pero recomendado)
    // Asumiendo que styles.errorText es el estilo principal
    expect(errorText?.props.style).toContainEqual(
      expect.objectContaining({
        /* alguna propiedad de styles.errorText si fuera necesario */
      }),
    );
  });

  it("alterna la visibilidad de la contraseña al presionar el toggle", () => {
    const renderer = renderWithAct(<CustomFormInput secureTextEntry={true} />);

    // 1. Buscamos el botón de toggle por su accessibilityLabel
    const toggle = renderer.root.findByProps({
      accessibilityLabel: "Mostrar contraseña",
    });
    const input = renderer.root.findByType(TextInput);

    // Inicialmente es secureTextEntry
    expect(input.props.secureTextEntry).toBe(true);

    // 2. Simulamos el click
    act(() => {
      toggle.props.onPress();
    });

    // 3. Verificamos que cambió a no ser seguro
    const inputUpdated = renderer.root.findByType(TextInput);
    expect(inputUpdated.props.secureTextEntry).toBe(false);
  });

  it("deshabilita el toggle cuando el input está deshabilitado", () => {
    const renderer = renderWithAct(
      <CustomFormInput secureTextEntry={true} editable={false} />,
    );

    const toggle = renderer.root.findByProps({
      accessibilityLabel: "Mostrar contraseña",
    });
    expect(toggle.props.disabled).toBe(true);
  });
});
