import type { OrderStatus } from "@prisma/client";

export type DashboardRange = "7d" | "30d" | "12m";

export interface DashboardStat {
  value: number;
  change: number;
}

export interface RevenuePoint {
  label: string;
  value: number;
}

export interface OrderStatusPoint {
  status: OrderStatus;
  count: number;
}

export interface RecentOrder {
  id: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface TopProduct {
  id: string;
  name: string;
  thumbnail: string | null;
  soldQuantity: number;
}

export interface DashboardOverview {
  range: DashboardRange;
  stats: {
    revenue: DashboardStat;
    orders: DashboardStat;
    newCustomers: DashboardStat;
    lowStock: DashboardStat;
  };
  revenue: RevenuePoint[];
  orderStatus: OrderStatusPoint[];
  recentOrders: RecentOrder[];
  topProducts: TopProduct[];
  alerts: {
    lowStock: number;
    pendingOrders: number;
  };
}

export interface DashboardDAOResult {
  start: Date;
  previousStart: Date;
  currentOrders: number;
  previousOrders: number;
  currentRevenue: number;
  previousRevenue: number;
  currentCustomers: number;
  previousCustomers: number;
  lowStock: number;
  previousLowStock: number;
  revenueOrders: Array<{ createdAt: Date; totalAmount: number }>;
  orderStatus: Array<{ status: OrderStatus; count: number }>;
  recentOrders: Array<{
    id: string;
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    user: { name: string };
  }>;
  topProducts: TopProduct[];
  pendingOrders: number;
}
