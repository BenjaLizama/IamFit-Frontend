import { BACKEND_IP, handleResponse } from "../api.service";
import { RegisterRequest } from "./auth.dtos";

const AUTH_URL = `http://${BACKEND_IP}:8080/api/auth`; // Esta es solo para api de auth... se debe crear uno extra para session

export const register = async (data: RegisterRequest) => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Device-Id": data.session.deviceId,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const login = async () => {};

export const refresh_token = async () => {};

export const forgot_password = async () => {};

export const reset_password = async () => {};

export const change_password = async () => {};

export const change_email = async () => {};

export const logout = async () => {};

export const deactivate = async () => {};
