import { ProgressTaskCardProps } from "./ProgressTaskCard.types";

export const useProgressTaskCard = ({
  actualCalories,
  goal,
}: ProgressTaskCardProps) => {
  const progressPercentage = (actualCalories / goal) * 100;

  return { progressPercentage };
};
