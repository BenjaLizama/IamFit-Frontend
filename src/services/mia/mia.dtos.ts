export interface MiaPromptRequest {
  message: string;
}

export type MiaPromptResponse =
  | string
  | {
      response?: string;
      message?: string;
      content?: string;
      data?: {
        response?: string;
        message?: string;
        content?: string;
      };
    };

export interface MiaHealthResponse {
  status?: string;
  message?: string;
}
