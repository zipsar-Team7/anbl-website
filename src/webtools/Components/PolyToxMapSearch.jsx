import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import './PlatformSearch.css'; // Inherit main layout styles
import './PolyToxMapSearch.css'; // Load Poly-ToxMap specifics (tables, ranges)

const getFilterLabel = (key) => {
  const labels = {
    Polymers: 'Polymer Type',
    Polymer_type: 'Type of Materials',
    Synthesis_method: 'Synthesis Method',
    Material_2: 'Functional Group/Drug',
    Shape: 'Shape'
  };
  return labels[key] || key.replace(/_/g, ' ');
};

const getCardTitle = (row) => {
  const parts = [];
  if (row.Polymer_type && row.Polymer_type !== 'Not reported') {
    parts.push(row.Polymer_type);
  } else {
    parts.push('Polymer Material');
  }
  if (row.Material_2 && row.Material_2 !== 'Not reported') {
    parts.push(`with ${row.Material_2}`);
  }
  return parts.join(' ');
};

const getCardSubtitle = (row) => {
  const parts = [];
  if (row.Cell_name && row.Cell_name !== 'Not reported') {
    parts.push(row.Cell_name);
  }
  if (row.Synthesis_method && row.Synthesis_method !== 'Not reported') {
    parts.push(row.Synthesis_method);
  }
  return parts.join(' · ') || 'In vitro system';
};

// Interactive Canvas Nanoparticle Particle Network Animation (Same as Tool 1)
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
        ctx.shadowBlur = 0;
      }

      update(width, height) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
        if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;

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

