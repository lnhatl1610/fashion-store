import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryableRequest extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
    timeout: 10000,
    withCredentials: true,
    headers: { "X-Client-App": "admin" },
});

// Remove refresh tokens created by the previous localStorage-based flow.
localStorage.removeItem("fashion_admin_refresh_token");

const refreshClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
    timeout: 10000,
    withCredentials: true,
    headers: { "X-Client-App": "admin" },
});

let refreshRequest: Promise<string> | null = null;

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fashion_admin_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined;
    const url = request?.url ?? "";
    const isAuthCall = ["/auth/login", "/auth/register", "/auth/refresh", "/auth/logout"].some((path) => url.includes(path));

    if (error.response?.status !== 401 || !request || request._retry || isAuthCall) {
        return Promise.reject(error);
    }

    request._retry = true;
    refreshRequest ??= refreshClient.post<{ data: { accessToken: string } }>("/auth/refresh").then((response) => {
        const token = response.data.data.accessToken;
        localStorage.setItem("fashion_admin_access_token", token);
        return token;
    }).finally(() => { refreshRequest = null; });

    try {
        const token = await refreshRequest;
        request.headers.Authorization = `Bearer ${token}`;
        return api(request);
    } catch (refreshError: unknown) {
        localStorage.removeItem("fashion_admin_access_token");
        localStorage.removeItem("fashion_admin_refresh_token");
        localStorage.removeItem("fashion_admin_user");
        window.location.assign("/login");
        return Promise.reject(refreshError);
    }
});

export default api;
