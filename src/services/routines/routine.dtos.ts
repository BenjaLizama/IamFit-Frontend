export type RoutineDifficulty = "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO";

export type MuscleGroup =
  | "PECHO"
  | "ESPALDA"
  | "HOMBROS"
  | "BICEPS"
  | "TRICEPS"
  | "PIERNAS"
  | "GLUTEOS"
  | "CORE"
  | "CARDIO"
  | "CUERPO_COMPLETO";

export type RoutineEquipment =
  | "BARRA"
  | "MANCUERNAS"
  | "CUERDA"
  | "CINTA"
  | "MAQUINAS"
  | "NINGUNO";

export interface RoutineExercise {
  id: string | null;
  exerciseId: string | null;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  notes: string;
  orderIndex: number;
  reps: number;
  restSeconds: number;
  sets: number;
  weightKg: number | null;
}

export interface Routine {
  id: string | null;
  name: string;
  description: string;
  difficultyLevel: RoutineDifficulty;
  estimatedDurationMinutes: number;
  aiGenerated: boolean;
  createdAt: string | null;
  exercises: RoutineExercise[];
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  description?: string;
}

export interface GenerateRoutineRequest {
  difficulty: RoutineDifficulty;
  muscleGroups: MuscleGroup[];
  availableEquipment: RoutineEquipment[];
  durationMinutes: number;
  limitations: string;
}

export interface GenerateRoutineResponse {
  message: string;
  routines: Routine[];
  sessionId: string;
}

export interface SelectGeneratedRoutineRequest {
  sessionId: string;
  selectedIndex: number;
  customName: string;
}

export type GetRoutinesResponse = Routine[];

export type GetRoutineResponse = Routine;

export type GetExercisesResponse = Exercise[];

export type SelectGeneratedRoutineResponse = Routine;
