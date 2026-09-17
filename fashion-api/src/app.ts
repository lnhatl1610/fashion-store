import "dotenv/config";
import express from "express";
import type { Application } from "express";
import cors, { type CorsOptions } from "cors";
import { userRouter } from "./modules/users/user.route.js";
import { categoryRouter } from "./modules/categories/category.route.js";
import { productRouter } from "./modules/products/product.route.js";
import { authRouter } from "./modules/auth/auth.route.js";
import { couponRouter } from "./modules/coupons/coupon.route.js";
import { reviewRouter } from "./modules/reviews/review.route.js";
import { accountRouter } from "./modules/account/account.route.js";
import { wishlistRouter } from "./modules/wishlists/wishlist.route.js";
import { catalogExperienceRouter } from "./modules/catalog-experience/catalog-experience.route.js";
import { dashboardRouter } from "./modules/dashboard/dashboard.route.js";
import { ordersRouter } from "./modules/orders/orders.route.js";

const app: Application = express();

const allowedOrigins = new Set(
  (process.env.CLIENT_ORIGINS ?? "http://localhost:5173,http://localhost:5174,http://127.0.0.1:5173,http://127.0.0.1:5174")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/coupons", couponRouter);
app.use("/reviews", reviewRouter);
app.use("/account", accountRouter);
app.use("/wishlists", wishlistRouter);
app.use("/catalog", catalogExperienceRouter);
app.use("/dashboard", dashboardRouter);
app.use("/orders", ordersRouter);

// Keep the versioned API prefix used by the storefront and admin clients.
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/account", accountRouter);
app.use("/api/wishlists", wishlistRouter);
app.use("/api/catalog", catalogExperienceRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/orders", ordersRouter);

export default app;
