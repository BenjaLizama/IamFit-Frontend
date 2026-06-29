import React from "react";
import { Pressable, Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it, vi } from "vitest";
import { RendererType } from "../../types/RenderType";
import ExpandableScreen from "./ExpandableScreen";

// 1. Mock de Reanimated y Haptics
vi.mock("react-native-reanimated", () => {
  const mockAnimation = {
    duration: vi.fn().mockReturnThis(),
    delay: vi.fn().mockReturnThis(),
    springify: vi.fn().mockReturnThis(),
  };

  // Extraemos el componente mock a una variable para asignarle el displayName y evitar warnings de ESLint
  const MockAnimatedView = React.forwardRef((props: any, ref: any) => {
    React.useImperativeHandle(ref, () => ({
      measureInWindow: (
        cb: (x: number, y: number, w: number, h: number) => void,
      ) => {
        // Simulamos que el componente está en X:0, Y:0 con ancho 300 y alto 500
        cb(0, 0, 300, 500);
      },
    }));
    return <View {...props} />;
  });

  // Solución al error: "Component definition is missing display name"
  MockAnimatedView.displayName = "MockAnimatedView";

  return {
    __esModule: true,
    default: {
      View: MockAnimatedView,
    },
    FadeIn: mockAnimation,
    FadeOut: mockAnimation,
    useAnimatedStyle: vi.fn(() => ({})),
    useSharedValue: vi.fn(() => ({ value: 0 })),
    interpolate: vi.fn(),
    withSpring: vi.fn(),
    withTiming: vi.fn(),
    Extrapolation: { CLAMP: "clamp" },
  };
});

vi.mock("expo-haptics", () => ({ selectionAsync: vi.fn() }));

// 2. Mock del hook usando vi.fn()
const mockExpand = vi.fn();

vi.mock("./useExpandableScreen", () => ({
  useExpandableScreen: vi.fn(() => ({
    isExpanded: false,
    animatedStyle: {},
    backdropStyle: {},
    headerSmallStyle: {},
    headerLargeStyle: {},
    transitionContentStyle: {},
    bodyAnimatedStyle: {},
    initialDims: { h: 100 },
    pressAnimationStyle: {},
    collapse: vi.fn(),
    expand: mockExpand,
    setInitialDims: vi.fn(),
    handlePressIn: vi.fn(),
    handlePressOut: vi.fn(),
  })),
}));

const renderWithAct = (element: React.ReactElement): RendererType => {
  let renderer: RendererType | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("ExpandableScreen", () => {
  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(
      <ExpandableScreen
        children1={<Text>Header</Text>}
        children2={<Text>Body</Text>}
        headerChildren={<View />}
      />,
    );
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("llama a expand cuando se presiona children1", () => {
    const renderer = renderWithAct(
      <ExpandableScreen
        children1={<Text>Click</Text>}
        children2={<View />}
        headerChildren={<View />}
      />,
    );

    // Obtenemos todos los Pressables y nos quedamos con el principal
    const pressables = renderer.root.findAllByType(Pressable);

    act(() => {
      pressables[0].props.onPress();
    });

    // Validamos que se llamó a la función
    expect(mockExpand).toHaveBeenCalled();
  });
});
