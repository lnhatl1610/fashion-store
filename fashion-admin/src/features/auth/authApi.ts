import api from "@/lib/api";

export interface AuthUser { id: string; name: string; email: string; role: "CUSTOMER" | "ADMIN" | "STAFF" }
export interface AuthResponse { user: AuthUser; accessToken: string; refreshToken: string }
export interface LoginInput { email: string; password: string }
export interface RegisterInput { name: string; email: string; password: string; phone?: string }

export const authApi = {
  login: (data: LoginInput) => api.post<{ success: boolean; data: AuthResponse }>("/auth/login", data),
  register: (data: RegisterInput) => api.post<{ success: boolean; data: AuthResponse }>("/auth/register", data),
};
