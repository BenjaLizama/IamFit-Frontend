import { API, handleResponse } from "../api.service";
import { ExcerciseRoutinesResponse } from "./exercises.dtos";

const EXCERCISE_URL = API.ejercicios;

export const getExcerciseDailyResume = async (
  token: string | null,
): Promise<number> => {
  const response = await fetch(`${EXCERCISE_URL}/api/v1/routines`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": "Test",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    handleResponse(response);
    throw new Error("Error en la petición.");
  }

  let exercisesTotal: number = 0;

  const data: ExcerciseRoutinesResponse[] = await response.json();
  data.forEach((routine) => {
    routine.exercises.forEach((ex) => {
      console.log(ex.exerciseName);
      exercisesTotal += 1;
    });
  });

  return exercisesTotal;
};
