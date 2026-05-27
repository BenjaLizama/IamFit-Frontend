import { describe, expect, it } from "vitest";
import { useWelcomeUser } from "./useWelcomeUser";

describe("useWelcomeUser", () => {
  it("returns provided name", () => {
    expect(useWelcomeUser({ name: "Ben" }).formatedName).toBe("Ben");
  });

  it("falls back to usuario for undefined", () => {
    expect(useWelcomeUser({ name: undefined }).formatedName).toBe("usuario");
  });

  it("falls back to usuario for null", () => {
    expect(useWelcomeUser({ name: null as unknown as string }).formatedName).toBe(
      "usuario",
    );
  });
});

