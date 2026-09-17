import api from "@/lib/api";
import type { DashboardOverview, DashboardRange } from "./types";

export const dashboardApi = {
  overview: (range: DashboardRange) => api.get<{ success: boolean; data: DashboardOverview }>("/dashboard/overview", { params: { range } }),
};
