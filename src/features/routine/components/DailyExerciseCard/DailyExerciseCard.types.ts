export interface DailyExerciseCardProps {
  pathImage: string;
  exerciseName: string;
  description: string;
  estimatedTimeMin?: number;
  intensity?: string;
  rightElement?: React.ReactNode;
}
