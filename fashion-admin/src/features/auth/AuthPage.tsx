import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { authApi, type AuthResponse } from "./authApi";

export function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params] = useSearchParams();
  const isRegister = location.pathname === "/register" || params.get("mode") === "register";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setLoading(true); setError("");
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = isRegister ? await authApi.register({ name: name.trim(), email: normalizedEmail, password, phone: phone.trim() || undefined }) : await authApi.login({ email: normalizedEmail, password });
      const data: AuthResponse = response.data.data;
      localStorage.setItem("fashion_admin_access_token", data.accessToken);
      localStorage.setItem("fashion_admin_refresh_token", data.refreshToken);
      localStorage.setItem("fashion_admin_user", JSON.stringify(data.user));
      navigate("/dashboard", { replace: true });
    } catch (requestError: unknown) {
      const message = requestError && typeof requestError === "object" && "response" in requestError ? String((requestError as { response?: { data?: { message?: string } } }).response?.data?.message ?? "Thông tin đăng nhập không hợp lệ.") : "Không thể kết nối máy chủ.";
      setError(message);
    } finally { setLoading(false); }
  };

  return <main className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-10"><div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-2"><section className="hidden bg-gray-900 p-10 text-white md:flex md:flex-col md:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.25em] text-gray-400">Fashion Store</p><h1 className="mt-8 text-4xl font-semibold leading-tight">Quản trị cửa hàng<br />đơn giản hơn.</h1><p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">Theo dõi sản phẩm, người dùng và hoạt động kinh doanh từ một nơi.</p></div><p className="text-xs text-gray-500">Admin Console · {new Date().getFullYear()}</p></section><section className="p-6 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">Admin Console</p><h2 className="mt-5 text-2xl font-semibold text-gray-900">{isRegister ? "Tạo tài khoản" : "Chào mừng trở lại"}</h2><p className="mt-2 text-sm text-gray-500">{isRegister ? "Đăng ký tài khoản để bắt đầu quản trị." : "Đăng nhập để tiếp tục vào dashboard."}</p>{error && <p role="alert" className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<form onSubmit={submit} className="mt-6 space-y-4">{isRegister && <label className="block text-sm font-medium text-gray-700">Họ tên<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>}<label className="block text-sm font-medium text-gray-700">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>{isRegister && <label className="block text-sm font-medium text-gray-700">Số điện thoại<input value={phone} onChange={(event) => setPhone(event.target.value)} className="mt-1.5 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label>}<label className="block text-sm font-medium text-gray-700">Mật khẩu<input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-lg border px-3 py-2.5 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-200" /></label><button disabled={loading} className="w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Đang xử lý…" : isRegister ? "Đăng ký" : "Đăng nhập"}</button></form><p className="mt-6 text-center text-sm text-gray-500">{isRegister ? "Đã có tài khoản? " : "Chưa có tài khoản? "}<Link className="font-semibold text-gray-900 underline underline-offset-4" to={isRegister ? "/login" : "/register"}>{isRegister ? "Đăng nhập" : "Đăng ký"}</Link></p></section></div></main>;
}
