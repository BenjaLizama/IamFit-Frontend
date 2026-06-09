export interface MiaPromptRequest {
  message: string;
}

export type MiaActionType =
  | "CREATE_ROUTINE"
  | "SELECT_ROUTINE"
  | "ADD_EXERCISE_TO_ROUTINE"
  | "LOG_WORKOUT"
  | "GENERATE_MEAL_PLAN"
  | "ADD_FOOD"
  | "DELETE_FOOD_ENTRY"
  | "GET_CALORIES_BY_DATE"
  | "SEARCH_FOOD"
  | "USE_MEAL_PLAN"
  | "SHOW_ROUTINE_OPTIONS"
  | "WELLBEING_CHECK_IN"
  | "GET_MOTIVATION";

export interface MiaAction<TPayload = unknown> {
  type: MiaActionType;
  label?: string;
  payload: TPayload;
}

export interface MiaAddFoodPayload {
  mealType?: string;
  query?: string;
  quantity?: number;
}

export interface MiaCreateRoutinePayload {
  availableEquipment?: string[];
  difficulty?: string;
  durationMinutes?: number;
  limitations?: string;
  muscleGroups?: string[];
}

export interface MiaGenerateMealPlanPayload {
  allergies?: string[];
  dislikes?: string[];
  goal?: string;
  likes?: string[];
  preferences?: string[];
}

export interface MiaAssistantResponse {
  actions?: MiaAction[];
  content: string;
  disclaimer?: string;
  model?: string;
  status?: "SUCCESS" | "ERROR" | string;
}

export type MiaChatMessage = {
  actions?: MiaAction[];
  disclaimer?: string;
  id: string;
  model?: string;
  status?: string;
  type: "user" | "bot";
  text: string;
};

export type MiaPromptResponse =
  | string
  | (Partial<MiaAssistantResponse> & {
      [key: string]: unknown;
      answer?: unknown;
      choices?: unknown;
      content?: unknown;
      data?: unknown;
      message?: unknown;
      reply?: unknown;
      response?: unknown;
      respuesta?: unknown;
      text?: unknown;
    });

export interface MiaHealthResponse {
  status?: string;
  message?: string;
}
