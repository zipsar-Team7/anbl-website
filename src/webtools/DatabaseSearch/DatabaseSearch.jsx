import React, { useState } from 'react';
import './DatabaseSearch.css';

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

  return (
    <div className="database-search-container fade-in">
      {/* Search & Filter Module */}
      <section className="search-module">
        <div className="search-bar-row">
          <div className="main-search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="main-search-input" 
              placeholder="Search by abbreviation, drug, material, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className={`btn-filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters {showFilters ? '▲' : '▼'}
          </button>
        </div>

        {/* Expandable Advanced Filters Tray */}
        {showFilters && (
          <div className="filter-tray">
            <div className="filter-group">
              <label>Type of Material</label>
              <select className="filter-select">
                <option value="">All Types</option>
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
              <label>Size (nm)</label>
              <select className="filter-select">
                <option value="">Any Size</option>
                <option value="<10">{'<10'}</option>
                <option value="10-100">~10-100</option>
                <option value="100-200">~100-200</option>
                <option value=">200">{'>200'}</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Shape</label>
              <select className="filter-select">
                <option value="">Any Shape</option>
                <option value="sphere">Sphere</option>
                <option value="non-sphere">Non-sphere</option>
              </select>
            </div>

            <div className="filter-actions">
              <button className="btn-reset">Reset</button>
              <button className="btn-apply">Apply Filters</button>
            </div>
          </div>
        )}
      </section>

      {/* Results Display Area */}
      <section className="results-module">
        <div className="results-header">
          <h2>Database Records</h2>
          <span className="results-count">Showing 5 of 124 results</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Abbreviation</th>
                <th>Material Type</th>
                <th>Sub-type</th>
                <th>Functional Group/Drug</th>
                <th>Size (nm)</th>
                <th>Shape</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_DATA.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.abbrev}</strong></td>
                  <td>
                    <span className={`badge-custom ${row.type === 'Inorganic' ? 'badge-blue' : 'badge-green'}`}>
                      {row.type}
                    </span>
                  </td>
                  <td>{row.subType}</td>
                  <td>
                    {row.group === 'Missing' ? (
                      <span className="badge-custom badge-gray">N/A</span>
                    ) : (
                      row.group
                    )}
                  </td>
                  <td>{row.size}</td>
                  <td>{row.shape}</td>
                  <td>
                    <button className="action-btn">Details</button>
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
