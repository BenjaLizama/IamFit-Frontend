import { describe, expect, it } from "vitest";
import { isCurrentRoute, normalizeHref } from "./MainTabIcon.utils";

describe("MainTabIcon.utils", () => {
  it("normalizes href strings and objects", () => {
    expect(normalizeHref("/(main)/home")).toBe("/home");
    expect(normalizeHref({ pathname: "/(main)/profile", params: {} })).toBe(
      "/profile",
    );
  });

  it("returns empty string for undefined href", () => {
    expect(normalizeHref(undefined)).toBe("");
  });

  it("compares current route correctly", () => {
    expect(isCurrentRoute("/home", "/(main)/home")).toBe(true);
    expect(isCurrentRoute("/profile", "/(main)/home")).toBe(false);
  });
});

