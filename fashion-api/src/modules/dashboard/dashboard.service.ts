import type { DashboardOverview, DashboardRange, RevenuePoint } from "./dashboard.types.js";
import { DashboardRepository } from "./dashboard.repository.js";

const getChange = (current: number, previous: number) => {
  if (previous === 0) return current === 0 ? 0 : 100;
  return Math.round(((current - previous) / previous) * 100);
};

const formatRevenue = (value: number) => Math.round(value);

const buildRevenueSeries = (orders: Array<{ createdAt: Date; totalAmount: number }>, range: DashboardRange): RevenuePoint[] => {
  const buckets = new Map<string, number>();
  const now = new Date();
  const count = range === "7d" ? 7 : range === "30d" ? 30 : 12;

  for (let index = count - 1; index >= 0; index -= 1) {
    const date = new Date(now);
    if (range === "12m") {
      date.setDate(1);
      date.setMonth(date.getMonth() - index);
    } else {
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - index);
    }
    const key = range === "12m" ? `${date.getFullYear()}-${date.getMonth()}` : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    buckets.set(key, 0);
  }

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const key = range === "12m" ? `${date.getFullYear()}-${date.getMonth()}` : `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    if (buckets.has(key)) buckets.set(key, (buckets.get(key) ?? 0) + order.totalAmount);
  });

  return Array.from(buckets.entries()).map(([key, value]) => {
    const [year, month, day] = key.split("-").map(Number);
    const date = new Date(year, month, day ?? 1);
    return { label: range === "12m" ? date.toLocaleDateString("vi-VN", { month: "short" }) : date.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }), value: formatRevenue(value) };
  });
};

export class DashboardService {
  constructor(private readonly repository = new DashboardRepository()) {}

  async getOverview(range: DashboardRange): Promise<DashboardOverview> {
    const data = await this.repository.getOverview(range);
    return {
      range,
      stats: {
        revenue: { value: formatRevenue(data.currentRevenue), change: getChange(data.currentRevenue, data.previousRevenue) },
        orders: { value: data.currentOrders, change: getChange(data.currentOrders, data.previousOrders) },
        newCustomers: { value: data.currentCustomers, change: getChange(data.currentCustomers, data.previousCustomers) },
        lowStock: { value: data.lowStock, change: getChange(data.lowStock, data.previousLowStock) },
      },
      revenue: buildRevenueSeries(data.revenueOrders, range),
      orderStatus: data.orderStatus,
      recentOrders: data.recentOrders.map((order) => ({ id: order.id, customerName: order.user.name, totalAmount: order.totalAmount, status: order.status, createdAt: order.createdAt.toISOString() })),
      topProducts: data.topProducts,
      alerts: { lowStock: data.lowStock, pendingOrders: data.pendingOrders },
    };
  }
}
