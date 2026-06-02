export interface RoutineExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: string;
  notes: string;
  orderIndex: number;
  reps: number;
  restSeconds: number;
  sets: number;
  weightKg: number | null;
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  difficultyLevel: "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO";
  estimatedDurationMinutes: number;
  aiGenerated: boolean;
  createdAt: string;
  exercises: RoutineExercise[];
}
export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description?: string;
}

export type GetRoutinesResponse = Routine[];

export type GetRoutineResponse = Routine;
