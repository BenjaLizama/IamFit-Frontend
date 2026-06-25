import type { ReactElement } from "react";
import { ActivityIndicator, Pressable } from "react-native";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import CustomButton from "./CustomButton";

const renderWithAct = (element: ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;

  act(() => {
    renderer = TestRenderer.create(element);
  });

  if (!renderer) {
    throw new Error("No se pudo renderizar el componente");
  }

  return renderer;
};

// 1. Mockeamos el hook
vi.mock("./useCustomButton", () => ({
  useShrinkButton: () => ({
    LOADED_COLORS: { primary: "#000000" },
    scaleValue: { interpolate: vi.fn() },
    onPressIn: vi.fn(),
    onPressOut: vi.fn(),
  }),
}));

// 2. Mockeamos componentes visuales para simplificar el snapshot
vi.mock("../CustomText", () => ({
  default: ({ children }: any) => <>{children}</>,
}));

describe("CustomButton Component", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(
      <CustomButton type="primary" onPress={() => {}}>
        Click me
      </CustomButton>,
    );

    expect(renderer.toJSON()).toBeTruthy();
  });

  it("muestra ActivityIndicator cuando isLoading es true", () => {
    const renderer = renderWithAct(
      <CustomButton type="primary" isLoading={true}>
        Click me
      </CustomButton>,
    );

    const indicator = renderer.root.findAllByType(ActivityIndicator);
    expect(indicator.length).toBe(1);
  });

  it("llama al evento onPress cuando es presionado", () => {
    const onPressMock = vi.fn();

    const renderer = renderWithAct(
      <CustomButton type="primary" onPress={onPressMock}>
        Click me
      </CustomButton>,
    );

    const pressable = renderer.root.findByType(Pressable);
    pressable.props.onPress();

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta onPress si el botón está en estado loading o disabled", () => {
    const onPressMock = vi.fn();

    const renderer = renderWithAct(
      <CustomButton type="primary" onPress={onPressMock} isLoading={true}>
        Click me
      </CustomButton>,
    );

    const pressable = renderer.root.findByType(Pressable);
    // Verificamos que el prop disabled esté activo en el Pressable
    expect(pressable.props.disabled).toBe(true);
  });
});
