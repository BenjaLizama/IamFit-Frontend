import { API, handleResponse } from "../api.service";
import { getAccessToken } from "../session/token.storage";
import {
  MiaHealthResponse,
  MiaPromptRequest,
  MiaPromptResponse,
} from "./mia.dtos";

const MIA_URL = `${API.ai}/api/v1`;
const MAX_PROMPT_LENGTH = 2000;

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

  const response = await fetch(`${MIA_URL}/prompt`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return handleResponse(response);
};

export const getMiaHealth = async (): Promise<MiaHealthResponse> => {
  const response = await fetch(`${MIA_URL}/health`);

  return handleResponse(response);
};

export const getMiaResponseText = (response: MiaPromptResponse) => {
  if (typeof response === "string") {
    return response;
  }

  return (
    response.response ||
    response.message ||
    response.content ||
    response.data?.response ||
    response.data?.message ||
    response.data?.content ||
    "M.I.A. respondio, pero no se pudo leer el mensaje."
  );
};
