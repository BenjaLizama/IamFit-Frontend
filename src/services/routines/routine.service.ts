import { API, handleResponse } from "../api.service";
import { GetRoutinesResponse } from "./routine.dtos";

const ROUTINES_URL = `${API.ejercicios}/api/v1`;

export const getExercises = async (): Promise<GetRoutinesResponse> => {
  const response = await fetch(`${ROUTINES_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};

export const getRoutines = async (): Promise<GetRoutinesResponse> => {
  const response = await fetch(`${ROUTINES_URL}/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse(response);
};
