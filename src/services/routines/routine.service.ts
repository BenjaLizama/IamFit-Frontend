import { API, handleResponse } from "../api.service";
import {
  GenerateRoutineRequest,
  GenerateRoutineResponse,
  GetExercisesResponse,
  GetRoutinesResponse,
  SelectGeneratedRoutineRequest,
  SelectGeneratedRoutineResponse,
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
): Promise<GetRoutinesResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines`, {
    method: "GET",
    headers: {
      ...getAuthHeaders(token),
      "X-Device-Id": "Test",
    },
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
