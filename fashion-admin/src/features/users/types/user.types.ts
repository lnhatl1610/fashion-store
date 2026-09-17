export type Role = "CUSTOMER" | "ADMIN" | "STAFF";
export type UserStatus = "ACTIVE" | "BANNED";
export type Gender = "MALE" | "FEMALE" | "OTHER";
export type AuthProvider = "LOCAL" | "GOOGLE" | "FACEBOOK";

export interface User {
    id: string;
    email: string;
    name: string;
    phone?: string | null;
    avatar?: string | null;
    role: Role;
    dateOfBirth?: string | null;
    deletedAt?: string | null;
    emailVerifiedAt?: string | null;
    gender?: Gender | null;
    lastLoginAt?: string | null;
    phoneVerifiedAt?: string | null;
    provider: AuthProvider;
    status: UserStatus;
    createdAt: string;
    updatedAt: string;
}

export interface CreateUser {
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
}

export interface UpdateUser extends Omit<Partial<CreateUser>, "avatar"> {
    id: string;
    dateOfBirth?: string | null;
    gender?: Gender | null;
    status?: UserStatus;
    avatar?: string | null;
}
