import React from "react";
import DynamicPagination from "../DynamicPagination"; // Убедитесь, что путь указан верно

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Главная Страница</h1>
      <p>Добро пожаловать на наш сайт!</p>
      <DynamicPagination /> // Компонент для отображения списка университетов
    </div>
  );
};

export default HomePage;
