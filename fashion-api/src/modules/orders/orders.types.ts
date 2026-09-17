import type { OrderStatus, Prisma } from "@prisma/client";

export type { OrderStatus } from "@prisma/client";

export type AdminOrder = Prisma.OrderGetPayload<{
  include: {
    address: true;
    items: { include: { variant: { select: { sku: true } } } };
  };
}>;

export interface UpdateOrderStatusDTO {
  status: OrderStatus;
}

export const orderStatuses: readonly OrderStatus[] = ["PENDING", "PAID", "SHIPPING", "COMPLETED", "CANCELLED"];

export const isOrderStatus = (value: unknown): value is OrderStatus => typeof value === "string" && orderStatuses.includes(value as OrderStatus);
