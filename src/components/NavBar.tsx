import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { Button as AntButton } from "antd";
import GlobalStyles from "../global-styles";
import { AuthContext } from "./AuthProvider";
import authInstance from "../authInstance";

interface NavBarProps {
  isAuthenticated?: boolean;  // Сделаем isAuthenticated опциональным
  setIsAuthenticated?: React.Dispatch<React.SetStateAction<boolean>>; // Сделаем setIsAuthenticated опциональным
}

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--primary-color);
  padding: 0 20px;
  color: var(--text-color);
`;

const StyledButton = styled(AntButton)`
  background-color: var(--primary-color);
  border: none;
  &:hover {
    background-color: darken(var(--primary-color), 10%);
  }
`;

const NavBar: React.FC<NavBarProps> = ({
  isAuthenticated,
  setIsAuthenticated
}) => {
  const { setIsAuth } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");
  const navigate = useNavigate();

  // Функция выхода из аккаунта
  const handleLogout = async () => {
    await authInstance.post("/auth/logout/");
    localStorage.removeItem("access_token");
    if (setIsAuth) {
      setIsAuth(false);
    }
    if (setIsAuthenticated) {
      setIsAuthenticated(false); // Если передан пропс, то обновляем состояние
    }
    navigate("/login");
  };

  // Переключение темы
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <>
      <GlobalStyles />
      <NavbarWrapper>
        <div>
          <Link to="/">Главная</Link>
          <Link to="/about">О нас</Link>
          <Link to="/articles">Статьи</Link>
          <Link to="/contact">Контакты</Link>
          <Link to="/generate-pdf">PDF</Link>
        </div>
        <div>
          {/* Проверка аутентификации и показ соответствующих кнопок */}
          {isAuthenticated ? (
            <StyledButton onClick={handleLogout}>Выйти</StyledButton>
          ) : (
            <span>Не авторизован</span>
          )}
          <StyledButton onClick={toggleTheme}>
            {theme === "light" ? "Темная тема" : "Светлая тема"}
          </StyledButton>
        </div>
      </NavbarWrapper>
    </>
  );
};

export default NavBar;
