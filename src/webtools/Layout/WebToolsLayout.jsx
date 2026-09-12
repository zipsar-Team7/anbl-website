import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import './WebToolsLayout.css';
import logo from '../../assets/logo-new.png';
import { labData } from '../../data/labData';

const { webTools } = labData;

const WebToolsLayout = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const location = useLocation();

  useEffect(() => {
    // Fast snappy loading screen transition when accessing the webtools
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when navigating to a specific tool or sub-page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Basic breadcrumb generation based on path
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPathName = pathParts[pathParts.length - 1] || 'dashboard';
  const formattedPathName = currentPathName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Find if current path belongs to any of our tools
  const activeTool = webTools.find(tool => location.pathname.startsWith(tool.link));

  if (isInitialLoading) {
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

  return (
    <div className={`webtools-layout ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Sidebar Navigation */}
      <aside className={`webtools-sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="sidebar-top">
          <Link to="/" className="sidebar-logo">
            <img src={logo} alt="ANBL" />
          </Link>
          <button className="toggle-sidebar-btn desktop-only" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7"></polyline><polyline points="6 17 11 12 6 7"></polyline></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
            )}
          </button>
          <button className="close-mobile-btn mobile-only" onClick={() => setIsMobileMenuOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <NavLink to="/webtools" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            {(!isCollapsed || isMobileMenuOpen) && <span>Overview</span>}
          </NavLink>
          
          <div className="sidebar-divider"></div>
          {(!isCollapsed || isMobileMenuOpen) && <div className="sidebar-label">Platforms</div>}
          
          {webTools.filter(tool => tool.category === 'Platform').map(tool => (
            <NavLink 
              key={tool.id} 
              to={tool.link} 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${tool.status !== 'Available' ? 'disabled' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"></path>
                <path d="M12 22V12"></path>
                <path d="M21 7l-9 5-9-5"></path>
              </svg>
              {(!isCollapsed || isMobileMenuOpen) && <span>{tool.name}</span>}
            </NavLink>
          ))}

          <div className="sidebar-divider"></div>
          {(!isCollapsed || isMobileMenuOpen) && <div className="sidebar-label">Prediction Tools</div>}
          
          {webTools.filter(tool => tool.category === 'Prediction Tool').map(tool => (
            <NavLink 
              key={tool.id} 
              to={tool.link} 
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''} ${tool.status !== 'Available' ? 'disabled' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              {(!isCollapsed || isMobileMenuOpen) && <span>{tool.name}</span>}
            </NavLink>
          ))}

          <div className="sidebar-divider"></div>
          {(!isCollapsed || isMobileMenuOpen) && <div className="sidebar-label">Resources</div>}
          <NavLink to="/webtools/documentation" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            {(!isCollapsed || isMobileMenuOpen) && <span>Documentation</span>}
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">RP</div>
            {(!isCollapsed || isMobileMenuOpen) && (
              <div className="user-info">
                <span className="user-name">Researcher</span>
                <span className="user-status">Standard Access</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && <div className="mobile-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}

      {/* Main Area */}
      <main className="webtools-main">
        {/* Header */}
        <header className="webtools-header">
          <div className="header-left">
            <button className="mobile-menu-toggle mobile-only" onClick={() => setIsMobileMenuOpen(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
            <div className="header-breadcrumbs">
              <Link to="/webtools" className="breadcrumb-link">ANBL Tools</Link>
              {currentPathName !== 'webtools' && (
                <>
                  <svg className="breadcrumb-sep" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                  <span className="breadcrumb-current">{formattedPathName}</span>
                </>
              )}
            </div>
          </div>
          <div className="header-right">
            <div className="system-status desktop-only">
              <span className="status-dot"></span>
              Live System
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="webtools-content">
          {isMobile && activeTool && activeTool.desktopOnly ? (
            <div className="desktop-only-warning-card fade-in">
              <div className="warning-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <h2 className="warning-title">Desktop Access Required</h2>
              <p className="warning-description">
                The <strong>{activeTool.name}</strong> platform is designed for high-resolution desktop workspaces.
              </p>
              <p className="warning-instructions">
                To explore datasets, apply advanced filters, and generate scientific reports, please open this portal on a desktop or laptop computer.
              </p>
              <div className="warning-actions">
                <Link to="/webtools" className="btn-back-overview">
                  Back to Overview
                </Link>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default WebToolsLayout;
