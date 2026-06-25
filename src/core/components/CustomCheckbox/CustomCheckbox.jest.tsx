import React from "react";
import { Pressable } from "react-native";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import CustomCheckbox from "./CustomCheckbox";

// 1. Mockeamos el componente REAL importado
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

describe("CustomCheckbox", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<CustomCheckbox checked={false} />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("dispara onPress al presionar", () => {
    const onPressMock = vi.fn();
    const renderer = renderWithAct(
      <CustomCheckbox checked={false} onPress={onPressMock} />,
    );

    // Usamos findByType con el componente real importado (esto sí tiene tipo válido)
    const pressable = renderer.root.findByType(Pressable);

    act(() => {
      pressable.props.onPress();
    });

    expect(onPressMock).toHaveBeenCalled();
  });

  it("muestra el icono cuando esta marcado", () => {
    const renderer = renderWithAct(<CustomCheckbox checked={true} />);

    // SOLUCIÓN FINAL: No usamos findByType con strings.
    // Usamos findByProps buscando por las propiedades que sabemos que tiene el icono.
    // Esto es compatible con TypeScript en cualquier escenario.
    const icon = renderer.root.findByProps({ name: "checkmark" });

    expect(icon).toBeDefined();
    expect(icon.props.name).toBe("checkmark");
  });
});
