import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Carousel from './components/Carousel';
import { loadArazzoFiles } from './utils/loadArazzoFiles';
import './App.css';

function App() {
  const [arazzoData, setArazzoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadArazzoFiles();
        setArazzoData(data);
      } catch (error) {
        console.error('Failed to load arazzo data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <Carousel items={arazzoData} />
        )}
      </main>
      
      <footer className="footer">
        {/* Footer will be designed later */}
        <p>Footer placeholder</p>
      </footer>
    </div>
  );
}

export default App;
