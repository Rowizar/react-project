import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeAll } from "vitest";
import axios from "axios";
import DynamicPagination from "./DynamicPagination";

// Мокаем IntersectionObserver перед всеми тестами
beforeAll(() => {
    global.IntersectionObserver = vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        root: null,
        rootMargin: '',
        thresholds: [],
        takeRecords: vi.fn(),
        unobserve: vi.fn(),
    }));
});

// Мокаем axios для имитации API-запросов
vi.mock("axios");

describe("DynamicPagination", () => {
    const mockData = [
        { name: "Harvard University", country: "USA" },
        { name: "Stanford University", country: "USA" },
    ];

    test("Отображает список университетов после загрузки данных", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        render(<DynamicPagination />);

        await waitFor(() => {
            expect(screen.getByText("Harvard University")).toBeInTheDocument();
            expect(screen.getByText("Stanford University")).toBeInTheDocument();
        });
    });

    test("Показывает индикатор загрузки во время загрузки данных", async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

        render(<DynamicPagination />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
        });
    });

    test("Показывает сообщение об ошибке при неудачной загрузке данных", async () => {
        // Мокаем ошибку от API
        (axios.get as jest.Mock).mockRejectedValue(new Error("Ошибка при загрузке"));

        // Мокаем console.error
        const consoleErrorMock = vi.spyOn(console, "error").mockImplementation(() => { });

        render(<DynamicPagination />);

        await waitFor(() => {
            expect(consoleErrorMock).toHaveBeenCalledWith("Error fetching universities:", expect.any(Error));
        });

        // Восстанавливаем console.error после теста
        consoleErrorMock.mockRestore();
    });
});
