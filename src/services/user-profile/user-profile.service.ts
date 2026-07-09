import { API, handleResponse } from "../api.service";
import { getAccessToken } from "../session/token.storage";
import { clearNickname, saveNickname } from "../session/user.storage";
import {
  ProfileActivityPeriod,
  ProfileActivityType,
  UpdateUserProfileRequest,
  UserProfileActiveItemsResponse,
  UserProfileActivityResponse,
  UserProfileContextResponse,
  UserProfileResponse,
  UserProfileSummaryResponse,
} from "./user-profile.dtos";

const USER_PROFILE_URL = `${API.usuarios}/api/v1/user`;

const normalizeListField = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeProfile = (data: any): UserProfileResponse => ({
  ...data,
  allergies: normalizeListField(data?.allergies),
  dietaryPreferences: normalizeListField(data?.dietaryPreferences),
  dislikes: normalizeListField(data?.dislikes),
  equipment: normalizeListField(data?.equipment ?? data?.availableEquipment),
  limitations: normalizeListField(data?.limitations),
});

const getAuthHeaders = async (token?: string | null) => {
  const accessToken = token ?? (await getAccessToken());

  return {
    "Content-Type": "application/json",
    "X-Device-ID": "Test",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
};

export const getProfile = async (
  token?: string | null,
): Promise<UserProfileResponse> => {
  const response = await fetch(`${USER_PROFILE_URL}/get-profile`, {
    method: "GET",
    headers: await getAuthHeaders(token),
  });

  return normalizeProfile(await handleResponse(response));
};

export const updateProfile = async (
  data: UpdateUserProfileRequest,
  token?: string | null,
): Promise<UserProfileResponse> => {
  const response = await fetch(`${USER_PROFILE_URL}/profile`, {
    method: "PATCH",
    headers: await getAuthHeaders(token),
    body: JSON.stringify(data),
  });

  return normalizeProfile(await handleResponse(response));
};

export const getProfileContext = async (
  token?: string | null,
): Promise<UserProfileContextResponse> => {
  const response = await fetch(`${USER_PROFILE_URL}/profile/context`, {
    method: "GET",
    headers: await getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getProfileSummary = async (
  token?: string | null,
): Promise<UserProfileSummaryResponse> => {
  const response = await fetch(`${USER_PROFILE_URL}/profile/summary`, {
    method: "GET",
    headers: await getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const getProfileActivity = async (
  type: ProfileActivityType,
  period: ProfileActivityPeriod = "MONTHLY",
  token?: string | null,
): Promise<UserProfileActivityResponse> => {
  const params = new URLSearchParams({ type, period });
  const response = await fetch(
    `${USER_PROFILE_URL}/profile/activity?${params.toString()}`,
    {
      method: "GET",
      headers: await getAuthHeaders(token),
    },
  );

  return handleResponse(response);
};

export const getProfileActiveItems = async (
  token?: string | null,
): Promise<UserProfileActiveItemsResponse> => {
  const response = await fetch(`${USER_PROFILE_URL}/profile/active-items`, {
    method: "GET",
    headers: await getAuthHeaders(token),
  });

  return handleResponse(response);
};

export const loadUserInfo = async (token: string | null) => {
  const data = await getProfile(token);

  await clearNickname();
  await saveNickname(data.nickname);

  return data;
};
