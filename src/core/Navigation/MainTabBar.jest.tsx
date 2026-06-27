import React from "react";
import { View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import MainTabBar from "./MainTabBar";
import { useMainTabBar } from "./useMainTabBar";

// 1. Mock de Reanimated
vi.mock("react-native-reanimated", () => {
  const MockAnimatedView = React.forwardRef((props: any, ref: any) => (
    <View ref={ref} {...props} />
  ));
  MockAnimatedView.displayName = "MockAnimatedView";

  return {
    __esModule: true,
    default: {
      View: MockAnimatedView,
    },
  };
});

// 2. Mock del Hook
vi.mock("./useMainTabBar", () => ({
  useMainTabBar: vi.fn(),
}));

// 3. Mock del Tema
vi.mock("@/src/theme", () => ({
  COLOR: { FONDO: "#FONDO", AZUL_PRIMARIO: "#AZUL" },
}));

// 4. Mock de los componentes hijos complejos
vi.mock("@/src/core/components/ExpandableScreen", () => ({
  __esModule: true,
  default: (props: any) => <View testID="mock-expandable-screen" {...props} />,
}));
vi.mock("@/src/features/(m.i.a)/layout/MiaHeader", () => ({
  __esModule: true,
  default: () => <View testID="mock-mia-header" />,
}));
vi.mock("@/src/features/(m.i.a)/screens/MiaChatScreen", () => ({
  __esModule: true,
  default: () => <View testID="mock-mia-chat" />,
}));

// 5. Mock de MainTabIcon
vi.mock("./components/MainTabIcon/MainTabIcon", () => {
  const MockMainTabIcon = React.forwardRef((props: any, ref: any) => (
    <View testID={`mock-main-tab-icon-${props.href || "big"}`} {...props}>
      {props.children}
    </View>
  ));
  MockMainTabIcon.displayName = "MockMainTabIcon";
  return { __esModule: true, default: MockMainTabIcon };
});

// 6. Mock de los SVGs
vi.mock("@/assets/images/Icons/ai-commentary.svg", () => ({
  default: () => <View testID="svg-ai" />,
}));
vi.mock("@/assets/images/Icons/chart.svg", () => ({
  default: () => <View testID="svg-chart" />,
}));
vi.mock("@/assets/images/Icons/home.svg", () => ({
  default: () => <View testID="svg-home" />,
}));
vi.mock("@/assets/images/Icons/people.svg", () => ({
  default: () => <View testID="svg-people" />,
}));
vi.mock("@/assets/images/Icons/profile.svg", () => ({
  default: () => <View testID="svg-profile" />,
}));

// Helper de renderizado seguro
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

describe("MainTabBar", () => {
  const mockHandleLayout = vi.fn();
  const mockSetIsExpandableOpen = vi.fn();
  const mockUseMainTabBar = useMainTabBar as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Estado inicial por defecto del hook para las pruebas
    mockUseMainTabBar.mockReturnValue({
      barRef: React.createRef(),
      handleLayout: mockHandleLayout,
      isExpandableOpen: false,
      panResponder: { panHandlers: { onStartShouldSetResponder: vi.fn() } },
      setIsExpandableOpen: mockSetIsExpandableOpen,
      touchIndicatorStyle: { transform: [] },
    });
  });

  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<MainTabBar />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("renderiza todos los MainTabIcons con sus rutas correctas", () => {
    const renderer = renderWithAct(<MainTabBar />);

    // Verificamos que las rutas existen mediante los testIDs generados en el mock
    expect(
      renderer.root.findByProps({ testID: "mock-main-tab-icon-/(main)/home" })
    ).toBeDefined();
    expect(
      renderer.root.findByProps({
        testID: "mock-main-tab-icon-/(main)/feeding",
      })
    ).toBeDefined();
    expect(
      renderer.root.findByProps({
        testID: "mock-main-tab-icon-/(main)/routine",
      })
    ).toBeDefined();
    expect(
      renderer.root.findByProps({
        testID: "mock-main-tab-icon-/(main)/profile",
      })
    ).toBeDefined();
  });

  it("deshabilita los iconos de navegación si isExpandableOpen es true", () => {
    // Sobrescribimos el mock del hook solo para este test
    mockUseMainTabBar.mockReturnValueOnce({
      barRef: React.createRef(),
      handleLayout: mockHandleLayout,
      isExpandableOpen: true, // ¡Abierto!
      panResponder: { panHandlers: {} },
      setIsExpandableOpen: mockSetIsExpandableOpen,
      touchIndicatorStyle: {},
    });

    const renderer = renderWithAct(<MainTabBar />);

    const homeIcon = renderer.root.findByProps({
      testID: "mock-main-tab-icon-/(main)/home",
    });

    // Validamos que el prop 'disabled' se haya propagado a los iconos
    expect(homeIcon.props.disabled).toBe(true);
  });

  it("renderiza el ExpandableScreen pasándole los componentes correctos y el estado", () => {
    const renderer = renderWithAct(<MainTabBar />);

    const expandableScreen = renderer.root.findByProps({
      testID: "mock-expandable-screen",
    });

    expect(expandableScreen).toBeDefined();
    expect(expandableScreen.props.variant).toBe("chat");
    // Verificamos que le pasó la función del hook
    expect(expandableScreen.props.onExpandedChange).toBe(
      mockSetIsExpandableOpen
    );
  });
});
