import React from 'react';
import { Link } from 'react-router-dom';

interface NavBarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const toggleAuth = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <nav>
      <Link to="/">Главная</Link> | 
      <Link to="/about">О нас</Link> | 
      <Link to="/articles">Статьи</Link> | 
      <Link to="/contact">Контакты</Link> |
      <button onClick={toggleAuth}>
        {isAuthenticated ? 'Выйти' : 'Войти'}
      </button>
    </nav>
  );
};

export default NavBar;