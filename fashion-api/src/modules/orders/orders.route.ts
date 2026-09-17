import { Router } from "express";
import { requireAuth, requireRole } from "../../middlewares/auth.middleware.js";
import { OrdersController } from "./orders.controller.js";

const ordersRouter = Router();
const controller = new OrdersController();

ordersRouter.use(requireAuth, requireRole("ADMIN", "STAFF"));
ordersRouter.get("/", controller.list);
ordersRouter.put("/:id/status", controller.updateStatus);

export { ordersRouter };
