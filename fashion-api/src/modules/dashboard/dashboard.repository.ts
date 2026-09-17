import { DashboardDAO } from "./dashboard.dao.js";
import type { DashboardDAOResult, DashboardRange } from "./dashboard.types.js";

export class DashboardRepository {
  constructor(private readonly dao = new DashboardDAO()) {}

  getOverview(range: DashboardRange): Promise<DashboardDAOResult> {
    return this.dao.getOverview(range);
  }
}
