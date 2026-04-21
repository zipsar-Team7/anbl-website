import { BrowserRouter, Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GlobalNav from './components/GlobalNav/GlobalNav';
import GlobalFooter from './components/GlobalFooter/GlobalFooter';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Research from './pages/Research/Research';
import Publications from './pages/Publications/Publications';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import Opportunities from './pages/Opportunities/Opportunities';
import NotFound from './pages/NotFound/NotFound';
import ComingSoon from './pages/ComingSoon/ComingSoon';

/* ── LOADING SCREEN ────────────────────────────────── */
function LoadingScreen() {
  return (
    <div className="loading-screen" style={{ background: '#ffffff' }}>
      <div className="loading-visual">
        <div className="wave-container">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="wave-particle" 
              style={{ 
                '--idx': i,
                background: '#c0392b',
                boxShadow: '0 0 10px rgba(192, 57, 43, 0.3)'
              }}
            />
          ))}
        </div>
        <div className="loading-text">
          <span className="loading-brand" style={{ color: '#1d1d1f' }}>ANBL</span>
          <span className="loading-dots">Initializing Website</span>
        </div>
      </div>
    </div>
  );
}

/* ── OFFLINE SCREEN ────────────────────────────────── */
function OfflineScreen() {
  return (
    <div className="offline-screen">
      <div className="container center">
        <div className="offline-card">
          <div className="offline-icon">📡</div>
          <h2 className="t-h2">You're Offline</h2>
          <p className="t-body">
            Please check your internet connection. This research platform requires an active connection 
            to process AI models and database queries.
          </p>
          <button className="btn btn-red" onClick={() => window.location.reload()}>
            Retry Connection
          </button>
        </div>
      </div>
    </div>
  );
}

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/* ── MAIN LAYOUT ───────────────────────────────────── */
function MainLayout({ showBar, setShowBar }) {
  return (
    <>
      {showBar && (
        <div className="announcement-bar">
          <div className="container announcement-bar__inner">
            <span>
              Elevate Your Research with AI: Early Access for Our Advanced Web Tools is Now Open! <a href="/webtool">Get Early Access →</a>
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
      <Outlet />
      <GlobalFooter />
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(() => {
    if (import.meta.env.SSR) return true;
    return !sessionStorage.getItem('anbl_has_loaded');
  });
  const [showBar, setShowBar] = import.meta.env.SSR ? [true] : useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('anbl_has_loaded', 'true');
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isOffline && <OfflineScreen />}
      
      <Routes>
        {/* Standard pages with Nav & Footer */}
        <Route element={<MainLayout showBar={showBar} setShowBar={setShowBar} />}>
          <Route path="/" element={<Home />} />
          <Route path="/pi" element={<About />} />
          <Route path="/research" element={<Research />} />
          <Route path="/projects" element={<ComingSoon />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/news" element={<News />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* 404 & Coming Soon Pages without Nav & Footer */}
        <Route path="/webtool" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
