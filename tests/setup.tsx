/* eslint-disable import/export */
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";
import "@testing-library/jest-dom";

// Мокируем window.matchMedia и другие функции
beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => { }, // deprecated
            removeListener: () => { }, // deprecated
            addEventListener: () => { },
            removeEventListener: () => { },
            dispatchEvent: () => false,
        }),
    });

    // Мокируем window.getComputedStyle
    Object.defineProperty(window, "getComputedStyle", {
        writable: true,
        value: () => ({
            getPropertyValue: () => "",
        }),
    });

    // Мокируем IntersectionObserver
    global.IntersectionObserver = class {
        constructor() { }
        observe() {
            return null;
        }
        unobserve() {
            return null;
        }
        disconnect() {
            return null;
        }
    };
});

// Очищаем после каждого теста
afterEach(() => {
    cleanup();
});

function customRender(ui: React.ReactElement, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => children,
        ...options,
    });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
// override render export
export { customRender as render };
