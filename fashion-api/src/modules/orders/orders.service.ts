import { OrdersRepository } from "./orders.repository.js";
import type { AdminOrder, OrderStatus } from "./orders.types.js";

export class OrdersService {
  constructor(private readonly repository = new OrdersRepository()) {}

  list(): Promise<AdminOrder[]> {
    return this.repository.list();
  }

  updateStatus(id: string, status: OrderStatus): Promise<AdminOrder> {
    return this.repository.updateStatus(id, status);
  }
}
