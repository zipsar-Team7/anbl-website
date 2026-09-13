import React from 'react';
import { Link } from 'react-router-dom';
import './WebToolsDocumentation.css';
import { labData } from '../../data/labData';

const { webTools } = labData;
const predTools = webTools.filter(t => t.category === 'Prediction Tool');

const PredictionsDocumentation = () => {
  return (
    <div className="notion-page fade-in">
      {/* Header */}
      <div className="notion-header">
        <div className="notion-icon-wrapper main" style={{ background: 'rgba(246, 58, 49, 0.1)', color: 'var(--red)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <h1 className="notion-title">AI Prediction Tools Documentation</h1>
        <p className="notion-description">
          Methodological documentation for ANBL's biology-informed machine learning models, Adverse Outcome Pathway (AOP) encoders, and AI formulation optimization engine.
        </p>
      </div>

      <div className="notion-content">
        {/* ML Framework */}
        <section className="notion-section" id="ml-framework">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            </span>
            Biology-Informed Predictive Modeling
          </h2>
          <p>
            ANBL's predictive architecture integrates material physicochemical descriptors with biological response pathways. Rather than treating machine learning as a black box, models map inputs through the <strong>Adverse Outcome Pathway (AOP)</strong> framework:
          </p>
          <div className="notion-callout red">
            <span className="callout-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
            </span>
            <div className="callout-text">
              <strong>Framework Pipeline:</strong> Material Properties &rarr; Exposure Microenvironment &rarr; Key Cellular Events (Apoptosis / Cytokines) &rarr; Dual Adverse Outcomes (Toxicity & Recovery).
            </div>
          </div>
        </section>

        <div className="notion-divider"></div>

        {/* 3-Tier Classification */}
        <section className="notion-section" id="classification-tiers">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </span>
            3-Tier Biosafety & Recovery Thresholds
          </h2>
          <p>
            Dual-target neural predictions output probability distributions mapped to clinically grounded 3-tier risk categories:
          </p>
          <ul className="notion-list">
            <li>
              <strong style={{ color: '#22c55e' }}>SAFE / High Recovery (&ge; 60%):</strong> Low predicted hazard risk, favorable biocompatibility, and high potential to support neural regenerative recovery.
            </li>
            <li>
              <strong style={{ color: '#f59e0b' }}>MODERATE RISK / Moderate Recovery (40% &ndash; 59.9%):</strong> Borderline outcome indicating potential sub-lethal stress or partial recovery response; formulation optimization is recommended.
            </li>
            <li>
              <strong style={{ color: '#ef4444' }}>TOXIC / Poor Recovery (&lt; 40%):</strong> High hazard risk and severe cytotoxicity or failure to facilitate therapeutic recovery.
            </li>
          </ul>
        </section>

        <div className="notion-divider"></div>

        {/* AI Optimization Engine */}
        <section className="notion-section" id="optimization-engine">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            </span>
            AI Formulation Optimization Engine
          </h2>
          <p>
            When any formulation displays elevated toxicity or poor recovery, the platform activates a <strong>Dual-Engine Optimization System</strong>:
          </p>
          <ul className="notion-list">
            <li><strong>🧠 Gemini AI Engine:</strong> Uses advanced LLM reasoning to evaluate all 21 inputs against predicted toxicity drivers and proposes specific parameter adjustments with scientific justification.</li>
            <li><strong>🛡️ Rule-Based Fallback Engine:</strong> A robust, deterministic expert system that verifies electrostatic zeta charge, size thresholds (60&ndash;180 nm), nanoparticle and stimulant concentrations, and apoptosis signaling to guarantee recommendations even during API limits or offline modes.</li>
          </ul>
        </section>

        <div className="notion-divider"></div>

        {/* Prediction Tools List */}
        <section className="notion-section" id="tools">
          <h2 className="notion-h2">
            <span className="h-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </span>
            Available Prediction Tools
          </h2>
          
          <div className="notion-tools-list">
            {predTools.map((tool) => (
              <div key={tool.id} id={tool.id} className="notion-tool-doc">
                <div className="notion-tool-header-row">
                  <div className="doc-tool-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                      <line x1="12" y1="22.08" x2="12" y2="12"></line>
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
                  <h4 className="notion-h4">Key Features & Metrics</h4>
                  <ul className="notion-list">
                    <li>Real-time ONNX & XGBoost ML inference.</li>
                    <li>Layered ROC curves (Full, Baseline, Material-Only, Biology-Only) with AUROC scores.</li>
                    <li>Live formulation optimization tweaks with scientific rationales.</li>
                  </ul>
                  <div style={{ marginTop: '16px' }}>
                    <Link to={tool.link} className="btn btn-red btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Launch {tool.name} &rarr;
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
            Collaboration & Custom Modeling
          </h2>
          <p>
            For collaborative predictive modeling projects, API integrations, or training models on proprietary institutional datasets, please contact:
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
          <a href="#ml-framework">Biology-Informed ML</a>
          <a href="#classification-tiers">3-Tier Classification</a>
          <a href="#optimization-engine">AI Optimization Engine</a>
          <a href="#tools">Available Prediction Tools</a>
          {predTools.map(t => (
            <a key={t.id} href={`#${t.id}`} style={{ paddingLeft: '12px' }}>{t.name}</a>
          ))}
          <a href="#support">Collaboration</a>
        </nav>
      </aside>
    </div>
  );
};

export default PredictionsDocumentation;

