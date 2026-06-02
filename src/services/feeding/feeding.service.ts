import { BACKEND_IP, handleResponse } from "../api.service";
import { FoodLogCaloriesResponse } from "./feeding.dtos";

const FEEDING_URL = `http://${BACKEND_IP}:8083`;

export const getDailyCalorieSummary = async (
  token: string | null,
): Promise<number> => {
  const response = await fetch(`${FEEDING_URL}/api/v1/food-log/calories`, {
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

  const data: FoodLogCaloriesResponse = await response.json();
  return data.totalCalories;
};
