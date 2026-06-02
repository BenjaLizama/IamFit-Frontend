import { API, handleResponse } from "../api.service";
import { FoodInfo, FoodLogCaloriesResponse } from "./feeding.dtos";

const FEEDING_URL = `${API.alimentacion}`;

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

export const getDailyProteinFood = async (
  token: string | null,
): Promise<number> => {
  const response = await fetch(`${FEEDING_URL}/api/v1/food-log/addFood`, {
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

  const data: FoodInfo[] = await response.json();
  let totalProtein: number = 0;

  data.forEach((food) => {
    totalProtein += food.protein;
  });

  return Math.round(totalProtein);
};
