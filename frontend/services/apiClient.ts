export interface ApiErrorPayload {
  statusCode?: number;
  message?: string | string[];
  timestamp?: string;
  path?: string;
}

export class ApiError extends Error {
  statusCode?: number;
  payload?: ApiErrorPayload;

  constructor(message: string, statusCode?: number, payload?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.payload = payload;
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
  "http://localhost:3001";

const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

const parseError = async (res: Response): Promise<ApiError> => {
  let payload: ApiErrorPayload | undefined;

  try {
    payload = await res.json();
  } catch {}

  const message = payload?.message
    ? Array.isArray(payload.message)
      ? payload.message.join(", ")
      : payload.message
    : `Request failed with status ${res.status}`;

  return new ApiError(message, res.status, payload);
};

class ApiClient {
  private async send<T>(path: string, options: RequestInit): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (!res.ok) throw await parseError(res);
    if (res.status === 204) return {} as T;

    return res.json() as Promise<T>;
  }

  get<T>(path: string) {
    return this.send<T>(path, { method: "GET" });
  }
  post<T>(path: string, body: unknown) {
    return this.send<T>(path, { method: "POST", body: JSON.stringify(body) });
  }
  patch<T>(path: string, body?: unknown) {
    return this.send<T>(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }
  delete<T>(path: string) {
    return this.send<T>(path, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
