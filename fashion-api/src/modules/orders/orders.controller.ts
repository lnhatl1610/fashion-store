import type { Request, Response } from "express";
import { sendError, sendSuccess } from "../../lib/response.js";
import { parseUpdateOrderStatus } from "./orders.dto.js";
import { OrdersService } from "./orders.service.js";

export class OrdersController {
  constructor(private readonly service = new OrdersService()) {}

  list = async (_req: Request, res: Response) => {
    try {
      return sendSuccess(res, await this.service.list(), "Orders fetched successfully");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch orders";
      return sendError(res, "Failed to fetch orders", 500, message);
    }
  };

  updateStatus = async (req: Request, res: Response) => {
    try {
      const { status } = parseUpdateOrderStatus(req.body);
      return sendSuccess(res, await this.service.updateStatus(req.params.id as string, status), "Order status updated successfully");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to update order status";
      const statusCode = message === "Invalid order status" ? 400 : message.includes("Record to update not found") ? 404 : 500;
      return sendError(res, message, statusCode);
    }
  };
}
