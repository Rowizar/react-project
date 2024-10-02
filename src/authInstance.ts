import axios from "axios";

// Создаем инстанс axios с базовыми настройками
const authInstance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true, // Для отправки cookies
});

// Интерсептор для добавления токенов в каждый запрос
authInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Интерсептор для обработки ответов
authInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                const response = await authInstance.post("/auth/token/refresh/", {
                    refresh: refreshToken,
                });

                localStorage.setItem("access_token", response.data.access);
                originalRequest.headers["Authorization"] = `Bearer ${response.data.access}`;
                return authInstance(originalRequest);
            } catch (e) {
                console.error("Ошибка при обновлении токена:", e);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default authInstance;
