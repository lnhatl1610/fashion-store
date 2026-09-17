export type DashboardRange = "7d" | "30d" | "12m";
export type OrderStatus = "PENDING" | "PAID" | "SHIPPING" | "COMPLETED" | "CANCELLED";

export interface DashboardStat {
  value: number;
  change: number;
}

export interface DashboardOverview {
  range: DashboardRange;
  stats: {
    revenue: DashboardStat;
    orders: DashboardStat;
    newCustomers: DashboardStat;
    lowStock: DashboardStat;
  };
  revenue: Array<{ label: string; value: number }>;
  orderStatus: Array<{ status: OrderStatus; count: number }>;
  recentOrders: Array<{ id: string; customerName: string; totalAmount: number; status: OrderStatus; createdAt: string }>;
  topProducts: Array<{ id: string; name: string; thumbnail: string | null; soldQuantity: number }>;
  alerts: { lowStock: number; pendingOrders: number };
}
