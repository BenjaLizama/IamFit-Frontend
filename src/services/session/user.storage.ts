import * as SecureStorage from "expo-secure-store";

const NICKNAME_KEY = "Nickname";

export const saveNickname = async (nickname: string) => {
  await SecureStorage.setItemAsync(NICKNAME_KEY, nickname);
};

export const getNickname = async () => {
  return SecureStorage.getItemAsync(NICKNAME_KEY);
};

export const clearNickname = async () => {
  await SecureStorage.deleteItemAsync(NICKNAME_KEY);
};
