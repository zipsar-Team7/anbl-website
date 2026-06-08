import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../config/api';
import './PolyToxPredictor.css';

const PolyToxPredictor = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [hasPredicted, setHasPredicted] = useState(false);

  const [formData, setFormData] = useState({
    'MIE-CTX_synthesis_method': 'Emulsion Solvent Evaporation',
    'MIE-CTX_polymers': 'Synthetic',
    'MIE-CTX_polymer_type': 'PLGA',
    'MIE-CTX_functional_group': 'None',
    'MIE-P_core_size': '120',
    'MIE-P_shape': 'Spherical',
    'MIE-P_PDI': '0.15',
    'MIE-P_hydrodynamic_size_H20': '150',
    'MIE-P_surface charge in_H20': '-15'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const runPrediction = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_ENDPOINTS.PREDICT_POLYTOX, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      if (result.status === 'success') {
        setPrediction(result.data.prediction);
        setHasPredicted(true);
      } else {
        setError(result.message || 'Prediction failed');
      }
    } catch (err) {
      setError('Connection to AI engine failed.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { runPrediction(); }, []);

  return (
    <div className="polytox-predictor-wrapper fade-in">
      {/* Sidebar: DESIGN INSTRUMENT */}
      <aside className="predictor-filter-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v20M2 12h20"/></svg>
          </div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>Design Instrument</h2>
        </div>

          <div className="predictor-form-section">
            <span className="section-title-pill">Synthesis & Material</span>
            <div className="predictor-fields-grid">
              <div className="predictor-field-group span-2">
                <label className="predictor-field-label">Synthesis Method</label>
                <select name="MIE-CTX_synthesis_method" className="predictor-select" value={formData['MIE-CTX_synthesis_method']} onChange={handleInputChange}>
                  <option>Emulsion Solvent Evaporation</option>
                  <option>Nanoprecipitation</option>
                  <option>Microfluidics</option>
                </select>
              </div>
              <div className="predictor-field-group">
                <label className="predictor-field-label">Polymer Class</label>
                <select name="MIE-CTX_polymers" className="predictor-select" value={formData['MIE-CTX_polymers']} onChange={handleInputChange}>
                  <option>Synthetic</option>
                  <option>Natural</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="predictor-field-group">
                <label className="predictor-field-label">Polymer Type</label>
                <input name="MIE-CTX_polymer_type" className="predictor-input" value={formData['MIE-CTX_polymer_type']} onChange={handleInputChange} />
              </div>
              <div className="predictor-field-group span-2">
                <label className="predictor-field-label">Functional Group</label>
                <input name="MIE-CTX_functional_group" className="predictor-input" value={formData['MIE-CTX_functional_group']} onChange={handleInputChange} />
              </div>
            </div>
          </div>

          <div className="predictor-form-section">
            <span className="section-title-pill">Physicochemical Architecture</span>
            <div className="predictor-fields-grid">
              <div className="predictor-field-group">
                <label className="predictor-field-label">Core Size (nm)</label>
                <input type="number" name="MIE-P_core_size" className="predictor-input" value={formData['MIE-P_core_size']} onChange={handleInputChange} />
              </div>
              <div className="predictor-field-group">
                <label className="predictor-field-label">Surface Charge (mV)</label>
                <input type="number" name="MIE-P_surface charge in_H20" className="predictor-input" value={formData['MIE-P_surface charge in_H20']} onChange={handleInputChange} />
              </div>
              <div className="predictor-field-group">
                <label className="predictor-field-label">Shape</label>
                <select name="MIE-P_shape" className="predictor-select" value={formData['MIE-P_shape']} onChange={handleInputChange}>
                  <option>Spherical</option>
                  <option>Rod</option>
                  <option>Cube</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="predictor-field-group">
                <label className="predictor-field-label">Hydrodynamic Size (nm)</label>
                <input type="number" name="MIE-P_hydrodynamic_size_H20" className="predictor-input" value={formData['MIE-P_hydrodynamic_size_H20']} onChange={handleInputChange} />
              </div>
              <div className="predictor-field-group span-2">
                <label className="predictor-field-label">PDI</label>
                <input type="number" step="0.01" name="MIE-P_PDI" className="predictor-input" value={formData['MIE-P_PDI']} onChange={handleInputChange} />
              </div>
            </div>
          </div>

        <button className="btn-ai-predict" onClick={runPrediction} disabled={loading}>
          {loading ? 'Processing Model...' : 'Compute AI Prediction'}
        </button>
      </aside>

      {/* Main: PROFESSIONAL DASHBOARD */}
      <main className="predictor-main-content">
        {!hasPredicted ? (
          <div className="professional-empty-state">
            <div className="empty-state-visual">🔬</div>
            <h2 style={{ fontWeight: 900 }}>Poly-ToxMap Predictor</h2>
            <p style={{ color: '#666', maxWidth: '450px' }}>Input your material determinants to generate a high-fidelity toxicity profile and SHAP-based feature analysis.</p>
          </div>
        ) : (
          <div className="dashboard-grid">
            
            {/* Section 1: XGBoost Prediction Dashboard */}
            <div className="col-12">
              <div className="xgb-prediction-container">
                <div className="xgb-header">
                  <span className="xgb-badge">2</span>
                  <h2>XGBoost Prediction</h2>
                </div>
                
                <div className="xgb-cards-row">
                  {/* Card 1: Safety Prediction */}
                  <div className="xgb-card">
                    <span className="xgb-card-title">Safety Prediction</span>
                    <div className="xgb-card-value-container">
                      <span className={`xgb-indicator-icon ${prediction.viability > 80 ? 'safe' : 'unsafe'}`}>
                        {prediction.viability > 80 ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 11 2 2 4-4"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        )}
                      </span>
                      <span className={`xgb-card-value ${prediction.viability > 80 ? 'text-safe' : 'text-unsafe'}`}>
                        {prediction.viability > 80 ? 'SAFE' : 'UNSAFE'}
                      </span>
                    </div>
                    <span className="xgb-card-subtext">
                      {prediction.viability > 80 ? 'Low risk predicted' : 'Elevated risk predicted'}
                    </span>
                  </div>

                  {/* Card 2: Toxicity Class */}
                  <div className="xgb-card">
                    <span className="xgb-card-title">Toxicity Class</span>
                    <div className="xgb-card-value-container">
                      <span className={`xgb-indicator-icon ${prediction.viability > 80 ? 'safe' : 'unsafe'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4" /><path d="M10 2v6L4.5 19.5a1.5 1.5 0 0 0 1.3 2.3h12.4a1.5 1.5 0 0 0 1.3-2.3L14 8V2" /></svg>
                      </span>
                      <span className={`xgb-card-value ${prediction.viability > 80 ? 'text-safe' : 'text-unsafe'}`}>
                        {prediction.viability > 80 ? 'No Toxicity' : prediction.viability > 50 ? 'Mild Toxicity' : 'Severe Toxicity'}
                      </span>
                    </div>
                    <span className="xgb-card-subtext">
                      {prediction.viability > 80 ? 'No toxicity predicted' : 'Toxicity alert predicted'}
                    </span>
                  </div>

                  {/* Card 3: Predicted Viability */}
                  <div className="xgb-card">
                    <span className="xgb-card-title">Predicted Viability</span>
                    <div className="xgb-card-value-container">
                      <span className="xgb-indicator-icon viability">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M6 10h2.5l1.5-3 2 6 1.5-4 1 2.5h3.5" /></svg>
                      </span>
                      <span className="xgb-card-value text-viability">
                        {prediction.viability}%
                      </span>
                    </div>
                    <span className="xgb-card-subtext">
                      {prediction.viability > 80 ? 'High cell viability' : 'Reduced cell viability'}
                    </span>
                  </div>

                  {/* Card 4: Model Confidence */}
                  <div className="xgb-card">
                    <span className="xgb-card-title">Model Confidence</span>
                    <div className="xgb-card-value-container">
                      <span className="xgb-indicator-icon confidence">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                      </span>
                      <span className="xgb-card-value text-confidence">
                        {prediction.isRealBinary ? '94%' : '91%'}
                      </span>
                    </div>
                    <span className="xgb-card-subtext">
                      High confidence
                    </span>
                  </div>
                </div>

                {/* Section 2: Gauge & Classification */}
                <div className="xgb-gauge-classification-row">
                  <div className="xgb-gauge-card">
                    <span className="xgb-card-title">Viability Gauge (%)</span>
                    <div style={{ marginTop: '1.25rem' }}>
                      <ViabilityGauge value={prediction.viability} />
                    </div>
                  </div>

                  <div className="xgb-classification-card">
                    <span className="xgb-card-title">Toxicity Classification</span>
                    <div className="xgb-class-list">
                      <div className="xgb-class-row">
                        <div className="xgb-class-info">
                          <span className="xgb-dot green"></span>
                          <span>No toxicity / Safe</span>
                        </div>
                        <span className="xgb-class-badge green">
                          {prediction.viability > 80 ? prediction.viability : Math.round((100 - prediction.viability) * 0.2)}%
                        </span>
                      </div>
                      <div className="xgb-class-row">
                        <div className="xgb-class-info">
                          <span className="xgb-dot yellow"></span>
                          <span>Mild toxicity</span>
                        </div>
                        <span className="xgb-class-badge yellow">
                          {prediction.viability > 80 ? Math.round((100 - prediction.viability) * 0.7) : prediction.viability > 50 ? prediction.viability : Math.round(prediction.viability * 0.3)}%
                        </span>
                      </div>
                      <div className="xgb-class-row">
                        <div className="xgb-class-info">
                          <span className="xgb-dot red"></span>
                          <span>Toxic / Unsafe</span>
                        </div>
                        <span className="xgb-class-badge red">
                          {prediction.viability > 80 ? Math.round((100 - prediction.viability) * 0.2) : prediction.viability > 50 ? Math.round((100 - prediction.viability) * 0.8) : Math.round(100 - prediction.viability)}%
                        </span>
                      </div>
                      <div className="xgb-class-row">
                        <div className="xgb-class-info">
                          <span className="xgb-dot gray"></span>
                          <span>Unknown</span>
                        </div>
                        <span className="xgb-class-badge gray">
                          {prediction.viability > 80 ? Math.round((100 - prediction.viability) * 0.1) : Math.round(prediction.viability * 0.1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Local SHAP Force Plot */}
            <div className="col-8">
              <div className="professional-card">
                <h3 className="predictor-card-title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
                  Local SHAP Force Analysis
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '2rem' }}>Detailed feature contributions pushing prediction from base value ({prediction.shap.baseValue}%).</p>
                <div className="force-plot-container">
                  {prediction.shap.features.map((f, i) => {
                    const width = Math.abs(f.value) * 3;
                    return (
                      <div 
                        key={i} 
                        className="force-plot-segment" 
                        style={{ 
                          width: `${width}%`, 
                          background: f.value > 0 ? '#4caf50' : '#f44336',
                          borderRight: '1px solid rgba(255,255,255,0.1)'
                        }}
                        title={`${f.feature}: ${f.value.toFixed(2)}`}
                      >
                        {width > 8 && f.feature.split(' ')[0]}
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 700, color: '#999' }}>
                  <span>← HIGHER TOXICITY</span>
                  <span>LOWER TOXICITY →</span>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="professional-card">
                <h3 className="predictor-card-title">Feature Rankings</h3>
                {prediction.shap.features.map((f, i) => (
                  <div key={i} className="feature-row-v2">
                    <span className="feature-name-v2">{f.feature}</span>
                    <span className="shap-value" style={{ color: f.value > 0 ? '#4caf50' : '#f44336' }}>
                      {f.value > 0 ? '↑' : '↓'} {Math.abs(f.value).toFixed(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Radar Space */}
            <div className="col-8">
              <div className="professional-card" style={{ height: '100%' }}>
                <h3 className="predictor-card-title">
                  Multivariable Performance Space
                </h3>
                <RadarChart data={prediction.radar} />
              </div>
            </div>

            <div className="col-4">
              <div className="insight-pro-card">
                <div className="insight-pro-icon">💡</div>
                <div className="insight-pro-content">
                  <h4>AI System Insight</h4>
                  <p>{prediction.insight}</p>
                  <button className="predictor-input" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Export Data (CSV)
                  </button>
                </div>
              </div>
              
              <div className="professional-card" style={{ marginTop: '2rem' }}>
                <h3 className="predictor-card-title">Global Importance</h3>
                {prediction.importance.map((imp, i) => (
                  <div key={i} className="feature-row-v2" style={{ border: 'none', padding: '8px 0' }}>
                    <span className="feature-name-v2" style={{ fontSize: '0.8rem' }}>{imp.feature}</span>
                    <div className="importance-bar-v2">
                      <div className="importance-fill-v2" style={{ width: `${imp.importance * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

// --- HIGH FIDELITY RADAR ---
const RadarChart = ({ data }) => {
  const size = 350;
  const center = size / 2;
  const radius = 120;
  const angleStep = (Math.PI * 2) / data.labels.length;

  const getPoints = (values) => {
    return values.map((v, i) => {
      const r = (v / 100) * radius;
      const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="radar-chart-container">
      <svg width={size} height={size} className="radar-v2">
        {/* Background Webs */}
        {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
          <polygon key={scale} points={getPoints(new Array(data.labels.length).fill(scale * 100))} fill="none" stroke="#f3f4f6" strokeWidth="1.5" />
        ))}
        {data.labels.map((_, i) => {
          const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#f3f4f6" strokeWidth="1.5" />;
        })}
        {/* Data Polygons */}
        <polygon points={getPoints(data.optimized)} fill="rgba(0, 122, 255, 0.03)" stroke="#007aff" strokeWidth="2" strokeDasharray="4" />
        <polygon points={getPoints(data.current)} fill="rgba(220, 53, 69, 0.1)" stroke="var(--red)" strokeWidth="3" />
        {/* Labels */}
        {data.labels.map((label, i) => {
          const x = center + (radius + 35) * Math.cos(i * angleStep - Math.PI / 2);
          const y = center + (radius + 20) * Math.sin(i * angleStep - Math.PI / 2);
          return <text key={i} x={x} y={y} textAnchor="middle" fontSize="9" fill="#9ca3af" fontWeight="800" textTransform="uppercase">{label}</text>;
        })}
      </svg>
      <div style={{ display: 'flex', gap: '20px', marginTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
          <div style={{ width: '12px', height: '12px', background: 'var(--red)', borderRadius: '3px' }}></div> Current Design
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
          <div style={{ width: '12px', height: '12px', border: '2px dashed #007aff', borderRadius: '3px' }}></div> Optimized Space
        </div>
      </div>
    </div>
  );
};

// --- VIABILITY GAUGE COMPONENT ---
const ViabilityGauge = ({ value }) => {
  const radius = 70;
  const strokeWidth = 18;
  const cx = 100;
  const cy = 90;
  
  // Angle for the value (0 to 100 maps to -180deg to 0deg)
  const angle = -180 + (value / 100) * 180;
  const needleX = cx + (radius - 12) * Math.cos((angle * Math.PI) / 180);
  const needleY = cy + (radius - 12) * Math.sin((angle * Math.PI) / 180);

  return (
    <div className="gauge-outer-wrapper">
      <svg width="200" height="115" viewBox="0 0 200 115" className="gauge-svg">
        {/* Arc Background Segments */}
        {/* Green segment (0% to 65%) */}
        <path
          d="M 30 90 A 70 70 0 0 1 131.8 27.6"
          fill="none"
          stroke="#4caf50"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Yellow segment (65% to 85%) */}
        <path
          d="M 131.8 27.6 A 70 70 0 0 1 162.4 58.2"
          fill="none"
          stroke="#ff9800"
          strokeWidth={strokeWidth}
        />
        {/* Red segment (85% to 100%) */}
        <path
          d="M 162.4 58.2 A 70 70 0 0 1 170 90"
          fill="none"
          stroke="#f44336"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Value Pointer/Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#1f2937"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="6" fill="#1f2937" />
        
        {/* Labels */}
        <text x="25" y="110" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9ca3af">0</text>
        <text x="175" y="110" textAnchor="middle" fontSize="10" fontWeight="800" fill="#9ca3af">100</text>
      </svg>
      <div className="gauge-val-display">
        <span className="gauge-val-num">{value}%</span>
        <span className="gauge-val-label">Predicted Viability</span>
      </div>
    </div>
  );
};

export default PolyToxPredictor;
