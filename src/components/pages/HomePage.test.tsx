import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import HomePage from "./HomePage";

// Мокаем компонент DynamicPagination для проверки рендера в HomePage
vi.mock("../DynamicPagination", () => {
  return {
    __esModule: true,
    default: () => <div>Mocked DynamicPagination Component</div>,
  };
});

describe("HomePage", () => {
  test("Отображает заголовок и приветственное сообщение", () => {
    render(<HomePage />);

    // Проверяем наличие заголовка
    expect(screen.getByText("Главная Страница")).toBeInTheDocument();

    // Проверяем наличие приветственного сообщения
    expect(screen.getByText("Добро пожаловать на наш сайт!")).toBeInTheDocument();
  });

  test("Рендерит компонент DynamicPagination", () => {
    render(<HomePage />);

    // Проверяем, что мокнутый компонент DynamicPagination рендерится
    expect(screen.getByText("Mocked DynamicPagination Component")).toBeInTheDocument();
  });
});
