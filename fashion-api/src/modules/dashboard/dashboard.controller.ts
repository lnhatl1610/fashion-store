import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../lib/response.js";
import { parseDashboardRange } from "./dashboard.dto.js";
import { DashboardService } from "./dashboard.service.js";

export class DashboardController {
  constructor(private readonly service = new DashboardService()) {}

  overview = async (req: Request, res: Response) => {
    try {
      return sendSuccess(res, await this.service.getOverview(parseDashboardRange(req.query.range)), "Dashboard overview fetched successfully");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch dashboard overview";
      return sendError(res, "Failed to fetch dashboard overview", 500, message);
    }
  };
}
