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
  };
  session: {
    deviceId: string;
    deviceName: string;
  };
}
