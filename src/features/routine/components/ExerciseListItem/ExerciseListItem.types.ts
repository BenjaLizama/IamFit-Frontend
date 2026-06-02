import React from "react";

interface BaseExercise {
  name: string;
  rightItem?: React.ReactNode;
  checked?: boolean;
  onAction?: () => void;
}

export interface WeightExercise extends BaseExercise {
  kind: "weight";
  series: number;
  reps: number;
  weight: number | null;
}

export interface CardioExercise extends BaseExercise {
  kind: "cardio";
  time: string;
  intensity?: string;
}

export type ExerciseListItemProps = WeightExercise | CardioExercise;
