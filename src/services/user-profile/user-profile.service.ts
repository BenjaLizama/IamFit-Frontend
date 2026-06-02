import { API, handleResponse } from "../api.service";
import { clearNickname, saveNickname } from "../session/user.storage";
import { GetUserResponse } from "./user-profile.dtos";

const USERS_URL = `${API.usuarios}`;

export const loadUserInfo = async (token: string | null) => {
  const response = await fetch(`${USERS_URL}/api/v1/user/get-profile`, {
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

  const data: GetUserResponse = await response.json();

  clearNickname();
  saveNickname(data.nickname);
};
