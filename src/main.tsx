import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./components/AuthProvider";
import "./index.css";

// Создаем корневой элемент
const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение с AuthProvider и BrowserRouter
root.render(
    <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
);
