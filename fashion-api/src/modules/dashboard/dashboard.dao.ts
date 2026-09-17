import type { DashboardDAOResult, DashboardRange } from "./dashboard.types.js";
import prisma from "../../config/db.js";

const getPeriodBounds = (range: DashboardRange) => {
  const now = new Date();
  const start = new Date(now);
  const previousStart = new Date(now);

  if (range === "12m") {
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    start.setMonth(start.getMonth() - 11);
    previousStart.setDate(1);
    previousStart.setHours(0, 0, 0, 0);
    previousStart.setMonth(previousStart.getMonth() - 23);
  } else {
    const days = range === "30d" ? 30 : 7;
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (days - 1));
    previousStart.setHours(0, 0, 0, 0);
    previousStart.setDate(previousStart.getDate() - (days * 2 - 1));
  }

  return { start, previousStart };
};

export class DashboardDAO {
  async getOverview(range: DashboardRange): Promise<DashboardDAOResult> {
    const { start, previousStart } = getPeriodBounds(range);
    const excludedRevenueStatus = { not: "CANCELLED" as const };

    const [
      currentOrders,
      previousOrders,
      currentRevenueOrders,
      previousRevenueOrders,
      currentCustomers,
      previousCustomers,
      lowStock,
      previousLowStock,
      revenueOrders,
      orderStatus,
      recentOrders,
      topProductGroups,
      pendingOrders,
    ] = await Promise.all([
      prisma.order.count({ where: { createdAt: { gte: start } } }),
      prisma.order.count({ where: { createdAt: { gte: previousStart, lt: start } } }),
      prisma.order.aggregate({ where: { createdAt: { gte: start }, status: excludedRevenueStatus }, _sum: { totalAmount: true } }),
      prisma.order.aggregate({ where: { createdAt: { gte: previousStart, lt: start }, status: excludedRevenueStatus }, _sum: { totalAmount: true } }),
      prisma.user.count({ where: { createdAt: { gte: start }, role: "CUSTOMER" } }),
      prisma.user.count({ where: { createdAt: { gte: previousStart, lt: start }, role: "CUSTOMER" } }),
      prisma.productVariant.count({ where: { stockQuantity: { lte: 5 }, product: { status: "ACTIVE" } } }),
      prisma.productVariant.count({ where: { stockQuantity: { lte: 5 }, updatedAt: { lt: start }, product: { status: "ACTIVE" } } }),
      prisma.order.findMany({ where: { createdAt: { gte: start }, status: excludedRevenueStatus }, select: { createdAt: true, totalAmount: true }, orderBy: { createdAt: "asc" } }),
      prisma.order.groupBy({ by: ["status"], where: { createdAt: { gte: start } }, _count: { _all: true } }),
      prisma.order.findMany({ where: { createdAt: { gte: start } }, orderBy: { createdAt: "desc" }, take: 5, select: { id: true, totalAmount: true, status: true, createdAt: true, user: { select: { name: true } } } }),
      prisma.orderItem.groupBy({ by: ["variantId"], where: { order: { createdAt: { gte: start }, status: excludedRevenueStatus } }, _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 }),
      prisma.order.count({ where: { status: { in: ["PENDING", "PAID"] } } }),
    ]);

    const variantIds = topProductGroups.map((item) => item.variantId);
    const variants = await prisma.productVariant.findMany({ where: { id: { in: variantIds } }, select: { id: true, product: { select: { id: true, name: true, thumbnail: true } } } });
    const variantsById = new Map(variants.map((variant) => [variant.id, variant.product]));
    const topProducts = topProductGroups.flatMap((item) => {
      const product = variantsById.get(item.variantId);
      return product ? [{ id: product.id, name: product.name, thumbnail: product.thumbnail, soldQuantity: item._sum.quantity ?? 0 }] : [];
    });

    return {
      start,
      previousStart,
      currentOrders,
      previousOrders,
      currentRevenue: currentRevenueOrders._sum.totalAmount ?? 0,
      previousRevenue: previousRevenueOrders._sum.totalAmount ?? 0,
      currentCustomers,
      previousCustomers,
      lowStock,
      previousLowStock,
      revenueOrders,
      orderStatus: orderStatus.map((item) => ({ status: item.status, count: item._count._all })),
      recentOrders,
      topProducts,
      pendingOrders,
    };
  }
}
