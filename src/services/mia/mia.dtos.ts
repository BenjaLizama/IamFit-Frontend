export interface MiaPromptRequest {
  message: string;
}

export type MiaChatMessage = {
  id: string;
  type: "user" | "bot";
  text: string;
};

export type MiaPromptResponse =
  | string
  | {
      [key: string]: unknown;
      answer?: unknown;
      choices?: unknown;
      content?: unknown;
      data?: unknown;
      message?: unknown;
      reply?: unknown;
      response?: unknown;
      respuesta?: unknown;
      text?: unknown;
    };

export interface MiaHealthResponse {
  status?: string;
  message?: string;
}
