import React, { useState } from 'react';

const Header = () => {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <header className="header">
      <div className="banner">
        <div className="header-content">
          <img 
            src="/logo192.png" 
            alt="Logo" 
            className="logo"
          />
          <h1 className="title">motocycle maintenance</h1>
        </div>
        <div className="header-actions">
          <a href="/register" className="register-link">
            {language === 'en' ? 'Register' : 'S\'inscrire'}
          </a>
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="language-dropdown"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
