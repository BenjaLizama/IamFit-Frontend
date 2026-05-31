export const BACKEND_IP = "192.168.1.35";

export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));

    const customError = new Error(
      errorData.message || "Error desconocido",
    ) as any;
    customError.status = response.status;
    customError.code = errorData.code;
    customError.error = errorData.error;

    throw customError;
  }

  return response.json();
};
