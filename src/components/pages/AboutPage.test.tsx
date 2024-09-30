import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import AboutPage from "./AboutPage";

describe("AboutPage", () => {
    test("Отображает заголовок и информацию о пользователе", () => {
        // Рендерим компонент
        render(<AboutPage />);

        // Проверяем, что заголовок "ФИО" отображается
        expect(screen.getByText("ФИО:")).toBeInTheDocument();

        // Проверяем, что текст с именем и номером группы отображается
        expect(screen.getByText("Пустогачев Роман Евгеньевич 221-322")).toBeInTheDocument();
    });
});