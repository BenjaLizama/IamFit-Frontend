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
