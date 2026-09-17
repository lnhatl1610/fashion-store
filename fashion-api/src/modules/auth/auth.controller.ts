import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import type { RegisterDTO, LoginDTO } from "./auth.types.js";
import { sendSuccess, sendError } from "../../lib/response.js";
import { clearRefreshTokenCookie, getAuthClient, getRefreshTokenCookie, setRefreshTokenCookie } from "../../lib/auth-cookies.js";

export class AuthController {
  private authService: AuthService;

  constructor(authService?: AuthService) {
    this.authService = authService ?? new AuthService();
  }

  register = async (req: Request, res: Response) => {
    try {
      const data: RegisterDTO = req.body;
      const result = await this.authService.register(data);
      setRefreshTokenCookie(res, getAuthClient(req), result.refreshToken);
      return sendSuccess(res, { user: result.user, accessToken: result.accessToken }, "Registration successful", 201);
    } catch (err: any) {
      if (err.message === "Email already registered") {
        return sendError(res, err.message, 409);
      }
      return sendError(res, "Registration failed", 500, err.message ?? err);
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const data: LoginDTO = req.body;
      const result = await this.authService.login(data);
      setRefreshTokenCookie(res, getAuthClient(req), result.refreshToken);
      return sendSuccess(res, { user: result.user, accessToken: result.accessToken }, "Login successful");
    } catch (err: any) {
      if (err.message === "Invalid email or password" || err.message === "Account is banned") {
        return sendError(res, err.message, 401);
      }
      return sendError(res, "Login failed", 500, err.message ?? err);
    }
  };

  refreshToken = async (req: Request, res: Response) => {
    try {
      const client = getAuthClient(req);
      const refreshToken = getRefreshTokenCookie(req, client);
      if (!refreshToken) {
        return sendError(res, "Refresh token is required", 401);
      }

      const result = await this.authService.refreshToken(refreshToken);
      return sendSuccess(res, result, "Token refreshed successfully");
    } catch (err: any) {
      return sendError(res, "Token refresh failed", 401, err.message ?? err);
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      clearRefreshTokenCookie(res, getAuthClient(req));
      return sendSuccess(res, null, "Logout successful");
    } catch (err: any) {
      return sendError(res, "Logout failed", 500, err.message ?? err);
    }
  };
}
