import { Navigate } from "react-router-dom";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { DashboardPage } from "@/features/dashboard";
import { ProductPage } from "@/features/products";
import { UserPage } from "@/features/users";
import { CategoriesPage } from "@/features/categories";
import { InventoryPage } from "@/features/inventory/InventoryPage";
import { CouponsPage } from "@/features/coupons/CouponsPage";
import { ReviewsPage } from "@/features/reviews/ReviewsPage";
import { OrdersPage } from "@/features/orders";
import { AuthPage } from "@/features/auth/AuthPage";
import { ProtectedRoute } from "./ProtectedRoute";

const dashboardRoutes = [
  { path: "/login", element: <AuthPage /> },
  { path: "/register", element: <AuthPage /> },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { path: "/", element: <DashboardLayout />, children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UserPage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      { path: "categories", element: <CategoriesPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "coupons", element: <CouponsPage /> },
      { path: "reviews", element: <ReviewsPage /> },
      ] },
    ],
  },
];

export default dashboardRoutes;
