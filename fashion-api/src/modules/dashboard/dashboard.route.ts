import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { DashboardController } from "./dashboard.controller.js";

const dashboardRouter = Router();
const controller = new DashboardController();

dashboardRouter.use(requireAuth, requireRole("ADMIN", "STAFF"));
dashboardRouter.get("/overview", controller.overview);

export { dashboardRouter };
