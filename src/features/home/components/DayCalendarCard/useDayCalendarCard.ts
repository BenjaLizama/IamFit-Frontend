import { DayCalendarCardProps } from "./DayCalendarCard.types";

export const useDayCalendarCard = ({
  month,
  dayNumber,
  dayText,
}: DayCalendarCardProps) => {
  const formatMonth = month.substring(0, 3);
  const fomatDay = dayText.substring(0, 3);
  return {
    formatMonth,
    fomatDay,
  };
};
