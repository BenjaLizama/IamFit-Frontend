import { describe, expect, it } from "vitest";
import { useDayCalendarCard } from "./useDayCalendarCard";

describe("useDayCalendarCard", () => {
  it("trims month and day labels to 3 chars", () => {
    const result = useDayCalendarCard({
      month: "enero",
      dayNumber: 20,
      dayText: "lunes",
      type: undefined,
    });

    expect(result.formatMonth).toBe("ene");
    expect(result.fomatDay).toBe("lun");
  });
});

