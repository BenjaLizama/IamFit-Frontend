import React from "react";
import { Text } from "react-native";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import CustomText from "./CustomText";

const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("CustomText", () => {
  it("se renderiza correctamente con texto", () => {
    const textContent = "Hola Mundo";
    const renderer = renderWithAct(
      <CustomText type="body">{textContent}</CustomText>,
    );

    const textNode = renderer.root.findByType(Text);
    expect(textNode.props.children).toBe(textContent);
  });

  it("aplica correctamente el color cuando se pasa la prop", () => {
    const color = "#FF0000";
    const renderer = renderWithAct(
      <CustomText type="body" color={color}>
        Texto
      </CustomText>,
    );

    const textNode = renderer.root.findByType(Text);
    // Verificamos que el estilo contenga el color inyectado
    expect(textNode.props.style).toContainEqual({ color: color });
  });

  it("aplica correctamente el tamaño (fontSize) cuando se pasa la prop", () => {
    const size = 20;
    const renderer = renderWithAct(
      <CustomText type="body" size={size}>
        Texto
      </CustomText>,
    );

    const textNode = renderer.root.findByType(Text);
    expect(textNode.props.style).toContainEqual({ fontSize: size });
  });

  it("ejecuta onPress cuando se presiona", () => {
    const onPressMock = vi.fn();
    const renderer = renderWithAct(
      <CustomText type="body" onPress={onPressMock}>
        Click
      </CustomText>,
    );

    const textNode = renderer.root.findByType(Text);
    act(() => {
      textNode.props.onPress();
    });

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
