export type RoutineDifficulty = "PRINCIPIANTE" | "INTERMEDIO" | "AVANZADO";

export type RoutineStatus = "ACTIVE" | "INACTIVE" | "ALL";

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
  | "MAQUINA"
  | "POLEA"
  | "PESO_CORPORAL"
  | "BANDA_ELASTICA"
  | "KETTLEBELL";

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

export interface RoutineLimitsResponse {
  activeRoutines: number;
  canCreateRoutine: boolean;
  inactiveRoutines: number;
  maxActiveRoutines: number;
}

export interface ExerciseOptionsResponse {
  difficultyLevels: RoutineDifficulty[];
  equipment: RoutineEquipment[];
  muscleGroups: MuscleGroup[];
}

export interface UpdateRoutineRequest {
  description?: string;
  difficultyLevel?: RoutineDifficulty;
  estimatedDurationMinutes?: number;
  name?: string;
}

export interface AddExerciseToRoutineRequest {
  exerciseId: string;
  notes?: string;
  reps: number;
  restSeconds?: number;
  sets: number;
  weightKg?: number;
}

export interface EditRoutineExerciseRequest {
  notes?: string;
  reps?: number;
  restSeconds?: number;
  sets?: number;
  weightKg?: number;
}

export interface ReorderExerciseRequest {
  exerciseEntryId: string;
  newOrderIndex: number;
}

export interface WorkoutHistory {
  completedAt: string;
  id: string;
  notes?: string;
  routineName: string;
  status: string;
  workoutDate: string;
}
