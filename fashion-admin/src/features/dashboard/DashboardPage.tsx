import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowDownRight, ArrowUpRight, BarChart3, Boxes, CircleDollarSign, Clock3, Package, RefreshCw, ShoppingCart, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { dashboardApi } from "./api";
import type { DashboardOverview, DashboardRange, DashboardStat, OrderStatus } from "./types";

const rangeLabels: Record<DashboardRange, string> = { "7d": "7 ngày", "30d": "30 ngày", "12m": "12 tháng" };
const statusLabels: Record<OrderStatus, string> = { PENDING: "Chờ xử lý", PAID: "Đã thanh toán", SHIPPING: "Đang giao", COMPLETED: "Hoàn tất", CANCELLED: "Đã hủy" };
const statusColors: Record<OrderStatus, string> = { PENDING: "#f59e0b", PAID: "#6366f1", SHIPPING: "#0ea5e9", COMPLETED: "#10b981", CANCELLED: "#ef4444" };
const money = (value: number) => `${Math.round(value).toLocaleString("vi-VN")} ₫`;

const statCards = [
  { key: "revenue", label: "Tổng doanh thu", icon: CircleDollarSign, iconClass: "bg-emerald-50 text-emerald-600", format: money },
  { key: "orders", label: "Đơn hàng mới", icon: ShoppingCart, iconClass: "bg-blue-50 text-blue-600", format: (value: number) => value.toLocaleString("vi-VN") },
  { key: "newCustomers", label: "Khách hàng mới", icon: Users, iconClass: "bg-violet-50 text-violet-600", format: (value: number) => value.toLocaleString("vi-VN") },
  { key: "lowStock", label: "Sản phẩm sắp hết", icon: Boxes, iconClass: "bg-amber-50 text-amber-600", format: (value: number) => value.toLocaleString("vi-VN") },
] as const;

const formatDate = (value: string) => new Date(value).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

function Trend({ stat, inverse = false }: { stat: DashboardStat; inverse?: boolean }) {
  const positive = inverse ? stat.change <= 0 : stat.change >= 0;
  const Icon = stat.change >= 0 ? ArrowUpRight : ArrowDownRight;
  return <span className={positive ? "inline-flex items-center gap-1 text-xs font-semibold text-emerald-600" : "inline-flex items-center gap-1 text-xs font-semibold text-red-600"}><Icon size={14} />{Math.abs(stat.change)}% <span className="font-normal text-gray-400">so với kỳ trước</span></span>;
}

function RevenueChart({ points }: { points: DashboardOverview["revenue"] }) {
  const max = Math.max(...points.map((point) => point.value), 1);
  const chartPoints = points.map((point, index) => `${(index / Math.max(points.length - 1, 1)) * 100},${92 - (point.value / max) * 76}`).join(" ");
  const areaPoints = `0,100 ${chartPoints} 100,100`;
  return <div className="mt-5 min-w-0">
    {points.length ? <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-64 w-full overflow-visible" role="img" aria-label="Biểu đồ doanh thu"><defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#6366f1" stopOpacity=".24" /><stop offset="1" stopColor="#6366f1" stopOpacity="0" /></linearGradient></defs><line x1="0" x2="100" y1="24" y2="24" stroke="#e5e7eb" strokeDasharray="1 2" /><line x1="0" x2="100" y1="50" y2="50" stroke="#e5e7eb" strokeDasharray="1 2" /><line x1="0" x2="100" y1="76" y2="76" stroke="#e5e7eb" strokeDasharray="1 2" /><polygon points={areaPoints} fill="url(#revenue-fill)" /><polyline points={chartPoints} fill="none" stroke="#6366f1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" vectorEffect="non-scaling-stroke" /></svg>
      <div className="mt-2 flex justify-between gap-2 text-[11px] text-gray-400">{points.filter((_, index) => points.length <= 8 || index % 5 === 0 || index === points.length - 1).map((point) => <span key={point.label}>{point.label}</span>)}</div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500"><span className="h-2 w-2 rounded-full bg-indigo-500" />Doanh thu thuần</div>
    </> : <div className="flex h-64 items-center justify-center rounded-lg bg-gray-50 text-sm text-gray-500">Chưa có dữ liệu doanh thu trong khoảng thời gian này.</div>}
  </div>;
}

function StatusBreakdown({ items }: { items: DashboardOverview["orderStatus"] }) {
  const total = items.reduce((sum, item) => sum + item.count, 0);
  let cursor = 0;
  const segments = items.map((item) => {
    const start = total ? (cursor / total) * 360 : 0;
    cursor += item.count;
    const end = total ? (cursor / total) * 360 : 360;
    return `${statusColors[item.status]} ${start}deg ${end}deg`;
  });
  return <div className="mt-5 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
    <div className="relative h-44 w-44 shrink-0 rounded-full" style={{ background: total ? `conic-gradient(${segments.join(", ")})` : "#e5e7eb" }}><div className="absolute inset-7 flex flex-col items-center justify-center rounded-full bg-white"><span className="text-3xl font-bold text-gray-900">{total}</span><span className="text-xs text-gray-500">đơn hàng</span></div></div>
    <div className="grid w-full gap-3">{items.length ? items.map((item) => <div key={item.status} className="flex items-center justify-between gap-3 text-sm"><span className="flex items-center gap-2 text-gray-600"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: statusColors[item.status] }} />{statusLabels[item.status]}</span><span className="font-semibold text-gray-900">{item.count}</span></div>) : <p className="text-sm text-gray-500">Chưa có dữ liệu trạng thái đơn hàng.</p>}</div>
  </div>;
}

