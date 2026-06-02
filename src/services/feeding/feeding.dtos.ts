import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface FoodLogCaloriesResponse {
  date: Date;
  entriesByMeal: {};
  mealTotals: {
    DESAYUNO: {
      calories: Double;
      carbohydrates: Double;
      fat: Double;
      fiber: Double;
      protein: Double;
    };
    ALMUERZO: {
      calories: Double;
      carbohydrates: Double;
      fat: Double;
      fiber: Double;
      protein: Double;
    };
    CENA: {
      calories: Double;
      carbohydrates: Double;
      fat: Double;
      fiber: Double;
      protein: Double;
    };
    SNACK: {
      calories: Double;
      carbohydrates: Double;
      fat: Double;
      fiber: Double;
      protein: Double;
    };
  };
  totalCalories: Double;
  totalCarbohydrates: Double;
  totalFat: Double;
  totalFiber: Double;
  totalProtein: Double;
  userId: string;
}
