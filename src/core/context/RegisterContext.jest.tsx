import React from "react";
import { Text, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { RegisterProvider, useRegisterForm } from "./RegisterContext";

// 1. EL COMPONENTE DUMMY
const DummyConsumer = () => {
  const { formData, updateData, resetForm } = useRegisterForm();

  return (
    <View>
      <Text testID="state-output">{JSON.stringify(formData)}</Text>
      <Text
        testID="btn-update"
        onPress={() => updateData({ nickname: "TestUser", age: 25 })}
      />
      <Text testID="btn-reset" onPress={() => resetForm()} />
    </View>
  );
};

// 2. Helper de renderizado seguro
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

// 3. Helper para extraer el estado JSON del texto renderizado
const getContextState = (renderer: ReturnType<typeof TestRenderer.create>) => {
  const textNode = renderer.root.findByProps({ testID: "state-output" });
  return JSON.parse(textNode.props.children);
};

describe("RegisterContext", () => {
  it("provee los valores iniciales correctos", () => {
    const renderer = renderWithAct(
      <RegisterProvider>
        <DummyConsumer />
      </RegisterProvider>
    );

    const state = getContextState(renderer);

    expect(state).toEqual({
      age: 18,
      height: 170,
      weight: 75,
      sex: "MALE",
      email: "",
      nickname: "",
      password: "",
    });
  });

  it("actualiza parcialmente los datos manteniendo el resto intacto al llamar a updateData", () => {
    const renderer = renderWithAct(
      <RegisterProvider>
        <DummyConsumer />
      </RegisterProvider>
    );

    const btnUpdate = renderer.root.findByProps({ testID: "btn-update" });

    // Simulamos la interacción
    act(() => {
      btnUpdate.props.onPress();
    });

    const state = getContextState(renderer);

    // Verificamos que se actualizaron los campos enviados
    expect(state.nickname).toBe("TestUser");
    expect(state.age).toBe(25);

    // Verificamos que los demás campos siguen con su valor inicial
    expect(state.height).toBe(170);
    expect(state.sex).toBe("MALE");
  });

  it("restaura los valores iniciales al llamar a resetForm", () => {
    const renderer = renderWithAct(
      <RegisterProvider>
        <DummyConsumer />
      </RegisterProvider>
    );

    const btnUpdate = renderer.root.findByProps({ testID: "btn-update" });
    const btnReset = renderer.root.findByProps({ testID: "btn-reset" });

    // 1. Primero modificamos el estado
    act(() => {
      btnUpdate.props.onPress();
    });

    let state = getContextState(renderer);
    expect(state.nickname).toBe("TestUser");

    // 2. Luego disparamos el reset
    act(() => {
      btnReset.props.onPress();
    });

    state = getContextState(renderer);

    // 3. Verificamos que volvió todo a la normalidad
    expect(state.nickname).toBe("");
    expect(state.age).toBe(18);
  });
});
