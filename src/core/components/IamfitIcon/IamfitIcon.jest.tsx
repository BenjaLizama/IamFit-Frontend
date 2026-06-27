import React from "react";
import { Image, View } from "react-native";
import TestRenderer, { act } from "react-test-renderer"; // Quitamos el type ReactTestRenderer
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import IamfitIcon from "./IamfitIcon";

// 1. Cargamos el módulo y guardamos la referencia original correctamente
const Module = require("module");
const originalRequire = Module.prototype.require;

describe("IamfitIcon", () => {
  // 2. Hackeamos Node.js para interceptar la imagen
  beforeAll(() => {
    (Module.prototype as any).require = function (id: string) {
      if (id === "@/assets/images/icon.png") {
        return "mocked-image-path";
      }
      return originalRequire.apply(this, arguments as any);
    };
  });

  // 3. Restauramos todo al final
  afterAll(() => {
    (Module.prototype as any).require = originalRequire;
  });

  // 4. Usamos ReturnType para evitar el error del namespace
  const renderWithAct = (
    element: React.ReactElement,
  ): ReturnType<typeof TestRenderer.create> => {
    let renderer: ReturnType<typeof TestRenderer.create> | null = null;
    act(() => {
      renderer = TestRenderer.create(element);
    });
    if (!renderer) throw new Error("No se pudo renderizar");
    return renderer;
  };

  it("se renderiza correctamente", () => {
    const renderer = renderWithAct(<IamfitIcon />);
    expect(renderer.toJSON()).not.toBeNull();
  });

  it("contiene un contenedor principal View", () => {
    const renderer = renderWithAct(<IamfitIcon />);
    const views = renderer.root.findAllByType(View);
    expect(views.length).toBeGreaterThan(0);
  });

  it("renderiza el componente Image correctamente", () => {
    const renderer = renderWithAct(<IamfitIcon />);
    const image = renderer.root.findByType(Image);

    expect(image).toBeDefined();
    // Validamos que Node.js inyectó nuestro string con éxito
    expect(image.props.source).toBe("mocked-image-path");
  });
});
