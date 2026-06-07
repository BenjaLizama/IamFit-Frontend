import { API, handleResponse } from "../api.service";
import {
  AddFoodRequest,
  FoodCatalogItem,
  FoodInfo,
  FoodLogCaloriesResponse,
  GenerateMealPlanRequest,
  GenerateMealPlanResponse,
  SearchFoodResponse,
} from "./feeding.dtos";

const FEEDING_API_URL = `${API.alimentacion}/api/v1/food`;

const getAuthHeaders = (token?: string | null) => ({
  "Content-Type": "application/json",
  "X-Device-Id": "Test",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const sumFoodProtein = (entries: FoodInfo[]) =>
  entries.reduce((total, food) => total + (food.protein || 0), 0);

const getAllFoodEntries = (summary: FoodLogCaloriesResponse) =>
  Object.values(summary.entriesByMeal || {}).flat();

const getFoodUniqueKey = (food: FoodCatalogItem) =>
  [
    food.name,
    food.foodCategory,
    food.servingSizeG,
    food.calories,
    food.protein,
    food.carbohydrates,
    food.fat,
  ].join("|");

const dedupeFoods = (foods: FoodCatalogItem[]) => {
  const seenFoods = new Set<string>();

  return foods.filter((food) => {
    const key = getFoodUniqueKey(food);

    if (seenFoods.has(key)) {
      return false;
    }

    seenFoods.add(key);
    return true;
  });
};

export const getDailyFoodLogSummary = async (
  token: string | null,
): Promise<FoodLogCaloriesResponse> => {
  const response = await fetch(`${FEEDING_API_URL}/calories`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getDailyCalorieSummary = async (
  token: string | null,
): Promise<number> => {
  const data = await getDailyFoodLogSummary(token);

  return Math.round(data.totalCalories || 0);
};

export const getDailyProteinFood = async (
  token: string | null,
): Promise<number> => {
  const data = await getDailyFoodLogSummary(token);
  const totalProtein =
    data.totalProtein ?? sumFoodProtein(getAllFoodEntries(data));

  return Math.round(totalProtein || 0);
};

export const generateMealPlan = async (
  data: GenerateMealPlanRequest,
  token?: string | null,
): Promise<GenerateMealPlanResponse> => {
  const response = await fetch(`${FEEDING_API_URL}/meal-plan/generate`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const searchFood = async (
  query: string,
  token?: string | null,
): Promise<FoodCatalogItem[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return [];
  }

  const url = `${FEEDING_API_URL}/search?query=${encodeURIComponent(trimmedQuery)}`;

  console.log("Buscando alimento en catalogo:", url);

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(token),
  });
  const data: SearchFoodResponse = await handleResponse(response);

  console.log("Respuesta busqueda alimentos:", data);

  const foods = [
    ...(data.localResults || []),
    ...(data.externalResults || []),
  ];

  const uniqueFoods = dedupeFoods(foods);

  console.log(
    `Alimentos parseados para mostrar: ${foods.length}. Unicos: ${uniqueFoods.length}`,
  );

  return uniqueFoods;
};

export const addFood = async (data: AddFoodRequest, token?: string | null) => {
  const response = await fetch(`${FEEDING_API_URL}/addFood`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const getMealPlanText = (response: GenerateMealPlanResponse) => {
  return response.recomendaciones_nutricionales || response.objetivo;
};
