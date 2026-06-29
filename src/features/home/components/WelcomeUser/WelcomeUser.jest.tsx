import React from "react";
import { Text } from "react-native";
import TestRenderer, { act } from "react-test-renderer";
import { describe, expect, it } from "vitest";
import WelcomeUser from "./WelcomeUser";

type Renderer = ReturnType<typeof TestRenderer.create>;
type TextNode = { props: { children: React.ReactNode } };

const renderWithAct = (element: React.ReactElement): Renderer => {
  let renderer: Renderer | null = null;
  act(() => {
    renderer = TestRenderer.create(element);
  });
  if (!renderer) throw new Error("No se pudo renderizar WelcomeUser");
  return renderer;
};

const getGreeting = (renderer: Renderer) =>
  renderer.root.findByType(Text).props.children as string;

describe("WelcomeUser", () => {
  it("saluda al usuario por su nombre dentro del resumen diario", () => {
    // Este test valida que el home personalice el saludo cuando recibe un nombre.
    const renderer = renderWithAct(<WelcomeUser name="Nicolas" />);

    expect(getGreeting(renderer)).toBe(
      "Buenas tardes, Nicolas, aqui esta tu resumen diario.",
    );
  });

  it("usa usuario como nombre por defecto cuando no recibe nombre", () => {
    // Este test valida el fallback del saludo para sesiones sin nombre disponible.
    const renderer = renderWithAct(<WelcomeUser name={null} />);

    expect(getGreeting(renderer)).toBe(
      "Buenas tardes, usuario, aqui esta tu resumen diario.",
    );
  });
});
