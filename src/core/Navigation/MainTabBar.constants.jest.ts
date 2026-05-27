import { describe, expect, it } from "vitest";
import {
  MAIN_TABS,
  ROUTE_SLOT_INDEXES,
  TOUCH_INDICATOR_SIZE,
  TOUCH_INDICATOR_STICKINESS,
  VISUAL_SLOT_COUNT,
} from "./MainTabBar.constants";

describe("MainTabBar.constants", () => {
  it("keeps tab route structure stable", () => {
    expect(MAIN_TABS).toEqual([
      "/(main)/home",
      "/(main)/feeding",
      "/(main)/routine",
      "/(main)/profile",
    ]);
  });

  it("keeps touch indicator constants stable", () => {
    expect(TOUCH_INDICATOR_SIZE).toBe(59);
    expect(VISUAL_SLOT_COUNT).toBe(5);
    expect(ROUTE_SLOT_INDEXES).toEqual([0, 1, 3, 4]);
    expect(TOUCH_INDICATOR_STICKINESS).toBe(0.22);
  });
});

