import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import ContactPage from "./ContactPage";

describe("ContactPage", () => {
    test("Отображает заголовок и описание", () => {
        render(<ContactPage />);
        const headingElement = screen.getByText(/Посетители сайта/i);
        const descriptionElement = screen.getByText(/Пожалуйста укажите имя и возраст/i);

        expect(headingElement).toBeInTheDocument();
        expect(descriptionElement).toBeInTheDocument();
    });

    test("Показывает ошибку, если поля пустые", async () => {
        render(<ContactPage />);

        const submitButton = screen.getByRole("button", { name: /Сохранить/i });
        fireEvent.click(submitButton);

        const errorMessages = await screen.findAllByText(/Поле обязательно для заполнения/i);

        // Проверяем, что оба поля выводят ошибку
        expect(errorMessages.length).toBe(2);
    });

    test("Отображает ошибку, если имя короче 5 символов", async () => {
        render(<ContactPage />);

        const nameInput = screen.getByTestId("name-input");
        fireEvent.change(nameInput, { target: { value: "abc" } });

        const submitButton = screen.getByRole("button", { name: /Сохранить/i });
        fireEvent.click(submitButton);

        const nameError = await screen.findByText(/Нужно больше символов/i);
        expect(nameError).toBeInTheDocument();
    });

    test("Добавляет задачу в список при правильной отправке", async () => {
        render(<ContactPage />);

        const nameInput = screen.getByTestId("name-input");
        fireEvent.change(nameInput, { target: { value: "Иван Иванов" } });

        const ageInput = screen.getByTestId("age-input");
        fireEvent.change(ageInput, { target: { value: 25 } });

        const submitButton = screen.getByRole("button", { name: /Сохранить/i });
        fireEvent.click(submitButton);

        const newTask = await screen.findByText(/Иван Иванов - 25/i);
        expect(newTask).toBeInTheDocument();
    });
});
