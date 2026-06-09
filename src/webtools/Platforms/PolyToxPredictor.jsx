import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../config/api';
import './PolyToxPredictor.css';

const DEFAULT_INPUTS = {
  synthesis: 'Double emulsion solvent evaporation',
  polymers: 'Polymers',
  polymer_type: 'PLGA',
  functional_group: 'No functional group',
  core_size: 110,
  shape: 'Sphere',
  pdi: 0.15,
  hydro_size: 130,
  charge: -15
};

const PolyToxPredictor = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info', id: 0 });

  // Dynamic dropdown options loaded from API
  const [options, setOptions] = useState({
    synthesis: [
      'Double emulsion solvent evaporation',
      'Nanoprecipitation',
      'Ionic gelation method',
      'Solvent evaporation method',
      'Self-assembly',
      'Not reported'
    ],
    polymers: ['Polymers', '0'],
    polymer_type: [
      'PLGA',
      'Chitosan',
      'PEG-PLGA',
      'PCL',
      'PLA-PEG',
      'mPEG-PLGA',
      'Dendrimers'
    ],
    functional_group: [
      'No functional group',
      'PEG',
      'Dopamine',
      'Rivastigmine',
      'Donepezil',
      'Curcumin',
      'Not reported'
    ],
    shape: ['Sphere', 'Spherical', 'irregular', 'round', 'Not reported']
  });

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show, toast.id]);

  // Fetch unique options from search filters on mount to populate dropdowns dynamically
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.POLYTOX_FILTERS);
        if (!response.ok) throw new Error('Failed to load filter options');
        const res = await response.json();

        if (res.status === 'success' && res.data && res.data.categorical) {
          const cat = res.data.categorical;
          setOptions({
            synthesis: cat.Synthesis_method?.length ? cat.Synthesis_method : options.synthesis,
            polymers: cat.Polymers?.length ? cat.Polymers : options.polymers,
            polymer_type: cat.Polymer_type?.length ? cat.Polymer_type : options.polymer_type,
            functional_group: cat.Material_2?.length ? cat.Material_2 : options.functional_group,
            shape: cat.Shape?.length ? cat.Shape : options.shape
          });
        }
      } catch (err) {
        console.warn('Could not load dynamic dropdowns from filters API, using default static options.', err);
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (field, val) => {
    setInputs(prev => ({
      ...prev,
      [field]: val
    }));
  };

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setResult(null);
    showToast('Parameters reset to model baseline values.', 'success');
  };

  const runPrediction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    showToast('Calculating toxicity prediction...', 'info');

    try {
      const response = await fetch(API_ENDPOINTS.POLYTOX_PREDICT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      if (!response.ok) throw new Error('API server error');
      const res = await response.json();

      if (res.status === 'success') {
        // Delay slightly for visual effect
        setTimeout(() => {
          setResult(res.data);
          setLoading(false);
          showToast('Toxicity report generated successfully.', 'success');
        }, 800);
      } else {
        throw new Error(res.message || 'Prediction failed');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      showToast(err.message || 'Connection failed', 'error');
    }
  };

  // Convert viability to speedometer pointer angle (0% -> -90deg, 100% -> 90deg)
  const getNeedleRotation = (viability) => {
    const pct = Math.max(0, Math.min(100, viability));
    const degrees = (pct / 100) * 180 - 90;
    return `rotate(${degrees}deg)`;
  };

  return (
    <div className="polytox-predictor-page fade-in">
      {toast.show && (
        <div key={toast.id} className={`toast-notification ${toast.type}`}>
          {toast.type === 'success' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          )}
          {toast.type === 'info' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          )}
          {toast.type === 'error' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="toast-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* LEFT COLUMN: Input Form Sidebar */}
      <aside className="predictor-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-header-title-row">
            <h2 className="sidebar-title">Prediction Inputs</h2>
          </div>
        </div>
        <form onSubmit={runPrediction} className="predictor-form">

          {/* Categoricals */}
          <div className="form-group">
            <label>Synthesis Method</label>
            <select
              value={inputs.synthesis}
              onChange={(e) => handleInputChange('synthesis', e.target.value)}
            >
              {options.synthesis.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Polymers</label>
              <select
                value={inputs.polymers}
                onChange={(e) => handleInputChange('polymers', e.target.value)}
              >
                {options.polymers.map(opt => <option key={opt} value={opt}>{opt === '0' ? 'No Polymers' : opt}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Polymer Type</label>
              <select
                value={inputs.polymer_type}
                onChange={(e) => handleInputChange('polymer_type', e.target.value)}
              >
                {options.polymer_type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Functional Group (Material 2)</label>
              <select
                value={inputs.functional_group}
                onChange={(e) => handleInputChange('functional_group', e.target.value)}
              >
                {options.functional_group.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Shape</label>
              <select
                value={inputs.shape}
                onChange={(e) => handleInputChange('shape', e.target.value)}
              >
                {options.shape.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
          </div>

          <div className="form-divider"></div>

          {/* Numericals */}
          <div className="form-group">
            <div className="slider-label-row">
              <label>Core size (nm)</label>
              <span className="slider-bubble">{inputs.core_size} nm</span>
            </div>
            <div className="slider-wrapper">
              <input
                type="range" min="1" max="1000" step="1"
                value={inputs.core_size}
                onChange={(e) => handleInputChange('core_size', Number(e.target.value))}
              />
              <input
                type="number" className="slider-num-input"
                value={inputs.core_size}
                onChange={(e) => handleInputChange('core_size', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="slider-label-row">
              <label>PDI (Polydispersity Index)</label>
              <span className="slider-bubble">{inputs.pdi}</span>
            </div>
            <div className="slider-wrapper">
              <input
                type="range" min="0" max="1" step="0.01"
                value={inputs.pdi}
                onChange={(e) => handleInputChange('pdi', Number(e.target.value))}
              />
              <input
                type="number" className="slider-num-input"
                value={inputs.pdi}
                onChange={(e) => handleInputChange('pdi', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="slider-label-row">
              <label>Hydrodynamic size (nm)</label>
              <span className="slider-bubble">{inputs.hydro_size} nm</span>
            </div>
            <div className="slider-wrapper">
              <input
                type="range" min="1" max="2000" step="1"
                value={inputs.hydro_size}
                onChange={(e) => handleInputChange('hydro_size', Number(e.target.value))}
              />
              <input
                type="number" className="slider-num-input"
                value={inputs.hydro_size}
                onChange={(e) => handleInputChange('hydro_size', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="slider-label-row">
              <label>Surface charge in water (mV)</label>
              <span className="slider-bubble">{inputs.charge} mV</span>
            </div>
            <div className="slider-wrapper">
              <input
                type="range" min="-100" max="100" step="1"
                value={inputs.charge}
                onChange={(e) => handleInputChange('charge', Number(e.target.value))}
              />
              <input
                type="number" className="slider-num-input"
                value={inputs.charge}
                onChange={(e) => handleInputChange('charge', Number(e.target.value))}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="btn btn-red btn-submit-predict" disabled={loading}>
              {loading ? 'Running AI Model...' : 'Run Prediction'}
            </button>
          </div>
        </form>
      </aside>

      {/* RIGHT COLUMN: Results Dashboard */}
      <section className="predictor-results-content">
        {/* HEADER */}
        <header className="predictor-header">
          <div className="header-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 className="minimal-title">PolyTox AI Predictor</h1>
              <span className="badge badge-red">XGBoost Native</span>
            </div>
            <p className="minimal-subtitle">
              Estimate nanoparticle safety profile and cell viability based on physicochemical and exposure descriptors.
            </p>
          </div>
        </header>

        {loading && (
          <div className="prediction-loading-state fade-in">
            <div className="loading-logo-spin"></div>
            <h3>Analyzing Nanoparticle Safety...</h3>
            <p>Passing 9 parameters into XGBoost and compiling prediction reports.</p>
          </div>
        )}

        {!loading && !result && (
          <div className="prediction-empty-state fade-in">
            <div className="pulse-radar-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
            </div>
            <h3>Ready to Predict</h3>
            <p>Adjust nanoparticle descriptors on the left, then click <strong>Run Prediction</strong> to generate AI toxicity reports.</p>
          </div>
        )}

        {!loading && result && (
          <div className="prediction-results-active fade-in">

            {/* TOP CARDS ROW */}
            <div className="results-top-cards">

              {/* CARD 1: Safety status */}
              <div className={`result-card-small border-${result.predictionLabel.toLowerCase()}`}>
                <h4 className="card-label">Safety Prediction</h4>
                <div className="card-status-row">
                  <span className={`status-icon icon-${result.predictionLabel.toLowerCase()}`}>
                    {result.predictionLabel === 'Biosafe' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 11 11 13 15 9" />
                      </svg>
                    ) : result.predictionLabel === 'Moderate' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    )}
                  </span>
                  <span className={`status-text text-${result.predictionLabel.toLowerCase()}`}>
                    {result.predictionLabel === 'Biosafe' ? 'SAFE' : result.predictionLabel === 'Moderate' ? 'MODERATE' : 'TOXIC'}
                  </span>
                </div>
                <p className="card-sub">{result.predictionLabel === 'Biosafe' ? 'Low risk predicted' : result.predictionLabel === 'Moderate' ? 'Moderate hazard risk' : 'High hazard risk predicted'}</p>
              </div>

              {/* CARD 2: Toxicity Class */}
              <div className={`result-card-small border-${result.predictionLabel.toLowerCase()}`}>
                <h4 className="card-label">Toxicity Class</h4>
                <div className="card-status-row">
                  <span className={`status-icon icon-${result.predictionLabel.toLowerCase()}`}>
                    {result.predictionLabel === 'Biosafe' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12M12 3v7M10 10l-5.6 9.3c-.9 1.5.2 3.7 2 3.7h11.2c1.8 0 2.9-2.2 2-3.7L14 10V3" />
                      </svg>
                    ) : result.predictionLabel === 'Moderate' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12M12 3v7M10 10l-5.6 9.3c-.9 1.5.2 3.7 2 3.7h11.2c1.8 0 2.9-2.2 2-3.7L14 10V3" />
                        <line x1="12" y1="13" x2="12" y2="17" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 3h12M10 10l-5.6 9.3c-.9 1.5.2 3.7 2 3.7h11.2c1.8 0 2.9-2.2 2-3.7L14 10V3" />
                        <path d="M3 11h18M12 3v7" />
                      </svg>
                    )}
                  </span>
                  <span className={`status-text text-${result.predictionLabel.toLowerCase()}`}>
                    {result.predictionLabel === 'Biosafe' ? 'No Toxicity' : result.predictionLabel === 'Moderate' ? 'Moderate Tox' : 'Severe Toxicity'}
                  </span>
                </div>
                <p className="card-sub">Estimated using XGBoost classifier</p>
              </div>
            </div>

            {/* MIDDLE CARD: Speedometer Viability Gauge */}
            <div className="result-card-large gauge-container-card">
              <h4 className="card-label">Viability Details</h4>

              <div className="gauge-split-layout">
                {/* Left Column: Gauge */}
                <div className="gauge-left-col">
                  <div className="gauge-visual-box">
                    <div className="gauge-svg-wrapper">
                      <svg viewBox="0 0 200 100" className="speedometer-svg">
                        <defs>
                          <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff4b4b" />
                            <stop offset="50%" stopColor="#ffa500" />
                            <stop offset="100%" stopColor="#00cc44" />
                          </linearGradient>
                        </defs>
                        {/* Background Arc */}
                        <path
                          d="M20 90 A80 80 0 0 1 180 90"
                          fill="none"
                          stroke="#e5e5ea"
                          strokeWidth="16"
                          strokeLinecap="round"
                        />
                        {/* Colored Indicator Arc */}
                        <path
                          d="M20 90 A80 80 0 0 1 180 90"
                          fill="none"
                          stroke="url(#gauge-grad)"
                          strokeWidth="16"
                          strokeLinecap="round"
                        />

                        {/* Needle Pointer */}
                        <line
                          x1="100" y1="90"
                          x2="100" y2="25"
                          stroke="#1d1d1f"
                          strokeWidth="4"
                          strokeLinecap="round"
                          style={{
                            transform: getNeedleRotation(result.estimatedViability),
                            transformOrigin: '100px 90px',
                            transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
                        />
                        <circle cx="100" cy="90" r="8" fill="#1d1d1f" />
                      </svg>
                    </div>

                    <div className="gauge-range-labels">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Numbers and Model Confidence */}
                <div className="gauge-right-col">
                  <div className="gauge-digital-stats">
                    <span className="gauge-percent-text">{result.estimatedViability}%</span>
                    <span className="gauge-label-sub">Predicted Cell Viability</span>
                  </div>

                  <div className="confidence-meter-container">
                    <div className="meter-label-row">
                      <span>Model Prediction Confidence</span>
                      <strong>{(result.confidence * 100).toFixed(1)}%</strong>
                    </div>
                    <div className="meter-track">
                      <div
                        className={`meter-bar fill-${result.predictionLabel.toLowerCase()}`}
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM CARD: SHAP Feature Importance Bars */}
            <div className="result-card-large shap-container-card">
              <h4 className="card-label">SHAP Summary Plot (Top Features)</h4>
              <p className="card-sub-p">Local feature contribution to final predicted toxicity score.</p>

              <div className="shap-plot-axis-header">
                <span className="axis-label-left">◀ Decrease toxicity</span>
                <span className="axis-label-right">Increase toxicity ▶</span>
              </div>

              <div className="shap-features-list">
                {result.featureImpacts.slice(0, 6).map((impact) => {
                  const absVal = Math.abs(impact.shapValue);
                  const isPositive = impact.shapValue >= 0;

                  // Scale values for bars display (max absolute SHAP is typically around 0.5)
                  const barPercent = Math.min(100, (absVal / 0.5) * 100);

                  return (
                    <div key={impact.feature} className="shap-feature-row">
                      <div className="shap-feature-name-col">
                        <span className="shap-feature-name" title={impact.feature}>{impact.feature}</span>
                        <span className="shap-feature-val-sub">({impact.value})</span>
                      </div>

                      <div className="shap-bar-track-col">
                        <div className="center-axis-line"></div>
                        {isPositive ? (
                          <div className="shap-bar-right-wrapper" style={{ width: '50%' }}>
                            <div
                              className="shap-bar bar-positive"
                              style={{ width: `${barPercent}%` }}
                            />
                            <span
                              className="shap-score-label positive-label"
                              style={{ left: `calc(${barPercent}% + 6px)` }}
                            >
                              +{impact.shapValue}
                            </span>
                          </div>
                        ) : (
                          <div className="shap-bar-left-wrapper" style={{ width: '50%' }}>
                            <div
                              className="shap-bar bar-negative"
                              style={{ width: `${barPercent}%` }}
                            />
                            <span
                              className="shap-score-label negative-label"
                              style={{ right: `calc(${barPercent}% + 6px)` }}
                            >
                              {impact.shapValue}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="shap-footer-info">
                <span>SHAP value (impact on toxicity)</span>
              </div>
            </div>

          </div>
        )}

      </section>
    </div>
  );
};

export default PolyToxPredictor;
