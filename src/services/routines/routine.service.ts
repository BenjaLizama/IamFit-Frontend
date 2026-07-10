import { API, handleResponse } from "../api.service";
import {
  AddExerciseToRoutineRequest,
  CompleteSessionExerciseRequest,
  EditRoutineExerciseRequest,
  ExerciseOptionsResponse,
  GenerateRoutineRequest,
  GenerateRoutineResponse,
  GetExercisesResponse,
  GetRoutinesResponse,
  LogWorkoutRequest,
  ReorderExerciseRequest,
  RoutineProgressDto,
  RoutineLimitsResponse,
  RoutineStatus,
  SelectGeneratedRoutineRequest,
  SelectGeneratedRoutineResponse,
  StartWorkoutSessionRequest,
  UpdateRoutineRequest,
  WorkoutHistory,
  WorkoutSessionDto,
} from "./routine.dtos";

const ROUTINES_URL = `${API.ejercicios}/api/v1`;

const getAuthHeaders = (token?: string | null) => ({
  "Content-Type": "application/json",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

export const getExercises = async (): Promise<GetExercisesResponse> => {
  const response = await fetch(`${ROUTINES_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

export const getRoutines = async (
  token: string | null,
  status: RoutineStatus = "ACTIVE",
): Promise<GetRoutinesResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines?status=${status}`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(token),
      "X-Device-Id": "Test",
    },
  });

  return handleResponse(response);
};

export const getRoutineLimits = async (
  token?: string | null,
): Promise<RoutineLimitsResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines/limits`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getExerciseOptions = async (
  token?: string | null,
): Promise<ExerciseOptionsResponse> => {
  const response = await fetch(`${ROUTINES_URL}/exercises/options`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const generateRoutineOptions = async (
  data: GenerateRoutineRequest,
  token?: string | null,
): Promise<GenerateRoutineResponse> => {
  const response = await fetch(`${ROUTINES_URL}/addRoutine`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const selectGeneratedRoutine = async (
  data: SelectGeneratedRoutineRequest,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  console.log("Seleccionando rutina generada:", {
    customName: data.customName,
    selectedIndex: data.selectedIndex,
    sessionId: data.sessionId,
  });

  const response = await fetch(`${ROUTINES_URL}/addRoutine/select`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const activateRoutine = async (
  routineId: string,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}/activate`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const deactivateRoutine = async (
  routineId: string,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/deactivate`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const updateRoutine = async (
  routineId: string,
  data: UpdateRoutineRequest,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const addExerciseToRoutine = async (
  routineId: string,
  data: AddExerciseToRoutineRequest,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}/exercises`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const editRoutineExercise = async (
  routineId: string,
  exerciseEntryId: string,
  data: EditRoutineExerciseRequest,
  token?: string | null,
) => {
  const response = await fetch(
    `${ROUTINES_URL}/editRoutine/${routineId}/exercises/${exerciseEntryId}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    },
  );

  return handleResponse(response);
};

export const deleteRoutineExercise = async (
  routineId: string,
  exerciseEntryId: string,
  token?: string | null,
) => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/exercises/${exerciseEntryId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const reorderRoutineExercise = async (
  routineId: string,
  data: ReorderExerciseRequest,
  token?: string | null,
): Promise<SelectGeneratedRoutineResponse> => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/exercises/reorder`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    },
  );

  return handleResponse(response);
};

export const startWorkoutSession = async (
  routineId: string,
  data: StartWorkoutSessionRequest = {},
  token?: string | null,
): Promise<WorkoutSessionDto> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}/sessions`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const completeSessionExercise = async (
  routineId: string,
  sessionId: string,
  exerciseEntryId: string,
  data: CompleteSessionExerciseRequest = {},
  token?: string | null,
): Promise<WorkoutSessionDto> => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/sessions/${sessionId}/exercises/${exerciseEntryId}/complete`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    },
  );

  return handleResponse(response);
};

export const uncompleteSessionExercise = async (
  routineId: string,
  sessionId: string,
  exerciseEntryId: string,
  token?: string | null,
): Promise<WorkoutSessionDto> => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/sessions/${sessionId}/exercises/${exerciseEntryId}/uncomplete`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const getActiveWorkoutSession = async (
  routineId: string,
  token?: string | null,
): Promise<WorkoutSessionDto> => {
  const response = await fetch(
    `${ROUTINES_URL}/routines/${routineId}/sessions/active`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const getRoutineProgress = async (
  routineId: string,
  token?: string | null,
): Promise<RoutineProgressDto> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}/progress`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const logWorkout = async (
  routineId: string,
  data: LogWorkoutRequest = {},
  token?: string | null,
): Promise<WorkoutHistory> => {
  const response = await fetch(`${ROUTINES_URL}/routines/${routineId}/log`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const getWorkoutHistory = async (
  token?: string | null,
): Promise<WorkoutHistory[]> => {
  const response = await fetch(`${ROUTINES_URL}/routines/history`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};
