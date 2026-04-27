import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PlatformSearch.css';

const PlatformSearch = ({ toolName, toolSubtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);
  
  const [filterOptions, setFilterOptions] = useState({
    Type_of_materials: [],
    Sub_type_of_materials: [],
    Shape: [],
    Injury_Model: [],
    Cell_Type: []
  });
  
  const [activeFilters, setActiveFilters] = useState({
    Type_of_materials: [],
    Sub_type_of_materials: [],
    Shape: [],
    Injury_Model: [],
    Cell_Type: []
  });

  const [page, setPage] = useState(1);
  const limit = 12;

  // Fetch filter options on mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/filters');
        const result = await response.json();
        if (result.status === 'success') {
          setFilterOptions(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch filters:', err);
      }
    };
    fetchFilters();
  }, []);

  // Fetch data when filters or search query changes
  useEffect(() => {
    // Don't fetch data if no search or filter is active
    const totalActiveFilters = Object.values(activeFilters).flat().length;
    if (!searchQuery && totalActiveFilters === 0) {
      setRecords([]);
      setTotalRecords(0);
      setHasSearched(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error on new search
      setHasSearched(true);
      try {
        const response = await fetch('http://localhost:5000/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            keyword: searchQuery,
            filters: activeFilters,
            page,
            limit
          })
        });

        const result = await response.json();

        if (response.status === 429) {
          setError('Rate limit exceeded. Please wait 15 minutes before your next search.');
          return;
        }

        if (result.status === 'success') {
          setRecords(result.data);
          setTotalRecords(result.totalRecords);
        } else {
          setError(result.message || 'An error occurred while fetching data.');
        }
      } catch (err) {
        console.error('Search failed:', err);
        setError('Network error: Unable to connect to the research database.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters, page]);

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [category]: next };
    });
    setPage(1); 
  };

  const clearFilters = () => {
    setActiveFilters({
      Type_of_materials: [],
      Sub_type_of_materials: [],
      Shape: [],
      Injury_Model: [],
      Cell_Type: []
    });
    setSearchQuery('');
    setPage(1);
    setHasSearched(false);
  };

  const totalActive = Object.values(activeFilters).flat().length;

  return (
    <div className={`apple-search-container ${!hasSearched ? 'hero-mode' : 'results-mode'} fade-in`}>
      <header className="minimal-header">
        <div className="header-text">
          <h1 className="minimal-title">{toolName}</h1>
          <p className="minimal-subtitle">{toolSubtitle || `Advanced data exploration platform.`}</p>
        </div>
        {hasSearched && (
          <div className="minimal-stats fade-in">
            <span className="stat-badge">{totalRecords} Datasets Found</span>
          </div>
        )}
      </header>

      <div className="apple-controls">
        <div className="apple-search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            className="apple-input" 
            placeholder={`Search materials, abbreviations, references...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button 
          className={`apple-filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 12V7"/><path d="M12 12l3 2"/><path d="M12 12l-3 2"/>
          </svg>
          Filters
          {totalActive > 0 && <span className="filter-count">{totalActive}</span>}
        </button>

        {hasSearched && (
          <button className="apple-export-btn fade-in" onClick={() => alert('Export functionality coming soon')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export
          </button>
        )}
      </div>

      {showFilters && (
        <div className="filter-popup-overlay" onClick={() => setShowFilters(false)}>
          <div className="apple-filter-popup fade-in" onClick={e => e.stopPropagation()}>
            <div className="popup-header">
              <h2 className="popup-title">Refine Search</h2>
              <button className="close-icon-btn" onClick={() => setShowFilters(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="filter-sections-layout scrollable-popup-content">
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key} className="filter-layout-group">
                  <h3 className="group-title">{key.replace(/_/g, ' ')}</h3>
                  <div className="group-content">
                    <div className="pill-group">
                      {options.slice(0, 15).map(opt => (
                        <button 
                          key={opt}
                          className={`filter-pill ${activeFilters[key]?.includes(opt) ? 'active' : ''}`}
                          onClick={() => toggleFilter(key, opt)}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="tray-footer">
              <button className="text-btn" onClick={clearFilters}>Clear All</button>
              <button className="done-btn" onClick={() => setShowFilters(false)}>Show Results</button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="apple-error-alert fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>{error}</span>
        </div>
      )}

      {hasSearched && (
        <div className="results-container fade-in">
          {loading ? (
            <div className="loading-grid">
              {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
            </div>
          ) : (
            <div className="data-cards-grid">
              {records.length > 0 ? (
                records.map((row) => (
                  <div key={row._id} className="data-card fade-in">
                    <div className="card-header">
                      <span className={`category-tag ${row.Type_of_materials?.toLowerCase()}`}>
                        {row.Type_of_materials}
                      </span>
                      <span className="id-tag">#{row._id.slice(-4)}</span>
                    </div>
                    
                    <div className="card-body">
                      <h3 className="card-title">{row.Abbreviation || 'Unnamed Material'}</h3>
                      <p className="card-subtitle">{row.Sub_type_of_materials}</p>
                      
                      <div className="card-specs">
                        <div className="spec-item">
                          <span className="spec-label">Size</span>
                          <span className="spec-value">
                            {row.Size_nm_min && row.Size_nm_max 
                              ? `${row.Size_nm_min}-${row.Size_nm_max} nm`
                              : row.Size_nm_min || row.Size_nm_max || 'N/A'}
                          </span>
                        </div>
                        <div className="spec-item">
                          <span className="spec-label">Shape</span>
                          <span className="spec-value">{row.Shape || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="card-footer">
                        <div className="functional-group">
                          {row.Functional_group_drug && row.Functional_group_drug !== 'Missing' 
                            ? row.Functional_group_drug 
                            : 'No Functional Group'}
                        </div>
                        <Link 
                          to={`/webtools/details/${row._id}`} 
                          className="card-action-btn"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                          </svg>
                          View Report
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No materials found</h3>
                  <p>Try adjusting your search terms or filters to find what you're looking for.</p>
                  <button className="btn-reset-search" onClick={clearFilters}>Clear Search</button>
                </div>
              )}
            </div>
          )}

          {totalRecords > limit && (
            <div className="pagination-bar">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(p => p - 1)}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="page-indicator">Page {page} of {Math.ceil(totalRecords / limit)}</span>
              <button 
                disabled={page >= Math.ceil(totalRecords / limit)} 
                onClick={() => setPage(p => p + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      
      {!hasSearched && (
        <div className="hero-search-helper fade-in">
          <div className="helper-pills">
            <span>Try searching for:</span>
            <button onClick={() => setSearchQuery('Zein')}>Zein</button>
            <button onClick={() => setSearchQuery('Gold')}>Gold</button>
            <button onClick={() => setSearchQuery('Silver')}>Silver</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSearch;
