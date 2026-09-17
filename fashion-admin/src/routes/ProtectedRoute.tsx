import { Navigate, Outlet, useLocation } from "react-router-dom";
export function ProtectedRoute() { const location = useLocation(); return localStorage.getItem("fashion_admin_access_token") ? <Outlet /> : <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />; }
