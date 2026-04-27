import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PlatformSearch.css';

const MOCK_DATA = [
  { id: 1, abbrev: 'Ag NPs', type: 'Inorganic', subType: 'Silver', size: '<10', shape: 'Sphere', group: 'Missing' },
  { id: 2, abbrev: 'AuNPs_GSH', type: 'Inorganic', subType: 'Gold', size: '~10-100', shape: 'Sphere', group: 'Glutathione' },
  { id: 3, abbrev: 'CeNP-Gel', type: 'Hybrid', subType: 'Cerium oxide', size: '~100-200', shape: 'Non-sphere', group: 'gelatin methacryloyl' },
  { id: 4, abbrev: 'MSNs', type: 'Inorganic', subType: 'MesoporousNanoparticles', size: '~10-100', shape: 'Sphere', group: 'octysilane' },
  { id: 5, abbrev: 'SPION_Cur', type: 'Inorganic', subType: 'SPION', size: '<10', shape: 'Sphere', group: 'Curcumin' },
];

const PlatformSearch = ({ toolName, toolSubtitle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    type: [],
    subtype: [],
    functional: [],
    size: [],
    shape: []
  });

  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category];
      const next = current.includes(value) 
        ? current.filter(v => v !== value) 
        : [...current, value];
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => {
    setActiveFilters({ type: [], subtype: [], functional: [], size: [], shape: [] });
  };

  const filterCategories = [
    { id: 'type', label: 'Material Type', options: ['Inorganic', 'Organic', 'Hybrid', 'Carbon'] },
    { id: 'subtype', label: 'Sub-type', options: ['Gold', 'Silver', 'Silica', 'Polymer', 'Lipid'] },
    { id: 'functional', label: 'Functional Materials', options: ['Amine', 'Carboxyl', 'PEG', 'Bare'] },
    { id: 'size', label: 'Size', options: ['<10nm', '10-50nm', '50-100nm', '>100nm'] },
    { id: 'shape', label: 'Shape', options: ['Sphere', 'Rod', 'Sheet', 'Tube'] }
  ];

  const totalActive = Object.values(activeFilters).flat().length;

  return (
    <div className="apple-search-container fade-in">
      <header className="minimal-header">
        <div className="header-text">
          <h1 className="minimal-title">{toolName}</h1>
          <p className="minimal-subtitle">{toolSubtitle || `Advanced data exploration platform.`}</p>
        </div>
        <div className="minimal-stats">
          <span className="stat-badge">124 Datasets</span>
        </div>
      </header>

      <div className="apple-controls">
        <div className="apple-search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            className="apple-input" 
            placeholder={`Search materials...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <button 
          className={`apple-filter-toggle ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
          Filters
          {totalActive > 0 && <span className="filter-count">{totalActive}</span>}
        </button>

        <button className="apple-export-btn">
          Export
        </button>
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
              {/* Group 1: Material Identity */}
              <div className="filter-layout-group">
                <h3 className="group-title">Material Identity</h3>
                <div className="group-content">
                  {filterCategories.slice(0, 2).map(cat => (
                    <div key={cat.id} className="filter-item">
                      <label className="filter-label">{cat.label}</label>
                      <div className="pill-group">
                        {cat.options.map(opt => (
                          <button 
                            key={opt}
                            className={`filter-pill ${activeFilters[cat.id].includes(opt) ? 'active' : ''}`}
                            onClick={() => toggleFilter(cat.id, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: Features */}
              <div className="filter-layout-group">
                <h3 className="group-title">Features & Morphology</h3>
                <div className="group-content">
                  {filterCategories.slice(2, 4).map(cat => (
                    <div key={cat.id} className="filter-item">
                      <label className="filter-label">{cat.label}</label>
                      <div className="pill-group">
                        {cat.options.map(opt => (
                          <button 
                            key={opt}
                            className={`filter-pill ${activeFilters[cat.id].includes(opt) ? 'active' : ''}`}
                            onClick={() => toggleFilter(cat.id, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 3: Scale */}
              <div className="filter-layout-group">
                <h3 className="group-title">Physical Scale</h3>
                <div className="group-content">
                  {filterCategories.slice(4).map(cat => (
                    <div key={cat.id} className="filter-item">
                      <label className="filter-label">{cat.label}</label>
                      <div className="pill-group">
                        {cat.options.map(opt => (
                          <button 
                            key={opt}
                            className={`filter-pill ${activeFilters[cat.id].includes(opt) ? 'active' : ''}`}
                            onClick={() => toggleFilter(cat.id, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="tray-footer">
              <button className="text-btn" onClick={clearFilters}>Clear All</button>
              <button className="done-btn" onClick={() => setShowFilters(false)}>Show Results</button>
            </div>
          </div>
        </div>
      )}

      <div className="apple-table-container">
        <table className="apple-table">
          <thead>
            <tr>
              <th>Abbreviation</th>
              <th>Type</th>
              <th>Sub-type</th>
              <th>Functional</th>
              <th>Size</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((row) => (
              <tr key={row.id}>
                <td className="row-title">{row.abbrev}</td>
                <td>
                  <span className={`type-dot ${row.type.toLowerCase()}`}></span>
                  {row.type}
                </td>
                <td className="text-secondary">{row.subType}</td>
                <td className="text-secondary">{row.group === 'Missing' ? '—' : row.group}</td>
                <td>{row.size}</td>
                <td className="text-right">
                  <Link 
                    to={`/webtools/details/${row.abbrev}`} 
                    state={{ fromTool: toolName }}
                    className="row-btn"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformSearch;
