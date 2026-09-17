import type { User as PrismaUser } from "@prisma/client";

export interface User extends PrismaUser {}
export type SafeUser = Omit<User, "password" | "providerId">;

export interface AuthResponse {
  user: SafeUser;
  accessToken: string;
}

export interface AuthSession extends AuthResponse {
  refreshToken: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}
