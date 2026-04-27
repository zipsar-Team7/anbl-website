import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalNav from "./components/GlobalNav/GlobalNav";
import GlobalFooter from "./components/GlobalFooter/GlobalFooter";
import logo from "./assets/logo-new.png";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import ResearchTeam from "./pages/ResearchTeam/ResearchTeam";
import Research from "./pages/Research/Research";
import Publications from "./pages/Publications/Publications";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import News from "./pages/News/News";
import Opportunities from "./pages/Opportunities/Opportunities";
import WebTools from "./pages/WebTools/WebTools";
import WebToolsLayout from "./webtools/Layout/WebToolsLayout";
import WebToolsLanding from "./webtools/Layout/WebToolsLanding";
import NeuroBioAxis from "./webtools/Platforms/NeuroBioAxis";
import PolyToxMap from "./webtools/Platforms/PolyToxMap";
import MaterialDetails from "./webtools/Platforms/MaterialDetails";
import ArrivingSoon from "./webtools/Platforms/ArrivingSoon";
import WebToolsDocumentation from "./webtools/Documentation/WebToolsDocumentation";
import NotFound from "./pages/NotFound/NotFound";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

/* ── LOADING SCREEN ────────────────────────────────── */
function LoadingScreen() {
  return (
    <div className="loading-screen">
      {/* Vibrating Particles Background */}
      <div className="loading-particles">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="vibrate-particle" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 0.2}s`
            }}
          />
        ))}
      </div>

      <div className="loading-logo-container">
        <img src={logo} alt="ANBL Logo" className="loading-logo-img" />
      </div>

      <div className="loading-progress-container">
        <div className="loading-progress-bar" />
      </div>
    </div>
  );
}

/* ── OFFLINE SCREEN ────────────────────────────────── */
function OfflineScreen() {
  return (
    <div className="offline-screen">
      <div className="offline-card">
        <div className="offline-icon">📡</div>
        <h2 className="t-h2">You're Offline</h2>
        <p className="t-body">
          Please check your internet connection. This research platform
          requires an active connection to process AI models and database
          queries.
        </p>
        <button
          className="btn btn-red"
          onClick={() => window.location.reload()}
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}

/* Scroll to top on every route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
    return !sessionStorage.getItem("anbl_has_loaded");
  });
  const [showBar, setShowBar] = import.meta.env.SSR ? [true] : useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("anbl_has_loaded", "true");
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      {isOffline && <OfflineScreen />}

      <Routes>
        {/* Standard pages with Nav & Footer */}
        <Route
          element={<MainLayout showBar={showBar} setShowBar={setShowBar} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<ResearchTeam />} />
          <Route path="/research" element={<Research />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/webtool" element={<WebTools />} />
        </Route>

        {/* WebTools Dashboard Layout */}
        <Route path="/webtools" element={<WebToolsLayout />}>
          <Route index element={<WebToolsLanding />} />
          <Route path="neuro-bio-axis" element={<NeuroBioAxis />} />
          <Route path="poly-toxmap" element={<ArrivingSoon toolName="Poly-ToxMap" />} />
          <Route path="derm-nanomap" element={<ArrivingSoon toolName="Derm-NanoMap" />} />
          <Route path="hepato-bioaxis" element={<ArrivingSoon toolName="Hepato-BioAxis" />} />
          <Route path="details/:id" element={<MaterialDetails />} />
          <Route path="documentation" element={<WebToolsDocumentation />} />
        </Route>

        {/* 404 & Coming Soon Pages without Nav & Footer */}

        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
