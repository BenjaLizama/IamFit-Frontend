export type MealType = "DESAYUNO" | "ALMUERZO" | "CENA" | "SNACK";

export interface NutritionTotals {
  calories: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  protein: number;
}

export interface FoodInfo extends NutritionTotals {
  foodName: string;
  id: string;
  mealType: MealType;
  quantity: number;
}

export interface FoodCatalogItem extends Partial<NutritionTotals> {
  id?: string;
  foodCategory?: string;
  name?: string;
  servingSizeG?: number;
  sodium?: number;
  sugar?: number;
}

export interface SearchFoodResponse {
  externalResults: FoodCatalogItem[];
  externalSearchPerformed: boolean;
  localResults: FoodCatalogItem[];
}

export interface AddFoodRequest {
  foodItemId: string;
  quantity: number;
  mealType: MealType;
  logDate?: string;
}

export interface EditFoodEntryRequest {
  logDate?: string;
  mealType?: MealType;
  quantity?: number;
}

export interface DeleteFoodEntryResponse {
  deletedId: string;
  message: string;
}

export interface FoodLimitsResponse {
  canAddFood: boolean;
  entriesForDate: number;
  maxFoodEntriesPerDay: number;
}

export type EntriesByMeal = Partial<Record<MealType, FoodInfo[]>>;

export type MealTotals = Partial<Record<MealType, NutritionTotals>>;

export interface FoodLogCaloriesResponse {
  date: string;
  entriesByMeal: EntriesByMeal;
  mealTotals: MealTotals;
  totalCalories: number;
  totalCarbohydrates: number;
  totalFat: number;
  totalFiber: number;
  totalProtein: number;
  userId: string;
}

export interface GenerateMealPlanRequest {
  goal: "Ganar musculo" | "Bajar de peso" | "Mantener peso";
  preferences?: string[];
  allergies?: string[];
  likes?: string[];
  dislikes?: string[];
}

export interface MealPlanDayMenu {
  desayuno: string;
  almuerzo: string;
  cena: string;
  snacks: string[];
}

export interface MealPlanWeekMenu {
  lunes: MealPlanDayMenu;
  martes: MealPlanDayMenu;
  miercoles: MealPlanDayMenu;
  jueves: MealPlanDayMenu;
  viernes: MealPlanDayMenu;
  sabado: MealPlanDayMenu;
  domingo: MealPlanDayMenu;
}

export interface GenerateMealPlanResponse {
  objetivo: string;
  menu: MealPlanWeekMenu;
  recomendaciones_nutricionales: string;
}

export type MealPlanStatus = "ACTIVE" | "INACTIVE" | "ALL";

export type MealPlanSource = "AI" | "MANUAL";

export interface SaveMealPlanRequest {
  goal?: string;
  menu?: MealPlanWeekMenu;
  recomendacionesNutricionales?: string;
  title: string;
}

export interface SavedMealPlan {
  activatedAt: string | null;
  createdAt: string;
  goal: string;
  id: string;
  menu: GenerateMealPlanResponse;
  source: MealPlanSource;
  status: Exclude<MealPlanStatus, "ALL">;
  title: string;
}

export interface MealPlanLimitsResponse {
  activeMealPlans: number;
  canActivateMealPlan: boolean;
  canSaveMealPlan: boolean;
  maxActiveMealPlans: number;
  maxSavedMealPlans: number;
  savedMealPlans: number;
}
