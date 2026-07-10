import { API, handleResponse } from "../api.service";
import {
  AddFoodRequest,
  ConsumeMealRequest,
  DeleteFoodEntryResponse,
  EditFoodEntryRequest,
  FoodCatalogItem,
  FoodInfo,
  FoodLimitsResponse,
  FoodLogCaloriesResponse,
  GenerateMealPlanRequest,
  GenerateMealPlanResponse,
  MealPlanDayCompletionResponse,
  MealPlanHistoryResponse,
  MealPlanLimitsResponse,
  MealPlanMealCompletionResponse,
  MealPlanProgressDay,
  MealPlanProgressMealId,
  MealPlanProgressResponse,
  MealPlanStatus,
  SaveMealPlanRequest,
  SavedMealPlan,
  SearchFoodResponse,
} from "./feeding.dtos";

const FEEDING_API_URL = `${API.alimentacion}/api/v1/food`;

const getAuthHeaders = (token?: string | null) => ({
  "Content-Type": "application/json",
  "X-Device-ID": "Test",
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

const readJsonSafely = async (response: Response) => {
  const rawBody = await response.text();

  if (!rawBody.trim()) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return null;
  }
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

  const foods = [...(data.localResults || []), ...(data.externalResults || [])];

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

export const editFoodEntry = async (
  entryId: string,
  data: EditFoodEntryRequest,
  token?: string | null,
): Promise<FoodInfo> => {
  const response = await fetch(`${FEEDING_API_URL}/addFood/${entryId}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const deleteFoodEntry = async (
  entryId: string,
  token?: string | null,
): Promise<DeleteFoodEntryResponse> => {
  const response = await fetch(`${FEEDING_API_URL}/addFood/${entryId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getFoodLimits = async (
  token?: string | null,
): Promise<FoodLimitsResponse> => {
  const response = await fetch(`${FEEDING_API_URL}/limits`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const saveMealPlan = async (
  data: SaveMealPlanRequest,
  token?: string | null,
): Promise<SavedMealPlan> => {
  const response = await fetch(`${FEEDING_API_URL}/meal-plans`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const getMealPlans = async (
  status: MealPlanStatus = "ALL",
  token?: string | null,
): Promise<SavedMealPlan[]> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans?status=${status}`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const getActiveMealPlan = async (
  token?: string | null,
): Promise<SavedMealPlan | null> => {
  const response = await fetch(`${FEEDING_API_URL}/meal-plans/active`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  if (response.status === 404 || response.status === 409) {
    const errorData = await readJsonSafely(response);

    if (errorData?.code === "MEAL_PLAN_NOT_ACTIVE") {
      return null;
    }
  }

  return handleResponse(response);
};

export const activateMealPlan = async (
  mealPlanId: string,
  token?: string | null,
): Promise<SavedMealPlan> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${mealPlanId}/activate`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const deactivateMealPlan = async (
  mealPlanId: string,
  token?: string | null,
): Promise<SavedMealPlan> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${mealPlanId}/deactivate`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const deleteMealPlan = async (
  mealPlanId: string,
  token?: string | null,
) => {
  const response = await fetch(`${FEEDING_API_URL}/meal-plans/${mealPlanId}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getMealPlanLimits = async (
  token?: string | null,
): Promise<MealPlanLimitsResponse> => {
  const response = await fetch(`${FEEDING_API_URL}/meal-plans/limits`, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getActiveMealPlanProgress = async (
  token?: string | null,
): Promise<MealPlanProgressResponse | null> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/active/progress`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  if (response.status === 404 || response.status === 409) {
    const errorData = await readJsonSafely(response);

    if (errorData?.code === "MEAL_PLAN_NOT_ACTIVE") {
      return null;
    }
  }

  return handleResponse(response);
};

export const getMealPlanProgress = async (
  planId: string,
  token?: string | null,
): Promise<MealPlanProgressResponse | null> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${planId}/progress`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  if (response.status === 404 || response.status === 409) {
    const errorData = await readJsonSafely(response);

    if (errorData?.code === "MEAL_PLAN_NOT_ACTIVE") {
      return null;
    }
  }

  return handleResponse(response);
};

const buildPatchRequest = (
  token?: string | null,
  data: ConsumeMealRequest = {},
): RequestInit => {
  const init: RequestInit = {
    method: "PATCH",
    headers: getAuthHeaders(token),
  };

  if (data && Object.keys(data).length > 0) {
    init.body = JSON.stringify(data);
  }

  return init;
};

export const consumeMealPlanMeal = async (
  planId: string,
  day: MealPlanProgressDay,
  mealId: MealPlanProgressMealId,
  data: ConsumeMealRequest = {},
  token?: string | null,
): Promise<MealPlanMealCompletionResponse> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${planId}/days/${day}/meals/${mealId}/consume`,
    buildPatchRequest(token, data),
  );

  return handleResponse(response);
};

export const unconsumeMealPlanMeal = async (
  planId: string,
  day: MealPlanProgressDay,
  mealId: MealPlanProgressMealId,
  data: ConsumeMealRequest = {},
  token?: string | null,
): Promise<MealPlanMealCompletionResponse> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${planId}/days/${day}/meals/${mealId}/unconsume`,
    buildPatchRequest(token, data),
  );

  return handleResponse(response);
};

export const completeMealPlanDay = async (
  planId: string,
  day: MealPlanProgressDay,
  data: ConsumeMealRequest = {},
  token?: string | null,
): Promise<MealPlanDayCompletionResponse> => {
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/${planId}/days/${day}/complete`,
    {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(data),
    },
  );

  return handleResponse(response);
};

export const getMealPlanHistory = async (
  from: string,
  to: string,
  token?: string | null,
): Promise<MealPlanHistoryResponse> => {
  const params = new URLSearchParams({ from, to });
  const response = await fetch(
    `${FEEDING_API_URL}/meal-plans/history?${params.toString()}`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const getMealPlanText = (response: GenerateMealPlanResponse) => {
  return response.recomendaciones_nutricionales || response.objetivo;
};
