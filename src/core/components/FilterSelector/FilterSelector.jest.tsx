import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import TestRenderer, { act, type ReactTestRenderer } from "react-test-renderer";
import { beforeEach, describe, expect, it, vi } from "vitest";
import FilterSelector from "./FilterSelector";

// 1. Mock de las utilidades (porque los estilos usan wp y hp)
vi.mock("@/src/core/utils", () => ({
  hp: vi.fn((val: number) => val),
  wp: vi.fn((val: number) => val),
}));

// 2. Mock del Tema (Añadido UI para que los estilos no fallen)
vi.mock("@/src/theme", () => ({
  COLOR: {
    FONDO: "#MOCKED_FONDO",
    FONDO_OPACO2: "#MOCKED_FONDO_OPACO",
  },
  UI: {
    extra_large_radius: 20, // Agregado para que no falle la línea 9 de tus estilos
  },
}));

// 3. Mock de CustomCarousel (solo un contenedor simple)
vi.mock("../CustomCarousel", () => {
  const MockCarousel = (props: any) => (
    <View testID="mock-carousel">{props.children}</View>
  );
  MockCarousel.displayName = "MockCarousel";
  return { __esModule: true, default: MockCarousel };
});

// 4. Mock de CustomText
vi.mock("../CustomText", () => {
  const MockCustomText = React.forwardRef((props: any, ref: any) => (
    // TRUCO: Inyectamos el texto del hijo en el testID para encontrarlo fácilmente luego
    <Text testID={`mock-custom-text-${props.children}`} {...props}>
      {props.children}
    </Text>
  ));
  MockCustomText.displayName = "MockCustomText";
  return { __esModule: true, default: MockCustomText };
});

// 5. Mock del Hook
const mockSelectFilter = vi.fn();
const mockIsFilterSelected = vi.fn((index: number) => index === 0);

vi.mock("./useFilterSelector", () => ({
  useFilterSelector: vi.fn(() => ({
    selectFilter: mockSelectFilter,
    isFilterSelected: mockIsFilterSelected,
  })),
}));

const renderWithAct = (element: React.ReactElement): ReactTestRenderer => {
  let renderer: ReactTestRenderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar");
  return renderer;
};

describe("FilterSelector", () => {
  const filterList = ["Filtros A", "Filtros B", "Filtros C"];
  const onFilterChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("se renderiza correctamente y muestra todos los filtros", () => {
    const renderer = renderWithAct(
      <FilterSelector
        filterList={filterList}
        onFilterChange={onFilterChangeMock}
      />,
    );
    expect(renderer.toJSON()).not.toBeNull();

    // Validamos que se renderice un TouchableOpacity por cada elemento del array
    const touchables = renderer.root.findAllByType(TouchableOpacity);
    expect(touchables.length).toBe(filterList.length);
  });

  it("llama a selectFilter con el indice correcto al presionar una opcion", () => {
    const renderer = renderWithAct(
      <FilterSelector
        filterList={filterList}
        onFilterChange={onFilterChangeMock}
      />,
    );

    const touchables = renderer.root.findAllByType(TouchableOpacity);

    // Simulamos el click en el segundo filtro (índice 1)
    act(() => {
      touchables[1].props.onPress();
    });

    // Verificamos que el hook recibió la orden de seleccionar el índice 1
    expect(mockSelectFilter).toHaveBeenCalledWith(1);
  });

  it("pasa el color correcto al CustomText dependiendo de si esta seleccionado", () => {
    const renderer = renderWithAct(
      <FilterSelector
        filterList={filterList}
        onFilterChange={onFilterChangeMock}
      />,
    );

    // 1. Buscamos el elemento que SÍ está seleccionado (índice 0, "Filtros A")
    const textSelected = renderer.root.findByProps({
      testID: "mock-custom-text-Filtros A",
    });
    expect(textSelected.props.color).toBe("#MOCKED_FONDO");

    // 2. Buscamos un elemento que NO está seleccionado (índice 1, "Filtros B")
    const textUnselected = renderer.root.findByProps({
      testID: "mock-custom-text-Filtros B",
    });
    expect(textUnselected.props.color).toBe("");
  });
});
