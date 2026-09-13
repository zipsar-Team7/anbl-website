import React from 'react';
import { Link } from 'react-router-dom';
import './WebToolsDocumentation.css';
import { labData } from '../../data/labData';

const { webTools } = labData;
const dbTools = webTools.filter(t => t.category === 'Platform');

const DatabasesDocumentation = () => {
  return (
    <div className="notion-page fade-in">
      {/* Notion-style Cover & Header */}
      <div className="notion-header">
        <div className="notion-icon-wrapper main" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          </svg>
        </div>
        <h1 className="notion-title">Database Platforms Documentation</h1>
        <p className="notion-description">
          Comprehensive scientific guide to ANBL's curated nano–bio interaction databases, data curation protocols, and cross-scale biological models.
        </p>
      </div>

      <div className="notion-content">
        {/* Getting Started */}
        <section className="notion-section" id="getting-started">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3l1 1"></path><path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5l-1-1"></path></svg>
            </span>
            Overview & Architecture
          </h2>
          <p>
            The ANBL Database Platforms curate, harmonize, and standardize multi-scale experimental records of nanoparticle interactions across biological systems. Each platform is built to enable rapid hypothesis generation, mechanistic exploration, and systematic cross-study comparisons.
          </p>
          <div className="notion-callout red">
            <span className="callout-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </span>
            <div className="callout-text">
              <strong>Core Objective:</strong> Bridge physicochemical material characterization with downstream biological adverse outcome pathways (AOP) across in vitro and in vivo models.
            </div>
          </div>
        </section>

        <div className="notion-divider"></div>

        {/* Curation Protocol */}
        <section className="notion-section" id="curation">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </span>
            Data Standardization & Descriptors
          </h2>
          <p>
            Every entry in the database is indexed across standardized categories:
          </p>
          <ul className="notion-list">
            <li><strong>Material Properties (MIE-P):</strong> Core composition, hydrodynamic diameter (nm), shape/geometry, surface zeta potential (mV), and agglomeration state.</li>
            <li><strong>Exposure Conditions (MIE-E):</strong> Target cell lines/tissue models, administered concentration (&mu;g/mL), stimulant co-exposure, route of administration, and cellular uptake kinetics.</li>
            <li><strong>Key Events (KE):</strong> Molecular initiating events, pro-inflammatory cytokine expression, anti-inflammatory markers, and programmed cell death (apoptosis) index.</li>
            <li><strong>Adverse Outcome (AO):</strong> Quantified cell viability (%), membrane integrity, and observed neurological/systemic recovery endpoints.</li>
          </ul>
        </section>

        <div className="notion-divider"></div>

        {/* Database Platforms List */}
        <section className="notion-section" id="platforms">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            Available Database Platforms
          </h2>
          
          <div className="notion-tools-list">
            {dbTools.map((tool) => (
              <div key={tool.id} id={tool.id} className="notion-tool-doc">
                <div className="notion-tool-header-row">
                  <div className="doc-tool-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                      <path d="M2 12h20"></path>
                    </svg>
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
                  <span className="meta-item"><strong>Access Route:</strong> <code>{tool.link}</code></span>
                </div>
                <div className="notion-tool-description">
                  <p>{tool.description}</p>
                </div>
                
                <div className="notion-sub-section">
                  <h4 className="notion-h4">Interactive Capabilities</h4>
                  <ul className="notion-list">
                    <li>Multi-parameter faceted filtering across 20+ descriptors.</li>
                    <li>Live material record inspection with full citation tracking.</li>
                    <li>One-click CSV / JSON export for downstream bioinformatics and modeling.</li>
                  </ul>
                  <div style={{ marginTop: '16px' }}>
                    <Link to={tool.link} className="btn btn-red btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Launch {tool.name} Database &rarr;
                    </Link>
                  </div>
                </div>
                
                <div className="tool-divider"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="notion-section" id="support">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.1-2.1a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </span>
            Data Inquiries & Contributions
          </h2>
          <p>
            If you wish to contribute experimental datasets or request private database instances for your institution, please contact our research team.
          </p>
          <div className="notion-callout red">
            <div className="callout-text">
              Principal Investigator: <strong>Prof. Haribalan Perumalsamy</strong> &bull; <strong>harijai2004@hanyang.ac.kr</strong>
            </div>
          </div>
        </section>
      </div>

      {/* Floating TOC */}
      <aside className="notion-toc">
        <div className="toc-title">On this page</div>
        <nav>
          <a href="#getting-started">Overview & Architecture</a>
          <a href="#curation">Data Standardization</a>
          <a href="#platforms">Available Platforms</a>
          {dbTools.map(t => (
            <a key={t.id} href={`#${t.id}`} style={{ paddingLeft: '12px' }}>{t.name}</a>
          ))}
          <a href="#support">Data Inquiries</a>
        </nav>
      </aside>
    </div>
  );
};

export default DatabasesDocumentation;

