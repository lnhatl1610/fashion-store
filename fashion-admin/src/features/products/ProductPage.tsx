import { useCallback, useEffect, useMemo, useState } from "react";
import { Package, RefreshCw, Search } from "lucide-react";
import productService from "./services/productService";
import type { Product, ProductStatus } from "./types/product.types";

const statusLabels: Record<ProductStatus, string> = { ACTIVE: "Đang bán", DRAFT: "Bản nháp", ARCHIVED: "Đã lưu trữ" };
const money = (value: number) => `${value.toLocaleString("vi-VN")} ₫`;

export const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"ALL" | ProductStatus>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const response = await productService.getProducts({ limit: 100, status: status === "ALL" ? undefined : status });
      setProducts(response.data.data.items);
    } catch { setError("Không thể tải danh sách sản phẩm. Vui lòng kiểm tra API và thử lại."); }
    finally { setLoading(false); }
  }, [status]);

  useEffect(() => { void loadProducts(); }, [loadProducts]);
  const visible = useMemo(() => products.filter((product) => !query || `${product.name} ${product.slug}`.toLowerCase().includes(query.toLowerCase())), [products, query]);

  return <div className="space-y-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><h1 className="text-xl font-bold text-gray-900">Products</h1><p className="text-sm text-gray-500">Quản lý sản phẩm và biến thể trong catalog</p></div><div className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-600">{visible.length} sản phẩm</div></div><div className="flex flex-col gap-3 rounded-xl border bg-gray-50 p-3 sm:flex-row"><label className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-2.5 text-gray-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm theo tên hoặc slug..." aria-label="Tìm sản phẩm" className="w-full rounded-lg border bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label><select value={status} onChange={(event) => setStatus(event.target.value as "ALL" | ProductStatus)} aria-label="Lọc trạng thái" className="rounded-lg border bg-white px-3 py-2 text-sm"><option value="ALL">Tất cả trạng thái</option><option value="ACTIVE">Đang bán</option><option value="DRAFT">Bản nháp</option><option value="ARCHIVED">Đã lưu trữ</option></select><button type="button" onClick={() => void loadProducts()} className="inline-flex items-center justify-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm hover:bg-gray-100" aria-label="Tải lại sản phẩm"><RefreshCw size={16} />Tải lại</button></div>{error && <div role="alert" className="flex items-center justify-between gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => void loadProducts()} className="shrink-0 font-semibold underline">Thử lại</button></div>}<div className="overflow-x-auto rounded-xl border bg-white">{loading ? <div className="flex items-center justify-center gap-2 p-12 text-sm text-gray-500"><RefreshCw size={16} className="animate-spin" />Đang tải sản phẩm...</div> : <table className="w-full min-w-[720px] text-left text-sm"><thead className="border-b bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3">Sản phẩm</th><th className="px-4 py-3">Danh mục</th><th className="px-4 py-3">Giá</th><th className="px-4 py-3">SKU</th><th className="px-4 py-3">Tồn kho</th><th className="px-4 py-3">Trạng thái</th></tr></thead><tbody className="divide-y">{visible.map((product) => { const stock = product.variants?.reduce((total, variant) => total + variant.stockQuantity, 0) ?? 0; return <tr key={product.id} className="hover:bg-gray-50"><td className="px-4 py-3"><div className="flex items-center gap-3">{product.thumbnail ? <img src={product.thumbnail} alt="" className="h-11 w-11 rounded-lg object-cover" /> : <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-100 text-gray-400"><Package size={19} /></div>}<div className="min-w-0"><p className="truncate font-medium text-gray-900">{product.name}</p><p className="truncate text-xs text-gray-500">/{product.slug}</p></div></div></td><td className="px-4 py-3 text-gray-600">{product.category?.name ?? "Chưa phân loại"}</td><td className="whitespace-nowrap px-4 py-3 font-medium">{money(product.basePrice)}</td><td className="px-4 py-3 text-xs text-gray-600">{product.variants?.length ? `${product.variants.length} SKU` : "Chưa có SKU"}</td><td className="px-4 py-3">{stock}</td><td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${product.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : product.status === "DRAFT" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"}`}>{statusLabels[product.status]}</span></td></tr>; })}{!visible.length && <tr><td colSpan={6} className="p-12 text-center text-sm text-gray-500">{products.length ? "Không tìm thấy sản phẩm phù hợp." : "Chưa có sản phẩm nào."}</td></tr>}</tbody></table>}</div></div>;
};

export default ProductPage;
