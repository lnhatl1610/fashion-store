import { useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronRight, ClipboardList, FolderTree, LayoutDashboard, Menu, Moon, Package, PanelLeftClose, PanelLeftOpen, Search, Star, Sun, TicketPercent, UserCircle, Users, Warehouse } from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const siderItems = [
  { key: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { key: "users", icon: Users, label: "Users" },
  { key: "orders", icon: ClipboardList, label: "Orders" },
  { key: "products", icon: Package, label: "Products" },
  { key: "categories", icon: FolderTree, label: "Categories" },
  { key: "inventory", icon: Warehouse, label: "Inventory" },
  { key: "coupons", icon: TicketPercent, label: "Coupons" },
  { key: "reviews", icon: Star, label: "Reviews" },
];

export const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("fashion_admin_theme") === "dark");
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const user = useMemo(() => { try { return JSON.parse(localStorage.getItem("fashion_admin_user") ?? "null") as { name?: string; email?: string } | null; } catch { return null; } }, []);
  const current = siderItems.find((item) => location.pathname.includes(item.key)) ?? siderItems[0];

  const toggleTheme = () => { const next = !dark; setDark(next); localStorage.setItem("fashion_admin_theme", next ? "dark" : "light"); };
  const logout = async () => { try { await api.post("/auth/logout"); } finally { ["fashion_admin_access_token", "fashion_admin_refresh_token", "fashion_admin_user"].forEach((key) => localStorage.removeItem(key)); navigate("/login"); } };

  return <div className={cn("min-h-screen", dark && "bg-gray-950 text-white")}>
    <div className="flex min-h-screen">
      <aside className={cn("fixed inset-y-0 left-0 z-30 flex h-screen w-56 -translate-x-full flex-col border-r transition-all duration-200 md:sticky md:top-0 md:translate-x-0", collapsed ? "md:w-16" : "md:w-56", mobileMenu && "translate-x-0", dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white")}>
        <div className={cn("relative flex h-16 shrink-0 items-center border-b", collapsed ? "justify-center gap-0 px-0" : "justify-start px-3", dark ? "border-gray-800" : "border-gray-200")}>
          <div className="shrink-0"><Logo className={cn("rounded-xl", collapsed ? "h-8 w-8" : "h-10 w-10")} /></div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">{siderItems.map(({ key, icon: Icon, label }) => <button type="button" key={key} onClick={() => { navigate(`/${key}`); setMobileMenu(false); }} className={cn("flex min-h-11 items-center gap-3 rounded-lg px-3 text-left text-sm transition-colors", location.pathname.includes(key) ? "bg-gray-900 text-white" : (dark ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-700 hover:bg-gray-100"), collapsed && "md:justify-center md:px-0")}><Icon size={19} className="shrink-0" /><span className={cn(collapsed && "md:hidden")}>{label}</span></button>)}</nav>
      </aside>
      {mobileMenu && <button type="button" className="fixed inset-0 z-20 bg-gray-950/40 md:hidden" onClick={() => setMobileMenu(false)} aria-label="Đóng menu" />}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className={cn("sticky top-0 z-10 flex h-16 shrink-0 items-center gap-3 border-b px-4 shadow-sm sm:px-6", dark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white")}>
          <button type="button" onClick={() => setMobileMenu((open) => !open)} className={cn("rounded-lg p-2 md:hidden", dark ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100")} aria-label={mobileMenu ? "Đóng sidebar" : "Mở sidebar"} aria-expanded={mobileMenu}><Menu size={20} /></button>
          <button type="button" onClick={() => setCollapsed((value) => !value)} className={cn("hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition-colors md:flex", dark ? "hover:bg-gray-800 hover:text-white" : "hover:bg-gray-100 hover:text-gray-900")} aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"} aria-expanded={!collapsed}>{collapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}</button>
          <div className="flex min-w-0 items-center gap-2"><Link to="/dashboard" className="text-sm text-gray-400 transition-colors hover:text-gray-700">Home</Link><span className="text-gray-300">/</span><span className={cn("truncate text-sm font-semibold", dark ? "text-white" : "text-gray-800")}>{current.label}</span></div>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <label className="relative hidden w-44 lg:block"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" /><input aria-label="Tìm kiếm" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm kiếm..." className={cn("w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-900", dark ? "border-gray-700 bg-gray-800 text-white" : "bg-gray-50")} /></label>
            <button type="button" className={cn("relative rounded-lg p-2 text-gray-500", dark ? "hover:bg-gray-800" : "hover:bg-gray-100")} aria-label="Thông báo"><Bell size={19} /><span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" aria-label="3 thông báo" /></button>
            <button type="button" onClick={toggleTheme} className={cn("rounded-lg p-2 text-gray-500", dark ? "hover:bg-gray-800" : "hover:bg-gray-100")} aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
            <div className="relative"><button type="button" onClick={() => setProfileOpen((open) => !open)} className={cn("flex items-center gap-2 rounded-lg p-1.5", dark ? "hover:bg-gray-800" : "hover:bg-gray-100")} aria-expanded={profileOpen} aria-label="Mở menu tài khoản"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white"><UserCircle size={19} /></span><span className={cn("hidden max-w-28 truncate text-left text-sm font-medium sm:block", dark ? "text-white" : "text-gray-800")}>{user?.name ?? "Admin"}</span><ChevronRight size={15} className={cn("hidden text-gray-400 transition-transform sm:block", profileOpen && "rotate-90")} /></button>{profileOpen && <div className="absolute right-0 top-12 w-48 rounded-xl border bg-white p-1.5 text-sm text-gray-700 shadow-xl"><div className="border-b px-3 py-2"><p className="font-semibold">{user?.name ?? "Admin"}</p><p className="truncate text-xs text-gray-500">{user?.email ?? ""}</p></div><button type="button" onClick={() => setProfileOpen(false)} className="mt-1 w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100">Hồ sơ</button><button type="button" onClick={() => setProfileOpen(false)} className="w-full rounded-lg px-3 py-2 text-left hover:bg-gray-100">Cài đặt</button><button type="button" onClick={logout} className="w-full rounded-lg px-3 py-2 text-left text-red-600 hover:bg-red-50">Đăng xuất</button></div>}</div>
          </div>
        </header>
        <main data-dashboard-content className={cn("min-w-0 flex-1 overflow-x-hidden p-4 text-gray-900 sm:p-6", dark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900")}>
          <Outlet />
        </main>
      </div>
    </div>
  </div>;
};
