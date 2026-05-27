import { describe, expect, it } from "vitest";
import { useProgressTaskCard } from "./useProgressTaskCard";

describe("useProgressTaskCard", () => {
  it("computes percentage from calories and goal", () => {
    expect(useProgressTaskCard({ actualCalories: 500, goal: 1000 }).progressPercentage).toBe(50);
    expect(useProgressTaskCard({ actualCalories: 1500, goal: 1000 }).progressPercentage).toBe(150);
  });
});

