import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/pages/HomePage';
import AboutPage from './components/pages/AboutPage';
import ArticlesPage from './components/pages/ArticlesPage';
import ContactPage from './components/pages/ContactPage';
import GeneratePdfPage from './components/pages/GeneratePdfPage';
import GlobalStyles from './global-styles';
import './App.css';


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <><GlobalStyles /><Router>
      <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="articles" element={<ArticlesPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="/generate-pdf" element={<GeneratePdfPage />} />
      </Routes>
    </Router></>
  );
};

export default App;