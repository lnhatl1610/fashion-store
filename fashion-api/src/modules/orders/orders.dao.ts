import prisma from "../../config/db.js";
import type { AdminOrder } from "./orders.types.js";

const orderInclude = {
  address: true,
  items: { include: { variant: { select: { sku: true } } } },
} as const;

export class OrdersDAO {
  list(): Promise<AdminOrder[]> {
    return prisma.order.findMany({ orderBy: { createdAt: "desc" }, include: orderInclude });
  }

  updateStatus(id: string, status: AdminOrder["status"]): Promise<AdminOrder> {
    return prisma.order.update({ where: { id }, data: { status }, include: orderInclude });
  }
}
