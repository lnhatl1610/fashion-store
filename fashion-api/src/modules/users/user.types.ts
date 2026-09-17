import type { AuthProvider, Gender, Role, User as PrismaUser, UserStatus } from "@prisma/client";

export type { AuthProvider, Gender, Role, UserStatus };

export interface User extends PrismaUser { }

export type SafeUser = Omit<User, "password" | "providerId">;
