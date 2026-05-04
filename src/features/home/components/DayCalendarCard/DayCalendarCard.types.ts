import { DayType, MonthType } from "@/src/core/types";

export interface DayCalendarCardProps {
  month: MonthType;
  dayNumber: number;
  dayText: DayType;
  type?: DayCalendarCardType | undefined;
}

type DayCalendarCardType = "selected";
