export type ExerciseKind = "weight" | "cardio";

export interface BaseExercise {
  id: string;
  kind: ExerciseKind;
  name: string;
}

export interface WeightExercise extends BaseExercise {
  kind: "weight";
  series: number;
  reps: number;
  weight: number;
}

export interface CardioExercise extends BaseExercise {
  kind: "cardio";
  time: string;
  intensity?: string;
}

export type RoutineExercise = WeightExercise | CardioExercise;

export interface RoutineSummary {
  equipment: string;
  exerciseCount: number;
  level: string;
  nextSessionLabel: string;
  estimatedTime: number;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  intensity?: string;
  dayLabel: string;
  dayColor: string;
  imageVariant: "blue" | "red" | "purple";
  checked: boolean;
  summary: RoutineSummary;
  exercises: RoutineExercise[];
}
