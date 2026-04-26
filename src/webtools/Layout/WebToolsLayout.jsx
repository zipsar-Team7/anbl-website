import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import './WebToolsLayout.css';
import logo from '../../assets/logo-new.png';

const WebToolsLayout = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // 1.5 second loading screen when accessing the dashboard
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Basic breadcrumb generation based on path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPathName = pathParts[pathParts.length - 1] || 'dashboard';
  const formattedPathName = currentPathName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  if (isInitialLoading) {
    return (
      <div className="tool-loading-screen" style={{ background: 'var(--bg)', position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px' }}>
        <div style={{ width: '64px', height: '64px', border: '4px solid var(--surface-2)', borderTop: '4px solid var(--red)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <h2 style={{ fontSize: '24px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>Initializing Dashboard...</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>Loading tools and secure connections.</p>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="webtools-layout">
      {/* Main Area */}
      <main className="webtools-main">
        {/* Header */}
        <header className="webtools-header">
          <div className="header-left">
            <Link to="/" className="header-logo" title="Back to Main Site">
              <img src={logo} alt="ANBL Logo" />
            </Link>
            <div className="header-breadcrumbs">
              <Link to="/webtools" className="breadcrumb-link">ANBL Tools</Link>
              {currentPathName !== 'webtools' && (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span className="breadcrumb-current">{formattedPathName}</span>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="webtools-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default WebToolsLayout;
