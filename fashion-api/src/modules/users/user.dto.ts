import type { Gender, Role, UserStatus } from "./user.types.js";

export interface CreateUserDTO {
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role?: Role;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  avatar?: string | null;
  role?: Role;
  dateOfBirth?: Date | null;
  gender?: Gender | null;
  status?: UserStatus;
}
