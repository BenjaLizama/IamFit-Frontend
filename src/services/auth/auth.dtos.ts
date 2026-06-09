export interface RegisterRequest {
  register: {
    email: string;
    password: string;
  };
  UserProfile: {
    nickname: string;
    age: number;
    weight: number;
    height: number;
    sex: "MALE" | "FEMALE";
    sexo: "MALE" | "FEMALE";
  };
  session: {
    deviceId: string;
    deviceName: string;
  };
}

export interface LoginRequest {
  login: {
    identifier: string;
    password: string;
    provider: "LOCAL";
  };
  session: {
    deviceId: string;
    deviceName: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  status: "SUCCESS" | string;
  message: string;
}

export interface VerifyForgotPasswordRequest {
  email: string;
  code: string;
}

export interface VerifyForgotPasswordResponse {
  status?: "SUCCESS" | string;
  message?: string;
  resetToken: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  status: "SUCCESS" | string;
  message: string;
}
