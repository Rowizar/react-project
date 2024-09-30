import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --background-color-light: #fff;
    --background-color-dark: #000000;
    --text-color-light: #000;
    --text-color-dark: #fff;
  }

  [data-theme="light"] {
    --background-color: var(--background-color-light);
    --text-color: var(--text-color-light);
  }

  [data-theme="dark"] {
    --background-color: var(--background-color-dark);
    --text-color: var(--text-color-dark);
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
  }

  a {
    color: var(--text-color);
    margin: 10px;
  }
  span {
    color: var(--text-color);
  }
`;

export default GlobalStyles;
