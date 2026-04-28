import { useState } from 'react';
import { Link } from 'react-router-dom';
import { labData } from '../../data/labData';
import './WebTools.css';

const { webTools } = labData;

export default function WebTools() {
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
            <span className="section-label">AI Platforms</span>
            <h1 className="t-h1">Web-Based Research Tools</h1>
            <div className="t-body inner-hero__sub">
              <p style={{ marginBottom: '16px' }}>
                We have developed web-based platforms that curate and harmonize large-scale experimental data into unified nano–bio interaction databases. By integrating diverse nanoparticle classes, biological systems, and experimental conditions, these tools enable rapid, mechanism-informed exploration and hypothesis generation, supporting data-driven decision-making in nanomedicine and biosafety research.
              </p>
              <p>
                All datasets are systematically curated and standardized into structured formats to ensure robustness, reproducibility, and generalizability across studies. These platforms are currently being advanced toward predictive systems through the integration of biology-informed machine learning approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOOLS GRID ─────────────────────────────────── */}
      <section className="section tools-section">
        <div className="container">
          <div className="tools-grid">
            {webTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
          
          <p style={{ marginTop: '48px', textAlign: 'center', fontSize: '15px', color: 'var(--text-secondary)' }}>
            All platforms are developed using internally standardized data integration and curation frameworks to ensure consistency, reproducibility, and cross-study comparability.
          </p>
        </div>
      </section>

      {/* ── EARLY ACCESS BANNER ────────────────────────── */}
      {/* <section className="section info-banner-section">
        <div className="container">
          <div className="info-banner">
            <div className="info-banner__content">
              <h2 className="t-h3">Request Institution-Wide Access</h2>
              <p className="t-body">
                We provide specialized API access and private database instances 
                for collaborating research institutions and industry partners.
              </p>
            </div>
            <a href="/contact" className="btn btn-red">Contact for Partnership</a>
          </div>
        </div>
      </section> */}
    </main>
  );
}

function ToolCard({ tool }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = tool.description.length > 150;
  const displayDescription = isLong && !isExpanded 
    ? tool.description.substring(0, 150) + '...' 
    : tool.description;

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
        <Link to="/webtools" className="btn btn-outline-red btn-sm">
          {tool.status === 'Available' || tool.status === 'Early Access' ? 'Access Platform' : 'View Documentation'}
        </Link>
      </div>
    </div>
  );
}
