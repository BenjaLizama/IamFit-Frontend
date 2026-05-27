import { describe, expect, it } from "vitest";
import formatToLocalNumber from "./formatToLocalNumber";

describe("formatToLocalNumber", () => {
  it("formats integers with chilean locale grouping", () => {
    expect(formatToLocalNumber(1000)).toBe("1.000");
    expect(formatToLocalNumber(1250000)).toBe("1.250.000");
  });

  it("formats negative values", () => {
    expect(formatToLocalNumber(-3500)).toBe("-3.500");
  });
});

