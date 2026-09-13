import { useState } from 'react';
import { Link } from 'react-router-dom';
import { labData } from '../../data/labData';
import './WebTools.css';

const { webTools } = labData;

export default function WebTools() {
  const dbPlatforms = webTools.filter(t => t.category === 'Platform');
  const predictionTools = webTools.filter(t => t.category === 'Prediction Tool');

  return (
    <main className="webtools-page">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="inner-hero__bg-gradient" aria-hidden="true" />
        <div className="inner-hero__particles">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="vibrating-particle" 
              style={{ 
                bottom: `${Math.random() * 80}px`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">Interactive Research Ecosystem</span>
            <h1 className="t-h1">Web-Based Research Tools</h1>
            <div className="t-body inner-hero__sub">
              <p style={{ marginBottom: '16px' }}>
                We have developed web-based platforms that curate and harmonize large-scale experimental data into unified nano–bio interaction databases. By integrating diverse nanoparticle classes, biological systems, and experimental conditions, these tools enable rapid, mechanism-informed exploration and hypothesis generation.
              </p>
              <p>
                Explore our curated databases for deep literature-derived datasets, or utilize our biology-informed machine learning predictors for real-time biosafety and therapeutic outcome forecasting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: DATABASE PLATFORMS ──────────────── */}
      <section className="section tools-section db-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="category-pill-label">Curated Datasets</div>
              <h2 className="t-h2 section-group-title">Database Platforms</h2>
              <p className="section-group-desc">
                Harmonized multi-scale experimental repositories covering physicochemical parameters, biological exposure conditions, and organ-specific cellular response profiles.
              </p>
            </div>
            <Link to="/databases/documentation" className="btn btn-outline-red btn-sm doc-header-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Database Documentation
            </Link>
          </div>

          <div className="tools-grid">
            {dbPlatforms.map((tool) => (
              <ToolCard key={tool.id} tool={tool} docLink="/databases/documentation" />
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="section-divider-line"></div>
      </div>

      {/* ── SECTION 2: AI PREDICTION TOOLS ─────────────── */}
      <section className="section tools-section pred-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <div className="category-pill-label" style={{ color: 'var(--red)', borderColor: 'rgba(246, 58, 49, 0.2)', background: 'rgba(246, 58, 49, 0.05)' }}>
                Machine Learning
              </div>
              <h2 className="t-h2 section-group-title">AI Prediction Tools</h2>
              <p className="section-group-desc">
                Biology-informed machine learning and Adverse Outcome Pathway (AOP) models for instantaneous nanotoxicology risk assessment, therapeutic recovery estimation, and AI optimization recommendations.
              </p>
            </div>
            <Link to="/predictions/documentation" className="btn btn-outline-red btn-sm doc-header-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              Prediction Documentation
            </Link>
          </div>

          <div className="tools-grid">
            {predictionTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} docLink="/predictions/documentation" />
            ))}
          </div>
          
          <p style={{ marginTop: '56px', textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
            All platforms are developed using internally standardized data integration and curation frameworks to ensure consistency, reproducibility, and cross-study comparability.
          </p>
        </div>
      </section>
    </main>
  );
}

function ToolCard({ tool, docLink }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = tool.description.length > 150;
  const displayDescription = isLong && !isExpanded 
    ? tool.description.substring(0, 150) + '...' 
    : tool.description;

  const isAvailable = tool.status === 'Available' || tool.status === 'Early Access';

  return (
    <div className="tool-card">
      <div className="tool-card__header">
        <span className="tool-category">{tool.category}</span>
        <span className={`tool-status status--${tool.status.toLowerCase().replace(' ', '-')}`}>
          {tool.status}
        </span>
      </div>
      <h3 className="t-h3">{tool.name}</h3>
      <p className="t-body tool-desc">
        {displayDescription}
        {isLong && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="read-more-btn"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </p>
      <div className="tool-card__footer">
        <div className="tool-btn-group">
          <Link to={tool.link} className={`btn ${tool.category === 'Prediction Tool' ? 'btn-red' : 'btn-outline-red'} btn-sm`}>
            {tool.category === 'Prediction Tool' ? 'Launch Predictor' : 'Explore Database'} &rarr;
          </Link>
          <Link to={docLink} className="tool-doc-text-link">
            Docs
          </Link>
        </div>
      </div>
    </div>
  );
}
