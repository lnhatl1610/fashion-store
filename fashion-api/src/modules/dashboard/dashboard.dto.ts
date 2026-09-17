import type { DashboardRange } from "./dashboard.types.js";

export const parseDashboardRange = (value: unknown): DashboardRange => {
  if (value === "30d" || value === "12m") return value;
  return "7d";
};
