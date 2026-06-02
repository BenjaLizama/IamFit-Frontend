import { API, handleResponse } from "../api.service";
import { getAccessToken } from "../session/token.storage";
import {
  MiaHealthResponse,
  MiaPromptRequest,
  MiaPromptResponse,
} from "./mia.dtos";

const MIA_URL = `${API.ai}/api/v1`;
const MAX_PROMPT_LENGTH = 2000;
const MIA_DEBUG = true;
const RESPONSE_TEXT_KEYS = [
  "response",
  "answer",
  "reply",
  "message",
  "content",
  "text",
  "result",
  "output",
  "respuesta",
  "mensaje",
];
const RESPONSE_WRAPPER_KEYS = ["data", "payload", "body", "result", "output"];

const parseMiaResponse = async (
  response: Response,
): Promise<MiaPromptResponse> => {
  if (MIA_DEBUG) {
    console.log("[MIA service] response status:", response.status);
    console.log("[MIA service] response url:", response.url);
  }

  if (!response.ok) {
    return handleResponse(response);
  }

  const rawBody = await response.text();

  if (MIA_DEBUG) {
    console.log("[MIA service] raw body:", rawBody);
  }

  if (!rawBody.trim()) {
    return "";
  }

  try {
    const parsedBody = JSON.parse(rawBody);

    if (MIA_DEBUG) {
      console.log("[MIA service] parsed body:", parsedBody);
    }

    return parsedBody;
  } catch {
    return rawBody;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const extractText = (value: unknown): string | undefined => {
  if (typeof value === "string") {
    const trimmedValue = value.trim();
    return trimmedValue || undefined;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    for (const item of [...value].reverse()) {
      const itemText = extractText(item);

      if (itemText) {
        return itemText;
      }
    }

    return undefined;
  }

  if (!isRecord(value)) {
    return undefined;
  }

  const choicesText = extractText(value.choices);

  if (choicesText) {
    return choicesText;
  }

  for (const key of RESPONSE_TEXT_KEYS) {
    const fieldText = extractText(value[key]);

    if (fieldText) {
      return fieldText;
    }
  }

  for (const key of RESPONSE_WRAPPER_KEYS) {
    const wrappedText = extractText(value[key]);

    if (wrappedText) {
      return wrappedText;
    }
  }

  return undefined;
};

export const sendPromptToMia = async (
  message: string,
): Promise<MiaPromptResponse> => {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    throw new Error("El mensaje no puede estar vacio");
  }

  if (trimmedMessage.length > MAX_PROMPT_LENGTH) {
    throw new Error("El mensaje no puede superar los 2000 caracteres");
  }

  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("No hay token de sesion. Inicia sesion nuevamente.");
  }

  const body: MiaPromptRequest = {
    message: trimmedMessage,
  };
  const url = `${MIA_URL}/prompt`;

  if (MIA_DEBUG) {
    console.log("[MIA service] sending prompt to:", url);
    console.log("[MIA service] body:", body);
    console.log("[MIA service] has access token:", Boolean(accessToken));
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return parseMiaResponse(response);
};

export const getMiaHealth = async (): Promise<MiaHealthResponse> => {
  const response = await fetch(`${MIA_URL}/health`);

  return handleResponse(response);
};

export const getMiaResponseText = (response: MiaPromptResponse) => {
  return (
    extractText(response) ||
    "M.I.A. respondio, pero no se pudo leer el mensaje."
  );
};
