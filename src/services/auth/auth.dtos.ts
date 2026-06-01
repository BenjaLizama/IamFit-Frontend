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
