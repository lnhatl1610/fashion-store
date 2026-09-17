import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api",
    timeout: 10000,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("fashion_admin_access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use((response) => response, (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("fashion_admin_access_token");
        localStorage.removeItem("fashion_admin_refresh_token");
        window.location.assign("/login");
    }
    return Promise.reject(error);
});

export default api;
