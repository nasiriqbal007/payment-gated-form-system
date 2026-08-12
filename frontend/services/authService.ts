import { apiClient } from "@/services/apiClient";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  admin: AdminUser;
}

export const authService = {
  login: async (dto: LoginDto): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>("/auth/login", dto);
    if (res.access_token && typeof window !== "undefined") {
      localStorage.setItem("adminToken", res.access_token);
    }
    return res;
  },

  getProfile: () => apiClient.get<{ message: string }>("/auth/profile"),

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
  },
};