export const DashboardPage = () => {
  const [range, setRange] = useState<DashboardRange>("7d");
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData((await dashboardApi.overview(range)).data.data);
      setError("");
    } catch {
      setError("Không thể tải dữ liệu tổng quan. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => { void load(); }, [load]);

  const topProductMax = useMemo(() => Math.max(...(data?.topProducts.map((product) => product.soldQuantity) ?? [1]), 1), [data]);

  if (loading && !data) return <div className="flex min-h-[520px] items-center justify-center gap-2 text-sm text-gray-500"><RefreshCw size={17} className="animate-spin" />Đang tải tổng quan...</div>;

  return <div className="space-y-6">
    <div className="flex justify-end"><div className="flex items-center gap-2"><select aria-label="Khoảng thời gian báo cáo" value={range} onChange={(event) => setRange(event.target.value as DashboardRange)} className="rounded-lg border bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100">{Object.entries(rangeLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><button type="button" onClick={() => void load()} className="inline-flex h-10 items-center gap-2 rounded-lg border bg-white px-3 text-sm text-gray-700 transition-colors hover:bg-gray-50" aria-label="Tải lại dashboard"><RefreshCw size={15} className={loading ? "animate-spin" : ""} />Tải lại</button></div></div>
    {error && <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => void load()} className="font-semibold underline underline-offset-2">Thử lại</button></div>}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{statCards.map(({ key, label, icon: Icon, iconClass, format }) => { const stat = data?.stats[key] ?? { value: 0, change: 0 }; return <div key={key} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-gray-500">{label}</p><p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{format(stat.value)}</p></div><span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}><Icon size={20} /></span></div><div className="mt-4"><Trend stat={stat} inverse={key === "lowStock"} /></div></div>; })}</div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"><section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-gray-900">Doanh thu</h2><p className="mt-1 text-sm text-gray-500">Biến động doanh thu trong {rangeLabels[range].toLowerCase()}</p></div><BarChart3 size={20} className="text-indigo-500" /></div><RevenueChart points={data?.revenue ?? []} /></section><section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-gray-900">Trạng thái đơn hàng</h2><p className="mt-1 text-sm text-gray-500">Phân bổ trong kỳ báo cáo</p></div><ShoppingCart size={20} className="text-indigo-500" /></div><StatusBreakdown items={data?.orderStatus ?? []} /></section></div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]"><section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"><div className="flex items-center justify-between gap-3 border-b px-5 py-4 sm:px-6"><div><h2 className="font-semibold text-gray-900">Đơn hàng gần đây</h2><p className="mt-1 text-sm text-gray-500">Các đơn mới nhất cần theo dõi</p></div><Link to="/orders" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Xem tất cả</Link></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-5 py-3 font-medium">Mã đơn</th><th className="px-5 py-3 font-medium">Khách hàng</th><th className="px-5 py-3 font-medium">Ngày tạo</th><th className="px-5 py-3 font-medium">Tổng tiền</th><th className="px-5 py-3 font-medium">Trạng thái</th></tr></thead><tbody className="divide-y divide-gray-100">{data?.recentOrders.length ? data.recentOrders.map((order) => <tr key={order.id} className="hover:bg-gray-50"><td className="px-5 py-4 font-mono text-xs text-gray-600">#{order.id.slice(0, 8)}</td><td className="px-5 py-4 font-medium text-gray-900">{order.customerName}</td><td className="whitespace-nowrap px-5 py-4 text-gray-500">{formatDate(order.createdAt)}</td><td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">{money(order.totalAmount)}</td><td className="px-5 py-4"><span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">{statusLabels[order.status]}</span></td></tr>) : <tr><td colSpan={5} className="px-5 py-12 text-center text-sm text-gray-500">Chưa có đơn hàng gần đây.</td></tr>}</tbody></table></div></section><section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold text-gray-900">Sản phẩm bán chạy</h2><p className="mt-1 text-sm text-gray-500">Top sản phẩm theo số lượng bán</p></div><Package size={20} className="text-indigo-500" /></div><div className="mt-5 space-y-4">{data?.topProducts.length ? data.topProducts.map((product, index) => <div key={product.id} className="flex items-center gap-3"><span className="w-5 text-sm font-semibold text-gray-400">0{index + 1}</span>{product.thumbnail ? <img src={product.thumbnail} alt="" className="h-11 w-11 rounded-lg object-cover" /> : <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-400"><Package size={18} /></span>}<div className="min-w-0 flex-1"><div className="flex items-center justify-between gap-2"><p className="truncate text-sm font-medium text-gray-900">{product.name}</p><span className="shrink-0 text-xs font-semibold text-gray-600">{product.soldQuantity} đã bán</span></div><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${(product.soldQuantity / topProductMax) * 100}%` }} /></div></div></div>) : <div className="flex min-h-40 items-center justify-center text-center text-sm text-gray-500">Chưa có dữ liệu sản phẩm bán chạy.</div>}</div></section></div>
    <section className="rounded-2xl border border-amber-100 bg-amber-50/60 p-5 shadow-sm sm:p-6"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><AlertTriangle size={20} /></span><div className="min-w-0"><h2 className="font-semibold text-gray-900">Cảnh báo cần xử lý</h2><div className="mt-3 flex flex-wrap gap-3 text-sm"><Link to="/inventory" className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-gray-700 hover:border-amber-300"><Boxes size={16} className="text-amber-600" />{data?.alerts.lowStock ?? 0} sản phẩm sắp hết hàng</Link><Link to="/orders" className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2 text-gray-700 hover:border-amber-300"><Clock3 size={16} className="text-amber-600" />{data?.alerts.pendingOrders ?? 0} đơn cần xử lý</Link></div></div></div></section>
  </div>;
};

export default DashboardPage;
