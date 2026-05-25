import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import './PlatformSearch.css';

const getFilterLabel = (key) => {
  const labels = {
    MIE_P_M_Type: 'Material Type',
    MIE_P_Size_nm: 'Size Range',
    MIE_P_Shape: 'Shape',
    MIE_E_Cell_Type: 'Cell Type',
    MIE_E_NPs_Conc_ug_mL: 'NPs Concentration',
    MIE_E_Stimulant: 'Stimulant',
    MIE_E_Injury_Model: 'Injury Model',
    MIE_E_Organism: 'Organism',
    Scale_Coverage: 'Scale Coverage'
  };
  return labels[key] || key.replace(/_/g, ' ');
};

// Interactive Canvas Nanoparticle Particle Network Animation
const NanoparticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: null, y: null, radius: 120 };

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        // Polydisperse particles (radius ranges from 2px to 8px)
        this.radius = Math.random() * 6 + 2;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.4 ? 'rgba(246, 58, 49, 0.45)' : 'rgba(100, 100, 110, 0.3)';
        this.glowColor = 'rgba(246, 58, 49, 0.2)';
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = this.radius > 5 ? 10 : 0;
        ctx.shadowColor = this.glowColor;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset glow
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce on boundaries
        if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;

        // Repel from mouse pointer
        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force * 1.5;
            this.y += Math.sin(angle) * force * 1.5;
          }
        }
      }
    }

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const area = rect.width * rect.height;
      const count = Math.min(Math.floor(area / 15000), 80);
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(Math.random() * rect.width, Math.random() * rect.height));
      }
    };

    initParticles();

    const connectParticles = () => {
      const maxDistance = 110;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * 0.15;
            ctx.strokeStyle = `rgba(246, 58, 49, ${alpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(rect.width, rect.height);
        particles[i].draw();
      }
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="nanoparticle-canvas" />;
};

const PlatformSearch = ({ toolName, toolSubtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info', id: 0 });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, toast.id]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [filtersError, setFiltersError] = useState(null);
  
  const [filterOptions, setFilterOptions] = useState({
    categorical: {
      Scale_Coverage: [],
      MIE_P_M_Type: [],
      MIE_P_Size_nm: [],
      MIE_P_Shape: [],
      MIE_E_Cell_Type: [],
      MIE_E_NPs_Conc_ug_mL: [],
      MIE_E_Stimulant: [],
      MIE_E_Injury_Model: [],
      MIE_E_Organism: []
    },
    ranges: {}
  });
  
  const [activeFilters, setActiveFilters] = useState({
    categorical: {
      Scale_Coverage: [],
      MIE_P_M_Type: [],
      MIE_P_Size_nm: [],
      MIE_P_Shape: [],
      MIE_E_Cell_Type: [],
      MIE_E_NPs_Conc_ug_mL: [],
      MIE_E_Stimulant: [],
      MIE_E_Injury_Model: [],
      MIE_E_Organism: []
    },
    ranges: {}
  });

  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch filter options (does not query datasets, only counts distinct options)
  const fetchFilters = async () => {
    setFiltersError(null);
    try {
      const response = await fetch(API_ENDPOINTS.FILTERS);
      if (!response.ok) throw new Error('API server returned error');
      const result = await response.json();
      if (result.status === 'success') {
        setFilterOptions(result.data);
        // Initialize active categorical filters dynamically
        const initialCategorical = {};
        Object.keys(result.data.categorical).forEach(key => {
          initialCategorical[key] = [];
        });
        setActiveFilters({
          categorical: initialCategorical,
          ranges: {}
        });
      } else {
        throw new Error(result.message || 'Failed to fetch filters');
      }
    } catch (err) {
      console.error('Failed to fetch filters:', err);
      setFiltersError('Unable to load filters. The server might be starting up.');
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  // Actual search query fetcher
  const performSearch = async (targetPage = 1, overrideKeyword = null) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    showToast('Fetching datasets...', 'info');
    try {
      const keyword = overrideKeyword !== null ? overrideKeyword : searchQuery;
      const apiFilters = { ...activeFilters.categorical };

      const response = await fetch(API_ENDPOINTS.SEARCH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword,
          filters: apiFilters,
          page: targetPage,
          limit
        })
      });

      const result = await response.json();

      if (response.status === 429) {
        const msg = 'Rate limit exceeded. Please wait 15 minutes before your next search.';
        setError(msg);
        showToast('Rate limit exceeded.', 'error');
        return;
      }

      if (result.status === 'success') {
        setRecords(result.data);
        setTotalRecords(result.totalRecords);
        showToast(
          result.totalRecords > 0 
            ? `Found ${result.totalRecords} matching datasets.` 
            : 'No matching datasets found.',
          result.totalRecords > 0 ? 'success' : 'info'
        );
      } else {
        const msg = result.message || 'An error occurred while fetching data.';
        setError(msg);
        showToast(msg, 'error');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Network error: Unable to connect to the research database.');
      showToast('Network error: Unable to connect to database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Re-run search if page changes, but only if the user has already initiated a search
  useEffect(() => {
    if (hasSearched) {
      performSearch(page);
    }
  }, [page]);



  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev.categorical[category] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { 
        ...prev, 
        categorical: { ...prev.categorical, [category]: next } 
      };
    });
    // Select state is updated locally. The search query is explicitly run when the "Search Dataset" button is clicked.
  };

  const clearFilters = () => {
    const clearedCategorical = {};
    Object.keys(activeFilters.categorical).forEach(k => clearedCategorical[k] = []);

    setActiveFilters({
      categorical: clearedCategorical,
      ranges: {}
    });
    setSearchQuery('');
    setPage(1);
    setHasSearched(false);
    setRecords([]);
    setTotalRecords(0);
    setError(null);
    showToast('Filters reset successfully.', 'success');
  };

  const totalActive = Object.values(activeFilters.categorical).flat().length;

  return (
    <div className={`platform-search-wrapper ${!hasSearched ? 'hero-mode' : 'results-mode'} fade-in`}>
      {toast.show && (
        <div key={toast.id} className={`toast-notification ${toast.type}`}>
          {toast.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          {toast.type === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          )}
          {toast.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
      
      {!hasSearched && <NanoparticleCanvas />}
      
      {/* LEFT COLUMN: Main Search & Results Workspace */}
      <div className="search-main-content">
        <header className="minimal-header">
          <div className="header-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 className="minimal-title">{toolName}</h1>
              {hasSearched && (
                <span className="stat-badge" style={{ marginTop: '4px' }}>
                  {totalRecords} Datasets Found
                </span>
              )}
            </div>
            <p className="minimal-subtitle">{toolSubtitle || `Advanced data exploration platform.`}</p>
          </div>
        </header>



        {error && (
          <div className="apple-error-alert fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {hasSearched ? (
          <div className="results-container fade-in">
            {/* Alert banner */}
            <div className="alert-banner">
              <div className="alert-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              </div>
              <p>Select the desired parameters and click "Search Dataset". Results can be viewed online or downloaded as a PDF.</p>
            </div>
            {loading ? (
              <div className="loading-grid">
                {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
              </div>
            ) : (
              <>
                <div className="data-cards-grid">
                  {records.length > 0 ? (
                    records.map((row) => (
                      <div key={row._id} className="data-card fade-in">
                        <div className="card-header">
                          <span className={`category-tag ${row.MIE_P_M_Type?.toLowerCase().replace(/\s+/g, '-')}`}>
                            {row.MIE_P_M_Type || 'Material'}
                          </span>
                          <span className="id-tag">#{row._id.slice(-4)}</span>
                        </div>
                        
                        <div className="card-body">
                          <h3 className="card-title" title={row.Meta_Title}>
                            {row.Meta_Title 
                              ? (row.Meta_Title.length > 70 ? row.Meta_Title.slice(0, 67) + '...' : row.Meta_Title)
                              : 'Unnamed Material'}
                          </h3>
                          <p className="card-subtitle">{row.Scale_Coverage || 'No scale defined'}</p>
                          
                          <div className="card-specs">
                            <div className="spec-item">
                              <span className="spec-label">Size Range</span>
                              <span className="spec-value">{row.MIE_P_Size_nm || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Shape</span>
                              <span className="spec-value">{row.MIE_P_Shape || 'N/A'}</span>
                            </div>
                          </div>
                          
                          <div className="card-footer">
                            <div className="functional-group">
                              <strong>Injury Model: </strong>
                              {row.MIE_E_Injury_Model && row.MIE_E_Injury_Model !== 'Missing' 
                                ? row.MIE_E_Injury_Model 
                                : 'General toxicology'}
                            </div>
                            <Link 
                              to={`/webtools/details/${row._id}`} 
                              state={{ fromTool: 'Neuro-Bio-Axis' }}
                              className="card-action-btn"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                              </svg>
                              View Report
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-results">
                      <div className="no-results-icon fade-in">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.3-4.3"/>
                          <path d="M11 8v6"/>
                          <path d="M8 11h6"/>
                        </svg>
                      </div>
                      <h3>No materials found</h3>
                      <p>Try adjusting your search terms or filters on the right, then hit Search again.</p>
                      <button type="button" className="btn-reset-search" onClick={clearFilters}>Clear Search</button>
                    </div>
                  )}
                </div>

                {totalRecords > limit && (
                  <div className="pagination-bar">
                    <button 
                      type="button"
                      disabled={page === 1} 
                      onClick={() => setPage(p => p - 1)}
                      className="pagination-btn"
                    >
                      Previous
                    </button>
                    <span className="page-indicator">Page {page} of {Math.ceil(totalRecords / limit)}</span>
                    <button 
                      type="button"
                      disabled={page >= Math.ceil(totalRecords / limit)} 
                      onClick={() => setPage(p => p + 1)}
                      className="pagination-btn"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          /* INITIAL EMPTY STATE */
          <div className="initial-state-fullpage fade-in">
            <h3>Cross-Scale Database Portal</h3>
            <p>Select your criteria from the <strong>Filters</strong> panel on the left to start exploring the database.</p>
          </div>
        )}
      </div>

      {/* RIGHT COLUMN: Persistent filter sidebar panel */}
      <aside ref={sidebarRef} className="search-filter-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-title-row">
            <h2 className="sidebar-title">Filters</h2>
            {totalActive > 0 && (
              <span className="sidebar-active-indicator">{totalActive} active</span>
            )}
          </div>
        </div>

        <div className="sidebar-content">
          {filtersError ? (
            <div className="sidebar-error-wrapper">
              <p className="sidebar-error-msg">{filtersError}</p>
              <button type="button" className="btn-sidebar-retry" onClick={fetchFilters}>
                Retry Loading
              </button>
            </div>
          ) : (
            Object.entries(filterOptions.categorical).map(([key, options]) => {
              if (!options || options.length === 0) return null;
              const activeGroupFilters = activeFilters.categorical[key] || [];

              return (
                <div 
                  key={key} 
                  className={`filter-dropdown-container ${openDropdown === key ? 'open-dropdown' : ''}`}
                >
                  <label className="filter-dropdown-label">
                    {getFilterLabel(key)}
                  </label>
                  <div className="filter-dropdown">
                    <button
                      type="button"
                      className={`filter-dropdown-trigger ${openDropdown === key ? 'open' : ''} ${activeGroupFilters.length > 0 ? 'has-active' : ''}`}
                      onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    >
                      <span className="trigger-text">
                        {activeGroupFilters.length === 0 
                          ? `Select ${getFilterLabel(key)}` 
                          : activeGroupFilters.length === 1 
                            ? activeGroupFilters[0] 
                            : `${activeGroupFilters.length} Selected`}
                      </span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="chevron-icon"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    
                    {openDropdown === key && (
                      <div className="filter-dropdown-menu">
                        {options.map(opt => {
                          const isActive = activeGroupFilters.includes(opt);
                          return (
                            <div 
                              key={opt} 
                              className={`filter-dropdown-item ${isActive ? 'active' : ''}`}
                              onClick={() => toggleFilter(key, opt)}
                            >
                              <input 
                                type="checkbox" 
                                checked={isActive} 
                                readOnly 
                                className="filter-checkbox"
                              />
                              <span className="item-label">{opt}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="sidebar-actions">
          <button 
            type="button" 
            className="btn-sidebar-search" 
            onClick={() => {
              const hasAnyActiveFilters = Object.values(activeFilters.categorical).some(arr => arr.length > 0);
              if (!hasAnyActiveFilters) {
                showToast('Please select at least one filter.');
                return;
              }
              setHasSearched(true);
              if (page === 1) {
                performSearch(1);
              } else {
                setPage(1);
              }
            }}
            disabled={loading}
          >
            {loading ? <span className="search-spinner"></span> : 'Search Dataset'}
          </button>
          <button 
            type="button" 
            className="btn-sidebar-reset" 
            onClick={clearFilters}
          >
            Reset
          </button>
        </div>
      </aside>

    </div>
  );
};

export default PlatformSearch;

