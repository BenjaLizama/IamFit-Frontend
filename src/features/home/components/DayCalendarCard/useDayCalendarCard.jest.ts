import { describe, expect, it } from "vitest";
import { useDayCalendarCard } from "./useDayCalendarCard";

describe("useDayCalendarCard", () => {
  it("trims month and day labels to 3 chars", () => {
    const result = useDayCalendarCard({
      month: "Enero",
      dayNumber: 20,
      dayText: "Lunes",
      type: undefined,
    });

    expect(result.formatMonth).toBe("Ene");
    expect(result.fomatDay).toBe("Lun");
  });
});
