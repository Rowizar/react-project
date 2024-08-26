import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';
import GlobalStyles from '../global-styles';


interface NavBarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const [theme, setTheme] = useState('light');

  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <><GlobalStyles /><NavbarWrapper>
      <div>
        <Link to="/">Главная</Link> 
        <Link to="/about">О нас</Link> 
        <Link to="/articles">Статьи</Link> 
        <Link to="/contact">Контакты</Link>
        <Link to="/generate-pdf">PDF</Link>
      </div>
      <div>
        <StyledButton onClick={toggleAuth}>
          {isAuthenticated ? 'Выйти' : 'Войти'}
        </StyledButton>
        <StyledButton onClick={toggleTheme}>
          {theme === 'light' ? 'Темная тема' : 'Светлая тема'}
        </StyledButton>
      </div>
    </NavbarWrapper></>
  );
};

export default NavBar;
