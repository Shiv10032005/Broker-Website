import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Building2, Users, Mail } from 'lucide-react';
import './App.css';
import { NavBar } from './components/ui/tubelight-navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FullscreenScroll from './components/FullscreenScroll';
import Loader from './components/Loader';
import { loadProperties } from './utils/dataService'; 
import './pages/HomePage.css'; // For skip intro button styles

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [preloadedProperties, setPreloadedProperties] = useState([]);

  const handleSkipIntro = () => {
    setShowIntro(false);
    setIsLoading(true);

    // Start fetching data while loader is visible
    loadProperties().then(data => {
      setPreloadedProperties(data);
    });
    
    // Show loader for 3.6 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 3600);
  };

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Properties', url: '/listings', icon: Building2 },
    { name: 'About', url: '/about', icon: Users },
    { name: 'Contact', url: '/contact', icon: Mail }
  ];

  return (
    <Router>
      {showIntro ? (
        <div className="intro-container">
          <FullscreenScroll onComplete={handleSkipIntro} />
          <button 
            className="skip-intro-btn"
            onClick={handleSkipIntro}
          >
            Skip Intro →
          </button>
        </div>
      ) : isLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div className="app fade-in">
          <NavBar items={navItems} />
          
          <main className="main-container pt-20">
            <Routes>
              <Route path="/" element={<HomePage preloadedProperties={preloadedProperties} />} />
              <Route path="/listings" element={<PropertiesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          <Footer />
        </div>
      )}
    </Router>
  );
}

export default App;

