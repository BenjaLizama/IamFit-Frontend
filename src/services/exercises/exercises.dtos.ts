export interface ExcerciseRoutinesResponse {
  aiGenerated: boolean;
  createdAt: string;
  description: string;
  difficultyLevel: string;
  estimatedDurationMinutes: number;
  exercises: Excercise[];
  id: string;
  name: string;
}

interface Excercise {
  exerciseId: string;
  exerciseName: string;
  id: string;
  muscleGroup: string;
  notes: string;
  orderIndex: number;
  reps: number;
  restSeconds: number;
  sets: number;
  weightKg: number | null;
}
