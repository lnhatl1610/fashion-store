import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import type { CreateUserDTO, UpdateUserDTO } from "./user.dto.js";
import type { SafeUser, User } from "./user.types.js";
import { sendSuccess, sendError } from "../../lib/response.js";

const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : "Unknown error";

const sanitizeUser = (user: User | null): SafeUser | null => {
  if (!user) return user;
  const { password: _password, providerId: _providerId, ...safeUser } = user;
  return safeUser;
};

export class UserController {
  private userService: UserService;

  constructor(userService?: UserService) {
    this.userService = userService ?? new UserService();
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const data: CreateUserDTO = req.body;

      const existingUser = await this.userService.getUserByEmail(data.email);
      if (existingUser) {
        return sendError(res, "Email already registered", 409);
      }

      const user = await this.userService.createUser(data);
      return sendSuccess(res, sanitizeUser(user), "User created successfully", 201);
    } catch (err: unknown) {
      return sendError(res, "Failed to create user", 500, getErrorMessage(err));
    }
  };

  getAllUsers = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return sendSuccess(res, users.map(sanitizeUser), "Users fetched successfully");
    } catch (err: unknown) {
      return sendError(res, "Failed to fetch users", 500, getErrorMessage(err));
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id || typeof id !== "string") {
        return sendError(res, "Missing or invalid user ID in parameters", 400);
      }

      const user = await this.userService.getUserById(id);
      if (!user) {
        return sendError(res, "User not found", 404);
      }

      return sendSuccess(res, sanitizeUser(user), "User fetched successfully");
    } catch (err: unknown) {
      return sendError(res, "Failed to fetch user", 500, getErrorMessage(err));
    }
  };

  getUserByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.params.email as string;

      if (!email || typeof email !== "string") {
        return sendError(res, "Missing or invalid email in parameters", 400);
      }

      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        return sendError(res, "User not found", 404);
      }

      return sendSuccess(res, sanitizeUser(user), "User fetched successfully");
    } catch (err: unknown) {
      return sendError(res, "Failed to fetch user", 500, getErrorMessage(err));
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const data: UpdateUserDTO = req.body;

      if (!id || typeof id !== "string") {
        return sendError(res, "Missing or invalid user ID in parameters", 400);
      }

      const user = await this.userService.updateUser(id, data);
      if (!user) {
        return sendError(res, "User not found", 404);
      }

      return sendSuccess(res, sanitizeUser(user), "User updated successfully");
    } catch (err: unknown) {
      return sendError(res, "Failed to update user", 500, getErrorMessage(err));
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id || typeof id !== "string") {
        return sendError(res, "Missing or invalid user ID in parameters", 400);
      }

      const user = await this.userService.deleteUser(id);
      if (!user) {
        return sendError(res, "User not found", 404);
      }

      return sendSuccess(res, null, "User deleted successfully");
    } catch (err: unknown) {
      return sendError(res, "Failed to delete user", 500, getErrorMessage(err));
    }
  };
}
