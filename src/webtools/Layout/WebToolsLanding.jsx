import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { labData } from '../../data/labData';
import './WebToolsLanding.css';

const { webTools } = labData;

const WebToolsLanding = () => {
  const navigate = useNavigate();

  return (
    <div className="webtools-landing fade-in">
      {/* Background Animated Blobs */}
      <div className="landing-bg-elements">
        <div className="landing-blob blob-1"></div>
        <div className="landing-blob blob-2"></div>
      </div>

      <div className="landing-content-wrapper">
        <div className="landing-header-modern">
          <div className="landing-badge">
            <span className="pulse-dot"></span>
            System Online
          </div>
          <h1>Web-Based Research Tools</h1>
          <p>
            Explore our web-based, biology-informed AI platforms and curated datasets for rapid prediction of nanomaterial biosafety and therapeutic outcomes, empowering faster, data-driven research and design.
          </p>
          <p style={{ marginTop: '16px', fontSize: '0.95rem' }}>
            We have developed web-based platforms that curate and harmonize large-scale experimental data into unified nano–bio interaction databases. By integrating diverse nanoparticle classes, biological systems, and experimental conditions, these tools enable rapid, mechanism-informed exploration and hypothesis generation, supporting data-driven decision-making in nanomedicine and biosafety research.<br/><br/>
            All datasets are systematically curated and standardized into structured formats to ensure robustness, reproducibility, and generalizability across studies. These platforms are currently being advanced toward predictive systems through the integration of biology-informed machine learning approaches.
          </p>
        </div>

        <div className="modern-tools-grid">
          {webTools.map((tool) => (
            <ModernToolCard key={tool.id} tool={tool} navigate={navigate} />
          ))}
        </div>
        
        <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          All platforms are developed using internally standardized data integration and curation frameworks to ensure consistency, reproducibility, and cross-study comparability.
        </p>
      </div>
    </div>
  );
};

const ModernToolCard = ({ tool, navigate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = tool.description.length > 180;
  const displayDescription = isLong && !isExpanded 
    ? tool.description.substring(0, 180) + '...' 
    : tool.description;

  const isAvailable = tool.status === 'Available';

  // Icons based on ID
  const renderIcon = () => {
    switch (tool.id) {
      case 'neuro-bio-axis':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
            <path d="M2 12h20"></path>
          </svg>
        );
      case 'poly-toxmap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        );
      case 'derm-nanomap':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
        );
      case 'hepato-bioaxis':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`tool-card-premium ${!isAvailable ? 'tool-card-disabled' : ''}`} 
      onClick={() => isAvailable && navigate(tool.link)}
      role={isAvailable ? "button" : "presentation"}
      tabIndex={isAvailable ? 0 : -1}
    >
      <div className="tool-icon-wrapper">
        {renderIcon()}
      </div>
      
      <h3>{tool.name}</h3>
      <p>
        {displayDescription}
        {isLong && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="read-more-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'var(--red)', 
              fontWeight: '600', 
              fontSize: '0.85rem',
              marginLeft: '6px',
              cursor: 'pointer',
              padding: 0
            }}
          >
            {isExpanded ? 'Less' : 'More'}
          </button>
        )}
      </p>
      
      <div className="tool-card-footer">
        <span className={`tool-status ${isAvailable ? 'status-live' : 'status-soon'}`}>
          {tool.status}
        </span>
        {isAvailable && (
          <div className="btn-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebToolsLanding;
