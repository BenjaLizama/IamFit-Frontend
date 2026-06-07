import * as SecureStore from "expo-secure-store";
import { DeviceEventEmitter } from "react-native";
import { GenerateMealPlanResponse } from "../feeding/feeding.dtos";
import { GenerateRoutineResponse } from "../routines/routine.dtos";

const MIA_MEAL_PLAN_KEY = "iamfit_mia_generated_meal_plan";
let miaGeneratedRoutineOptions: GenerateRoutineResponse | null = null;

export const MIA_GENERATED_MEAL_PLAN_EVENT = "mia-generated-meal-plan";
export const MIA_GENERATED_ROUTINE_OPTIONS_EVENT =
  "mia-generated-routine-options";

const readJson = async <T>(key: string): Promise<T | null> => {
  const storedValue = await SecureStore.getItemAsync(key);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as T;
  } catch {
    await SecureStore.deleteItemAsync(key);
    return null;
  }
};

const writeJson = async (key: string, value: unknown) => {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
};

export const saveMiaGeneratedMealPlan = async (
  mealPlan: GenerateMealPlanResponse,
) => {
  await writeJson(MIA_MEAL_PLAN_KEY, mealPlan);
  DeviceEventEmitter.emit(MIA_GENERATED_MEAL_PLAN_EVENT, mealPlan);
};

export const getMiaGeneratedMealPlan =
  async (): Promise<GenerateMealPlanResponse | null> => {
    return readJson<GenerateMealPlanResponse>(MIA_MEAL_PLAN_KEY);
  };

export const clearMiaGeneratedMealPlan = async () => {
  await SecureStore.deleteItemAsync(MIA_MEAL_PLAN_KEY);
};

export const saveMiaGeneratedRoutineOptions = async (
  response: GenerateRoutineResponse,
) => {
  miaGeneratedRoutineOptions = response;
  DeviceEventEmitter.emit(MIA_GENERATED_ROUTINE_OPTIONS_EVENT, response);
};

export const getMiaGeneratedRoutineOptions =
  async (): Promise<GenerateRoutineResponse | null> => {
    return miaGeneratedRoutineOptions;
  };

export const clearMiaGeneratedRoutineOptions = async () => {
  miaGeneratedRoutineOptions = null;
};
