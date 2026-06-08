import { API, handleResponse } from "../api.service";
import {
  AddExerciseToRoutineRequest,
  EditRoutineExerciseRequest,
  ExerciseOptionsResponse,
  GenerateRoutineRequest,
  GenerateRoutineResponse,
  GetExercisesResponse,
  GetRoutinesResponse,
  ReorderExerciseRequest,
  RoutineLimitsResponse,
  RoutineStatus,
  SelectGeneratedRoutineRequest,
  SelectGeneratedRoutineResponse,
  UpdateRoutineRequest,
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
