import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Carousel from './components/Carousel';
import ArazzoPage from './components/ArazzoPage';
import { loadArazzoFiles } from './utils/loadArazzoFiles';
import './App.css';

function HomePage() {
  const [arazzoData, setArazzoData] = useState({ data: [], filenames: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await loadArazzoFiles();
        setArazzoData(result);
      } catch (error) {
        console.error('Failed to load arazzo data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <Carousel items={arazzoData.data} filenames={arazzoData.filenames} />
        )}
      </main>
      
      <footer className="footer">
        <p>© 2024 Motocycle Maintenance. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/arazzo/:filename" element={<ArazzoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
