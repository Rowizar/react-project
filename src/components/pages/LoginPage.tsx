import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Импортируем useNavigate для навигации
import authInstance from "../../authInstance"; // Импортируем authInstance для работы с API
import { AuthContext } from "../AuthProvider"; // Импортируем контекст авторизации

const LoginPage: React.FC = () => {
    const { setIsAuth } = useContext(AuthContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Используем useNavigate для навигации

    // Функция для обработки логина
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

        try {
            const response = await authInstance.post("/auth/token/", {
                username,
                password,
            });

            // Сохраняем токены в localStorage
            localStorage.setItem("access_token", response.data.access);
            localStorage.setItem("refresh_token", response.data.refresh);

            // Обновляем состояние аутентификации
            setIsAuth(true);

            // Перенаправляем на главную страницу
            navigate("/");
        } catch (error) {
            console.error("Ошибка при входе:", error);
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div>
            <h2>Авторизация</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Логин</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Войти</button>
            </form>
        </div>
    );
};

export default LoginPage;
