import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import axios from "axios";
import ArticlesPage from "./ArticlesPage";

// Мокаем модуль axios для имитации API-запросов
vi.mock("axios");

describe("ArticlesPage", () => {
    const mockData = [
        {
            key: "1",
            name: "Harvard University",
            country: "USA",
            web_pages: ["http://www.harvard.edu"],
        },
        {
            key: "2",
            name: "Stanford University",
            country: "USA",
            web_pages: ["http://www.stanford.edu"],
        },
    ];

    // Тестируем корректное отображение данных в таблице
    test("Отображает данные после получения ответа от API", async () => {
        // Мокаем успешный ответ от API
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        render(<ArticlesPage />);

        // Ждем появления данных в таблице
        await waitFor(() => {
            expect(screen.getByText("Harvard University")).toBeInTheDocument();
            expect(screen.getByText("Stanford University")).toBeInTheDocument();
            expect(screen.getByText("http://www.harvard.edu")).toBeInTheDocument();
            expect(screen.getByText("http://www.stanford.edu")).toBeInTheDocument();
        });
    });

    // Тестируем переключение страниц
    test("Переключение страниц работает корректно", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        render(<ArticlesPage />);

        // Ждем загрузки первой страницы
        await waitFor(() => {
            expect(screen.getByText("Harvard University")).toBeInTheDocument();
        });

        // Нажимаем кнопку "Вперед" для переключения страницы
        const forwardButton = screen.getByText("Вперед");
        fireEvent.click(forwardButton);

        // Ждем повторного вызова axios
        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(
                "http://universities.hipolabs.com/search?offset=10&limit=10"
            );
        });

        // Проверяем, что текущая страница изменилась
        expect(screen.getByText("Текущая страница: 2")).toBeInTheDocument();
    });

    // Тестируем ошибку при загрузке данных
    test("Показывает сообщение об ошибке при неудачном запросе", async () => {
        // Мокаем ошибку от API
        (axios.get as jest.Mock).mockRejectedValue(new Error("Ошибка при загрузке"));

        // Мокаем console.error для теста
        const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => { });

        render(<ArticlesPage />);

        // Ждем отображения ошибки
        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith("Error fetching data:", expect.any(Error));
        });

        // Восстанавливаем console.error
        consoleErrorMock.mockRestore();
    });
});
