export type UserSex =
  | "M"
  | "F"
  | "MALE"
  | "FEMALE"
  | "MASCULINO"
  | "FEMENINO"
  | string;

export type ProfileActivityType =
  | "WORKOUTS"
  | "WEIGHT"
  | "CALORIES"
  | "PROTEIN"
  | "ROUTINES";

export type ProfileActivityPeriod = "MONTHLY";

export interface UserProfileResponse {
  age: number;
  credentialId: string;
  height: number;
  nickname: string;
  sex: UserSex;
  weight: number;
  goal?: string | null;
  activityLevel?: string | null;
  allergies?: string[];
  equipment?: string[];
  limitations?: string[];
  dietaryPreferences?: string[];
  dislikes?: string[];
}

export type GetUserResponse = UserProfileResponse;

export interface UpdateUserProfileRequest {
  nickname?: string;
  age?: number;
  sex?: UserSex;
  height?: number;
  weight?: number;
  goal?: string | null;
  activityLevel?: string | null;
  allergies?: string[];
  equipment?: string[];
  limitations?: string[];
  dietaryPreferences?: string[];
  dislikes?: string[];
}

export interface ProfileContextMissingItem {
  type: string;
  label: string;
}

export interface UserProfileContextResponse extends UserProfileResponse {
  completionPercentage?: number;
  missingContext?: ProfileContextMissingItem[];
  activeRoutineIds?: string[];
  activeMealPlanId?: string | null;
  nutrition?: unknown;
  activePlan?: unknown;
  routines?: unknown[];
}

export interface UserProfileSummaryResponse {
  workoutsCount?: number;
  foodEntriesCount?: number;
  goalsCompletedCount?: number;
  activeRoutinesCount?: number;
  activeMealPlansCount?: number;
  currentStreakDays?: number;
}

export interface ProfileActivityPoint {
  label: string;
  value: number;
}

export interface UserProfileActivityResponse {
  type: ProfileActivityType;
  period: ProfileActivityPeriod;
  unit: string;
  label: string;
  points: ProfileActivityPoint[];
  highlight?: ProfileActivityPoint | null;
}

export interface UserProfileActiveRoutine {
  id: string;
  name?: string;
  title?: string;
  durationMinutes?: number;
  status?: string;
}

export interface UserProfileActiveMealPlan {
  id: string;
  name?: string;
  goal?: string;
  status?: string;
}

export interface UserProfileActiveItemsResponse {
  activeRoutines?: UserProfileActiveRoutine[];
  activeMealPlan?: UserProfileActiveMealPlan | null;
}
