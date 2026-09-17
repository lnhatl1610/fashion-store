import { OrdersDAO } from "./orders.dao.js";
import type { AdminOrder, OrderStatus } from "./orders.types.js";

export class OrdersRepository {
  constructor(private readonly dao = new OrdersDAO()) {}

  list(): Promise<AdminOrder[]> {
    return this.dao.list();
  }

  updateStatus(id: string, status: OrderStatus): Promise<AdminOrder> {
    return this.dao.updateStatus(id, status);
  }
}
