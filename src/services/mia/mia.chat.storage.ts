import * as SecureStore from "expo-secure-store";
import { MiaChatMessage } from "./mia.dtos";

const MIA_CHAT_MESSAGES_KEY = "iamfit_mia_chat_messages";
const MAX_STORED_MESSAGES = 50;

const isMiaChatMessage = (value: unknown): value is MiaChatMessage => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const message = value as Partial<MiaChatMessage>;

  return (
    typeof message.id === "string" &&
    typeof message.text === "string" &&
    (message.type === "user" || message.type === "bot")
  );
};

export const getStoredMiaMessages = async (): Promise<MiaChatMessage[]> => {
  const storedMessages = await SecureStore.getItemAsync(MIA_CHAT_MESSAGES_KEY);

  if (!storedMessages) {
    return [];
  }

  try {
    const parsedMessages = JSON.parse(storedMessages);

    if (!Array.isArray(parsedMessages)) {
      return [];
    }

    return parsedMessages.filter(isMiaChatMessage);
  } catch {
    return [];
  }
};

export const saveMiaMessages = async (messages: MiaChatMessage[]) => {
  const messagesToStore = messages.slice(0, MAX_STORED_MESSAGES);

  await SecureStore.setItemAsync(
    MIA_CHAT_MESSAGES_KEY,
    JSON.stringify(messagesToStore),
  );
};

export const clearStoredMiaMessages = async () => {
  await SecureStore.deleteItemAsync(MIA_CHAT_MESSAGES_KEY);
};
