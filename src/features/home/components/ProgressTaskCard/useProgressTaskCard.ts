import { ProgressTaskCardProps } from "./ProgressTaskCard.types";

export const useProgressTaskCard = ({
  actualCalories,
  goal,
}: ProgressTaskCardProps) => {
  const progressPercentage = (Math.round(actualCalories) / goal) * 100;

  return { progressPercentage };
};
