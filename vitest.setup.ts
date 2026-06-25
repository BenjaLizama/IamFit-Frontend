import React from "react";
import { vi } from "vitest";

vi.mock("@/src/theme/fonts", () => ({
  FONTS_TO_LOAD: {},
  FONT: {
    PRINCIPAL_BOLD: "System",
    PRINCIPAL_MEDIUM: "System",
    PRINCIPAL_REGULAR: "System",
  },
}));

vi.mock("@/src/theme", async () => {
  const actual = await vi.importActual("./src/theme");
  return {
    ...(actual as object),
    FONTS_TO_LOAD: {},
    FONT: {
      PRINCIPAL_BOLD: "System",
      PRINCIPAL_MEDIUM: "System",
      PRINCIPAL_REGULAR: "System",
    },
  };
});

vi.mock("expo-haptics", () => ({
  selectionAsync: vi.fn(),
  impactAsync: vi.fn(),
  ImpactFeedbackStyle: { Light: "Light" },
}));

vi.mock("expo-router", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn(), back: vi.fn() }),
  usePathname: () => "/home",
}));

vi.mock("react-native-reanimated", () => {
  const noOp = () => {};
  return {
    __esModule: true,
    default: {
      View: "View",
      Text: "Text",
      ScrollView: "ScrollView",
      createAnimatedComponent: (component: unknown) => component,
      event: () => noOp,
    },
    createAnimatedComponent: (component: unknown) => component,
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: (factory: () => object) => factory(),
    withSpring: (value: unknown) => value,
    withTiming: (value: unknown) => value,
    withSequence: (...values: unknown[]) => values[values.length - 1],
    FadeIn: { duration: () => ({}) },
    FadeOut: { duration: () => ({}) },
  };
});

vi.mock("react-native-safe-area-context", () => {
  const SafeAreaView = ({ children }: { children: React.ReactNode }) =>
    children;
  return {
    SafeAreaView,
    SafeAreaProvider: SafeAreaView,
    useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
  };
});

vi.mock("react-native-svg", () => {
  const Mock = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);
  return {
    default: Mock,
    Svg: Mock,
    Circle: Mock,
    Path: Mock,
    Rect: Mock,
    G: Mock,
  };
});

vi.mock("@gorhom/bottom-sheet", () => {
  const MockBottomSheet = ({ children }: { children?: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children);

  return {
    __esModule: true,
    default: MockBottomSheet,
    BottomSheetBackdrop: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    BottomSheetScrollView: ({ children }: { children?: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    useBottomSheetSpringConfigs: () => ({}),
  };
});

vi.mock("react-native-gesture-handler", async () => {
  const actual = await vi.importActual("react-native");
  return {
    ...(actual as object),
    ScrollView: (actual as { ScrollView: unknown }).ScrollView,
    GestureHandlerRootView: ({ children }: { children: React.ReactNode }) =>
      children,
  };
});
