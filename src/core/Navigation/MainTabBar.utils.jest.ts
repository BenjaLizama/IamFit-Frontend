import { describe, expect, it } from "vitest";
import {
  clampNumber,
  getBarLocationX,
  getDropletSkew,
  getMagnetizedIndicator,
  getRouteCenterX,
  getRouteIndexFromTouch,
  normalizeHref,
} from "./MainTabBar.utils";

describe("MainTabBar.utils", () => {
  it("normalizes grouped route segments", () => {
    expect(normalizeHref("/(main)/home")).toBe("/home");
    expect(normalizeHref({ pathname: "/(main)/feeding", params: {} })).toBe(
      "/feeding",
    );
  });

  it("clamps values correctly", () => {
    expect(clampNumber(10, 0, 20)).toBe(10);
    expect(clampNumber(-1, 0, 20)).toBe(0);
    expect(clampNumber(999, 0, 20)).toBe(20);
  });

  it("computes bar-local X and clamps to bounds", () => {
    expect(getBarLocationX(120, 100, 50)).toBe(70);
    expect(getBarLocationX(10, 100, 50)).toBe(0);
    expect(getBarLocationX(500, 100, 50)).toBe(100);
  });

  it("maps touch to closest route slot", () => {
    const width = 500;
    expect(getRouteIndexFromTouch(50, width)).toBe(0);
    expect(getRouteIndexFromTouch(150, width)).toBe(1);
    expect(getRouteIndexFromTouch(350, width)).toBe(2);
    expect(getRouteIndexFromTouch(450, width)).toBe(3);
  });

  it("returns magnetized indicator constrained to bar", () => {
    const width = 500;
    const result = getMagnetizedIndicator(20, width);
    expect(result.x).toBeGreaterThanOrEqual(29.5);
    expect(result.x).toBeLessThanOrEqual(width - 29.5);
    expect(result.stretch).toBeGreaterThanOrEqual(0);
    expect(result.stretch).toBeLessThanOrEqual(0.26);
  });

  it("computes droplet skew based on pull direction", () => {
    const width = 500;
    const centerSkew = getDropletSkew(50, width);
    const rightSkew = getDropletSkew(95, width);
    const leftSkew = getDropletSkew(5, width);

    expect(centerSkew).toBe(0);
    expect(rightSkew).toBeGreaterThan(0);
    expect(leftSkew).toBeLessThan(0);
  });

  it("gets center X for route index and fallback", () => {
    const width = 500;
    expect(getRouteCenterX(0, width)).toBe(50);
    expect(getRouteCenterX(1, width)).toBe(150);
    expect(getRouteCenterX(2, width)).toBe(350);
    expect(getRouteCenterX(3, width)).toBe(450);
    expect(getRouteCenterX(999, width)).toBe(50);
  });
});

