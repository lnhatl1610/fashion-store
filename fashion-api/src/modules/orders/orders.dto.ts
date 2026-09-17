import { isOrderStatus, type UpdateOrderStatusDTO } from "./orders.types.js";

export const parseUpdateOrderStatus = (value: unknown): UpdateOrderStatusDTO => {
  if (!value || typeof value !== "object" || !("status" in value) || !isOrderStatus(value.status)) {
    throw new Error("Invalid order status");
  }
  return { status: value.status };
};
