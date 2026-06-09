import { API, handleResponse } from "../api.service";
import {
  AuthResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyForgotPasswordRequest,
  VerifyForgotPasswordResponse,
} from "./auth.dtos";

const AUTH_URL = `${API.auth}/api/v1/auth`; // Esta es solo para api de auth... se debe crear uno extra para session

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Device-ID": data.session.deviceId,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Device-ID": data.session.deviceId,
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const refresh_token = async () => {};

export const requestForgotPassword = async (
  data: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const response = await fetch(`${AUTH_URL}/forgot-password/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const verifyForgotPassword = async (
  data: VerifyForgotPasswordRequest,
): Promise<VerifyForgotPasswordResponse> => {
  const response = await fetch(`${AUTH_URL}/forgot-password/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const response = await fetch(`${AUTH_URL}/forgot-password/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const change_password = async () => {};

export const change_email = async () => {};

export const logout = async () => {};

export const deactivate = async () => {};
