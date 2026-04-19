import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlobalNav from './components/GlobalNav/GlobalNav';
import GlobalFooter from './components/GlobalFooter/GlobalFooter';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Research from './pages/Research/Research';
import Publications from './pages/Publications/Publications';
import Contact from './pages/Contact/Contact';

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  const [showBar, setShowBar] = import.meta.env.SSR ? [true] : useState(true);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {showBar && (
        <div className="announcement-bar">
          <div className="container announcement-bar__inner">
            <span>
              Hundreds of AI-Driven Discoveries! See Our Record-Breaking Research Results! <a href="/publications">View Now →</a>
            </span>
            <button 
              className="announcement-bar__close" 
              onClick={() => setShowBar(false)}
              aria-label="Close announcement"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <GlobalNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <GlobalFooter />
    </BrowserRouter>
  );
}

export default App;
