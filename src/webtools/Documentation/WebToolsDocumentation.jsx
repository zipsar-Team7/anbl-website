import React from 'react';
import './WebToolsDocumentation.css';
import { labData } from '../../data/labData';

const { webTools } = labData;

const renderToolIcon = (id) => {
  switch (id) {
    case 'neuro-bio-axis':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      );
    case 'poly-toxmap':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      );
    case 'derm-nanomap':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      );
    case 'hepato-bioaxis':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      );
    default:
      return null;
  }
};

const WebToolsDocumentation = () => {
  return (
    <div className="notion-page fade-in">
      {/* Notion-style Cover & Header */}
      <div className="notion-header">
        <div className="notion-icon-wrapper main">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        </div>
        <h1 className="notion-title">Platform Documentation</h1>
        <p className="notion-description">
          A comprehensive guide to ANBL's web-based research tools, curated datasets, and predictive models.
        </p>
      </div>

      <div className="notion-content">
        <section className="notion-section" id="getting-started">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3l1 1"></path><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5l-1-1"></path></svg>
            </span>
            Getting Started
          </h2>
          <p>
            The Advanced Nanomedicine & Biosafety Lab (ANBL) provides a suite of biology-informed AI platforms designed to accelerate nanomaterial research. Each tool is built on standardized datasets and mechanistic pathways to ensure reproducibility and generalizability.
          </p>
          <div className="notion-callout">
            <span className="callout-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>
            </span>
            <div className="callout-text">
              <strong>Tip:</strong> You can access each platform directly from the sidebar or the dashboard overview. For early access platforms, please contact the lab directly.
            </div>
          </div>
        </section>

        <div className="notion-divider"></div>

        <section className="notion-section" id="platforms">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            Available Platforms
          </h2>
          
          <div className="notion-tools-list">
            {webTools.map((tool) => (
              <div key={tool.id} id={tool.id} className="notion-tool-doc">
                <div className="notion-tool-header-row">
                  <div className="doc-tool-icon">
                    {renderToolIcon(tool.id)}
                  </div>
                  <h3 className="notion-h3">
                    {tool.name}
                    <span className={`doc-status status-${tool.status.toLowerCase().replace(' ', '-')}`}>
                      {tool.status}
                    </span>
                  </h3>
                </div>
                <div className="notion-tool-meta">
                  <span className="meta-item"><strong>Category:</strong> {tool.category}</span>
                  <span className="meta-item"><strong>System:</strong> {tool.id.split('-')[0].charAt(0).toUpperCase() + tool.id.split('-')[0].slice(1)}</span>
                </div>
                <div className="notion-tool-description">
                  <p>{tool.description}</p>
                </div>
                
                <div className="notion-sub-section">
                  <h4 className="notion-h4">Usage & Methodology</h4>
                  <p>
                    Data is curated across molecular, cellular, and in vivo scales. The platform utilizes biology-informed machine learning to predict outcomes based on material properties and biological responses.
                  </p>
                  <ul className="notion-list">
                    <li>Mechanistic pathway integration for cross-organ generalization.</li>
                    <li>Support for New Approach Methodologies (NAMs).</li>
                    <li>Systematic standardization for robust reproducibility.</li>
                  </ul>
                </div>
                
                <div className="tool-divider"></div>
              </div>
            ))}
          </div>
        </section>

        <section className="notion-section" id="support">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.1-2.1a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            Support & Collaboration
          </h2>
          <p>
            If you encounter issues or are interested in institution-wide access and private database instances, please reach out to our team.
          </p>
          <div className="notion-callout red">
            <div className="callout-text">
              Contact: <strong>harijai2004@hanyang.ac.kr</strong>
            </div>
          </div>
        </section>
      </div>


      {/* Floating TOC for Notion vibe */}
      <aside className="notion-toc">
        <div className="toc-title">On this page</div>
        <nav>
          <a href="#getting-started">Getting Started</a>
          {webTools.map(t => (
            <a key={t.id} href={`#${t.id}`}>{t.name}</a>
          ))}
          <a href="#support">Support</a>
        </nav>
      </aside>
    </div>
  );
};

export default WebToolsDocumentation;
