import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ArticlesPage from "./components/pages/ArticlesPage";
import ContactPage from "./components/pages/ContactPage";
import GeneratePdfPage from "./components/pages/GeneratePdfPage";
import LoginPage from "./components/pages/LoginPage";
import GlobalStyles from "./global-styles";
import { AuthContext } from "./components/AuthProvider";
import "./App.css";

const App: React.FC = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  return (
    <>
      <GlobalStyles />
      {/* Навигационная панель, которая будет отображаться на всех страницах */}
      <NavBar isAuthenticated={isAuth} setIsAuthenticated={setIsAuth} />

      <Routes>
        {/* Маршрут для страницы логина */}
        <Route path="/login" element={<LoginPage />} />

        {/* Защищенные маршруты */}
        <Route
          path="/"
          element={isAuth ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/about"
          element={isAuth ? <AboutPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/articles"
          element={isAuth ? <ArticlesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={isAuth ? <ContactPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/generate-pdf"
          element={isAuth ? <GeneratePdfPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
};

export default App;
