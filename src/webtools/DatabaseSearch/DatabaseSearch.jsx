import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { labData } from '../../data/labData';
import './DatabaseSearch.css';

const { webTools } = labData;

const MOCK_DATA = [
  { id: 1, abbrev: 'Ag NPs', type: 'Inorganic', subType: 'Silver', size: '<10', shape: 'Sphere', group: 'Missing' },
  { id: 2, abbrev: 'AuNPs_GSH', type: 'Inorganic', subType: 'Gold', size: '~10-100', shape: 'Sphere', group: 'Glutathione' },
  { id: 3, abbrev: 'CeNP-Gel', type: 'Hybrid', subType: 'Cerium oxide', size: '~100-200', shape: 'Non-sphere', group: 'gelatin methacryloyl' },
  { id: 4, abbrev: 'MSNs', type: 'Inorganic', subType: 'MesoporousNanoparticles', size: '~10-100', shape: 'Sphere', group: 'octysilane' },
  { id: 5, abbrev: 'SPION_Cur', type: 'Inorganic', subType: 'SPION', size: '<10', shape: 'Sphere', group: 'Curcumin' },
];

const DatabaseSearch = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  // Get tool info from query param
  const queryParams = new URLSearchParams(location.search);
  const toolId = queryParams.get('t');
  const selectedTool = webTools.find(t => t.id === toolId) || webTools[0];

  return (
    <div className="database-search-container fade-in">
      {/* Search & Filter Module */}
      <section className="search-module">
        <div className="search-header-group">
          <h1 className="tool-title">{selectedTool.name} Database</h1>
          <p className="tool-subtitle">Query our curated repository of {selectedTool.name.toLowerCase()} datasets and interactions.</p>
        </div>

        <div className="search-bar-row">
          <div className="main-search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="main-search-input" 
              placeholder={`Search ${selectedTool.name} by abbreviation, material, or keyword...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`btn-filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
        </div>

        {/* Expandable Advanced Filters Tray */}
        {showFilters && (
          <div className="filter-tray fade-in">
            <div className="filter-grid">
              <div className="filter-group">
                <label>Material Category</label>
                <select className="filter-select">
                  <option value="">All Categories</option>
                  <option value="carbon">Carbon</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="hydrogel">Hydrogel</option>
                  <option value="inorganic">Inorganic</option>
                  <option value="organic">Organic</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Sub-type</label>
                <select className="filter-select">
                  <option value="">All Sub-types</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="silica">Silica</option>
                  <option value="iron-oxide">Iron Oxide</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Size Range</label>
                <select className="filter-select">
                  <option value="">Any Size</option>
                  <option value="<10">{'<10 nm'}</option>
                  <option value="10-100">10-100 nm</option>
                  <option value="100-200">100-200 nm</option>
                  <option value=">200">{'>200 nm'}</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Morphology</label>
                <select className="filter-select">
                  <option value="">Any Shape</option>
                  <option value="sphere">Sphere</option>
                  <option value="non-sphere">Non-sphere</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button className="btn-reset">Reset All</button>
              <button className="btn-apply">Apply Filters</button>
            </div>
          </div>
        )}
      </section>

      {/* Results Display Area */}
      <section className="results-module">
        <div className="results-header">
          <div className="results-stats">
            <span className="results-count">5 Results</span>
            <span className="results-total">out of 124 in {selectedTool.name}</span>
          </div>
          <div className="results-actions">
            <button className="btn-export">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Abbreviation</th>
                <th>Category</th>
                <th>Sub-type</th>
                <th>Functional Group</th>
                <th>Size</th>
                <th>Shape</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.map((row) => (
                <tr key={row.id}>
                  <td className="cell-bold">{row.abbrev}</td>
                  <td>
                    <span className={`status-pill ${row.type.toLowerCase()}`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="cell-dim">{row.subType}</td>
                  <td>
                    {row.group === 'Missing' ? (
                      <span className="cell-na">N/A</span>
                    ) : (
                      row.group
                    )}
                  </td>
                  <td>{row.size}</td>
                  <td>{row.shape}</td>
                  <td className="cell-action">
                    <button className="row-action-btn">
                      View
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DatabaseSearch;