const PolyToxMapSearch = () => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info', id: 0 });
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 6;

  const sidebarRef = useRef(null);

  // Filter options from API
  const [filterOptions, setFilterOptions] = useState({
    categorical: {
      Polymers: [],
      Polymer_type: [],
      Synthesis_method: [],
      Material_2: [],
      Shape: []
    }
  });

  // Active filters selected by user
  const [activeFilters, setActiveFilters] = useState({
    categorical: {
      Polymers: [],
      Polymer_type: [],
      Synthesis_method: [],
      Material_2: [],
      Shape: []
    },
    abbreviation: '',
    core_min: '',
    core_max: '',
    pdi_min: '',
    pdi_max: '',
    hydro_min: '',
    hydro_max: '',
    charge_min: '',
    charge_max: ''
  });

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch filter options
  const fetchFilters = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.POLYTOX_FILTERS);
      if (!response.ok) throw new Error('API server returned error');
      const result = await response.json();
      if (result.status === 'success') {
        setFilterOptions(result.data);
      }
    } catch (err) {
      console.error('Failed to fetch filters:', err);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  // Perform search
  const performSearch = async (targetPage = 1) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    showToast('Fetching datasets...', 'info');

    try {
      const response = await fetch(API_ENDPOINTS.POLYTOX_SEARCH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: activeFilters.abbreviation,
          filters: {
            Polymers: activeFilters.categorical.Polymers,
            Polymer_type: activeFilters.categorical.Polymer_type,
            Synthesis_method: activeFilters.categorical.Synthesis_method,
            Material_2: activeFilters.categorical.Material_2,
            Shape: activeFilters.categorical.Shape,
            core_min: activeFilters.core_min,
            core_max: activeFilters.core_max,
            pdi_min: activeFilters.pdi_min,
            pdi_max: activeFilters.pdi_max,
            hydro_min: activeFilters.hydro_min,
            hydro_max: activeFilters.hydro_max,
            charge_min: activeFilters.charge_min,
            charge_max: activeFilters.charge_max
          },
          page: targetPage,
          limit
        })
      });

      const result = await response.json();

      if (response.status === 429) {
        setError('Rate limit exceeded. Please wait 15 minutes before your next search.');
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
        setError(result.message || 'An error occurred.');
        showToast(result.message || 'Error', 'error');
      }
    } catch (err) {
      console.error('Search failed:', err);
      setError('Network error: Unable to connect to the research database.');
      showToast('Network error.', 'error');
    } finally {
      setLoading(false);
    }
  };

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
  };

  const handleInputChange = (field, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      categorical: {
        Polymers: [],
        Polymer_type: [],
        Synthesis_method: [],
        Material_2: [],
        Shape: []
      },
      abbreviation: '',
      core_min: '',
      core_max: '',
      pdi_min: '',
      pdi_max: '',
      hydro_min: '',
      hydro_max: '',
      charge_min: '',
      charge_max: ''
    });
    setPage(1);
    setHasSearched(false);
    setRecords([]);
    setTotalRecords(0);
    setError(null);
    showToast('Filters reset successfully.', 'success');
  };

  const totalActive = Object.values(activeFilters.categorical).flat().length +
    (activeFilters.abbreviation ? 1 : 0) +
    (activeFilters.core_min || activeFilters.core_max ? 1 : 0) +
    (activeFilters.pdi_min || activeFilters.pdi_max ? 1 : 0) +
    (activeFilters.hydro_min || activeFilters.hydro_max ? 1 : 0) +
    (activeFilters.charge_min || activeFilters.charge_max ? 1 : 0);

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

      {/* LEFT COLUMN: Main Workspace */}
      <div className="search-main-content">
        <header className="minimal-header">
          <div className="header-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 className="minimal-title">Poly-ToxMap</h1>
              {hasSearched && (
                <span className="stat-badge" style={{ marginTop: '4px' }}>
                  {totalRecords} Datasets Found
                </span>
              )}
            </div>
            <p className="minimal-subtitle">Curated toxicity datasets for functional polymer-based nanomaterials.</p>
          </div>
        </header>

        {error && (
          <div className="apple-error-alert fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                          <span className={`category-tag ${row.Polymers?.toLowerCase().replace(/\s+/g, '-')}`}>
                            {row.Polymers || 'Polymers'}
                          </span>
                          <span className="id-tag">#{row._id.slice(-4)}</span>
                        </div>
                        
                        <div className="card-body">
                          <h3 className="card-title" title={getCardTitle(row)}>
                            {getCardTitle(row)}
                          </h3>
                          <p className="card-subtitle">{getCardSubtitle(row)}</p>
                          
                          <div className="card-specs">
                            <div className="spec-item">
                              <span className="spec-label">Core Size</span>
                              <span className="spec-value">{row.Core_size_nm || 'N/A'}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Shape</span>
                              <span className="spec-value">{row.Shape || 'N/A'}</span>
                            </div>
                          </div>
                          
                          <div className="card-footer">
                            <div className="functional-group">
                              <strong>Toxicity: </strong>
                              {row.Toxicity && row.Toxicity !== 'Not reported' ? row.Toxicity : 'No'}
                              {row.Viability_percent && row.Viability_percent !== 'Not reported' && (
                                <span> (Viability: {row.Viability_percent.replace('ANOMALY:', '').trim()}%)</span>
                              )}
                            </div>
                            <Link 
                              to={`/webtools/details/${row._id}`} 
                              state={{ fromTool: 'Poly-ToxMap' }}
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
                    <div className="no-results" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem 1.5rem', background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.07)' }}>
                      <div className="no-results-icon fade-in" style={{ display: 'inline-flex', marginBottom: '1rem', color: 'var(--red)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <path d="m21 21-4.3-4.3"/>
                          <path d="M11 8v6"/>
                          <path d="M8 11h6"/>
                        </svg>
                      </div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>No materials found</h3>
                      <p style={{ color: '#86868b', fontSize: '0.9rem', margin: '0 0 1.5rem 0' }}>Try adjusting your search terms or filters on the left, then hit Search again.</p>
                      <button type="button" className="btn-sidebar-search" style={{ width: 'auto', display: 'inline-block', padding: '10px 24px' }} onClick={clearFilters}>Reset Filters</button>
                    </div>
                  )}
                </div>

                {totalRecords > limit && (
                  <div className="pagination-bar" style={{ marginTop: '20px' }}>
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
          {/* 1. Polymer type */}
          <div className={`filter-dropdown-container ${openDropdown === 'Polymers' ? 'open-dropdown' : ''}`}>
            <label className="filter-dropdown-label">Polymer type</label>
            <div className="filter-dropdown">
              <button
                type="button"
                className={`filter-dropdown-trigger ${openDropdown === 'Polymers' ? 'open' : ''} ${activeFilters.categorical.Polymers.length > 0 ? 'has-active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'Polymers' ? null : 'Polymers')}
              >
                <span className="trigger-text">
                  {activeFilters.categorical.Polymers.length === 0
                    ? 'Select polymer type'
                    : activeFilters.categorical.Polymers.length === 1
                      ? activeFilters.categorical.Polymers[0]
                      : `${activeFilters.categorical.Polymers.length} Selected`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openDropdown === 'Polymers' && (
                <div className="filter-dropdown-menu">
                  {filterOptions.categorical.Polymers.map(opt => (
                    <div
                      key={opt}
                      className={`filter-dropdown-item ${activeFilters.categorical.Polymers.includes(opt) ? 'active' : ''}`}
                      onClick={() => toggleFilter('Polymers', opt)}
                    >
                      <input type="checkbox" className="filter-checkbox" checked={activeFilters.categorical.Polymers.includes(opt)} readOnly />
                      <span className="item-label">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Type of materials */}
          <div className={`filter-dropdown-container ${openDropdown === 'Polymer_type' ? 'open-dropdown' : ''}`}>
            <label className="filter-dropdown-label">Type of materials</label>
            <div className="filter-dropdown">
              <button
                type="button"
                className={`filter-dropdown-trigger ${openDropdown === 'Polymer_type' ? 'open' : ''} ${activeFilters.categorical.Polymer_type.length > 0 ? 'has-active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'Polymer_type' ? null : 'Polymer_type')}
              >
                <span className="trigger-text">
                  {activeFilters.categorical.Polymer_type.length === 0
                    ? 'Select type of materials'
                    : activeFilters.categorical.Polymer_type.length === 1
                      ? activeFilters.categorical.Polymer_type[0]
                      : `${activeFilters.categorical.Polymer_type.length} Selected`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openDropdown === 'Polymer_type' && (
                <div className="filter-dropdown-menu">
                  {filterOptions.categorical.Polymer_type.map(opt => (
                    <div
                      key={opt}
                      className={`filter-dropdown-item ${activeFilters.categorical.Polymer_type.includes(opt) ? 'active' : ''}`}
                      onClick={() => toggleFilter('Polymer_type', opt)}
                    >
                      <input type="checkbox" className="filter-checkbox" checked={activeFilters.categorical.Polymer_type.includes(opt)} readOnly />
                      <span className="item-label">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Synthesis method */}
          <div className={`filter-dropdown-container ${openDropdown === 'Synthesis_method' ? 'open-dropdown' : ''}`}>
            <label className="filter-dropdown-label">Synthesis method</label>
            <div className="filter-dropdown">
              <button
                type="button"
                className={`filter-dropdown-trigger ${openDropdown === 'Synthesis_method' ? 'open' : ''} ${activeFilters.categorical.Synthesis_method.length > 0 ? 'has-active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'Synthesis_method' ? null : 'Synthesis_method')}
              >
                <span className="trigger-text">
                  {activeFilters.categorical.Synthesis_method.length === 0
                    ? 'Select synthesis method'
                    : activeFilters.categorical.Synthesis_method.length === 1
                      ? activeFilters.categorical.Synthesis_method[0]
                      : `${activeFilters.categorical.Synthesis_method.length} Selected`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openDropdown === 'Synthesis_method' && (
                <div className="filter-dropdown-menu">
                  {filterOptions.categorical.Synthesis_method.map(opt => (
                    <div
                      key={opt}
                      className={`filter-dropdown-item ${activeFilters.categorical.Synthesis_method.includes(opt) ? 'active' : ''}`}
                      onClick={() => toggleFilter('Synthesis_method', opt)}
                    >
                      <input type="checkbox" className="filter-checkbox" checked={activeFilters.categorical.Synthesis_method.includes(opt)} readOnly />
                      <span className="item-label">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 4. Functional group/drug */}
          <div className={`filter-dropdown-container ${openDropdown === 'Material_2' ? 'open-dropdown' : ''}`}>
            <label className="filter-dropdown-label">Functional group/drug</label>
            <div className="filter-dropdown">
              <button
                type="button"
                className={`filter-dropdown-trigger ${openDropdown === 'Material_2' ? 'open' : ''} ${activeFilters.categorical.Material_2.length > 0 ? 'has-active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'Material_2' ? null : 'Material_2')}
              >
                <span className="trigger-text">
                  {activeFilters.categorical.Material_2.length === 0
                    ? 'Select functional group / drug'
                    : activeFilters.categorical.Material_2.length === 1
                      ? activeFilters.categorical.Material_2[0]
                      : `${activeFilters.categorical.Material_2.length} Selected`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openDropdown === 'Material_2' && (
                <div className="filter-dropdown-menu">
                  {filterOptions.categorical.Material_2.map(opt => (
                    <div
                      key={opt}
                      className={`filter-dropdown-item ${activeFilters.categorical.Material_2.includes(opt) ? 'active' : ''}`}
                      onClick={() => toggleFilter('Material_2', opt)}
                    >
                      <input type="checkbox" className="filter-checkbox" checked={activeFilters.categorical.Material_2.includes(opt)} readOnly />
                      <span className="item-label">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 5. Abbreviation */}
          <div className="filter-dropdown-container">
            <label className="filter-dropdown-label">Abbreviation</label>
            <input
              type="text"
              className="filter-text-input"
              placeholder="Enter abbreviation"
              value={activeFilters.abbreviation}
              onChange={e => handleInputChange('abbreviation', e.target.value)}
            />
          </div>

          {/* 6. Shape */}
          <div className={`filter-dropdown-container ${openDropdown === 'Shape' ? 'open-dropdown' : ''}`}>
            <label className="filter-dropdown-label">Shape</label>
            <div className="filter-dropdown">
              <button
                type="button"
                className={`filter-dropdown-trigger ${openDropdown === 'Shape' ? 'open' : ''} ${activeFilters.categorical.Shape.length > 0 ? 'has-active' : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'Shape' ? null : 'Shape')}
              >
                <span className="trigger-text">
                  {activeFilters.categorical.Shape.length === 0
                    ? 'Select shape'
                    : activeFilters.categorical.Shape.length === 1
                      ? activeFilters.categorical.Shape[0]
                      : `${activeFilters.categorical.Shape.length} Selected`}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="chevron-icon"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {openDropdown === 'Shape' && (
                <div className="filter-dropdown-menu">
                  {filterOptions.categorical.Shape.map(opt => (
                    <div
                      key={opt}
                      className={`filter-dropdown-item ${activeFilters.categorical.Shape.includes(opt) ? 'active' : ''}`}
                      onClick={() => toggleFilter('Shape', opt)}
                    >
                      <input type="checkbox" className="filter-checkbox" checked={activeFilters.categorical.Shape.includes(opt)} readOnly />
                      <span className="item-label">{opt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 7. Core size (nm) */}
          <div className="filter-dropdown-container">
            <label className="filter-dropdown-label">Core size (nm)</label>
            <div className="filter-range-inputs">
              <input
                type="number"
                className="filter-range-input"
                placeholder="Min"
                value={activeFilters.core_min}
                onChange={e => handleInputChange('core_min', e.target.value)}
              />
              <span className="filter-range-sep">-</span>
              <input
                type="number"
                className="filter-range-input"
                placeholder="Max"
                value={activeFilters.core_max}
                onChange={e => handleInputChange('core_max', e.target.value)}
              />
            </div>
          </div>

          {/* 8. PDI */}
          <div className="filter-dropdown-container">
            <label className="filter-dropdown-label">PDI</label>
            <div className="filter-range-inputs">
              <input
                type="number"
                step="0.01"
                className="filter-range-input"
                placeholder="Min"
                value={activeFilters.pdi_min}
                onChange={e => handleInputChange('pdi_min', e.target.value)}
              />
              <span className="filter-range-sep">-</span>
              <input
                type="number"
                step="0.01"
                className="filter-range-input"
                placeholder="Max"
                value={activeFilters.pdi_max}
                onChange={e => handleInputChange('pdi_max', e.target.value)}
              />
            </div>
          </div>

          {/* 9. Hydrodynamic size in water (nm) */}
          <div className="filter-dropdown-container">
            <label className="filter-dropdown-label">Hydrodynamic size (nm)</label>
            <div className="filter-range-inputs">
              <input
                type="number"
                className="filter-range-input"
                placeholder="Min"
                value={activeFilters.hydro_min}
                onChange={e => handleInputChange('hydro_min', e.target.value)}
              />
              <span className="filter-range-sep">-</span>
              <input
                type="number"
                className="filter-range-input"
                placeholder="Max"
                value={activeFilters.hydro_max}
                onChange={e => handleInputChange('hydro_max', e.target.value)}
              />
            </div>
          </div>

          {/* 10. Surface charge in water (mV) */}
          <div className="filter-dropdown-container">
            <label className="filter-dropdown-label">Surface charge (mV)</label>
            <div className="filter-range-inputs">
              <input
                type="number"
                className="filter-range-input"
                placeholder="Min"
                value={activeFilters.charge_min}
                onChange={e => handleInputChange('charge_min', e.target.value)}
              />
              <span className="filter-range-sep">-</span>
              <input
                type="number"
                className="filter-range-input"
                placeholder="Max"
                value={activeFilters.charge_max}
                onChange={e => handleInputChange('charge_max', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="sidebar-actions">
          <button
            type="button"
            className="btn-sidebar-search"
            onClick={() => {
              setHasSearched(true);
              if (page === 1) {
                performSearch(1);
              } else {
                setPage(1);
              }
            }}
          >
            {loading ? <span className="search-spinner"></span> : 'Search Dataset'}
          </button>
          <button type="button" className="btn-sidebar-reset" onClick={clearFilters}>
            Reset
          </button>
        </div>
      </aside>
    </div>
  );
};

export default PolyToxMapSearch;
