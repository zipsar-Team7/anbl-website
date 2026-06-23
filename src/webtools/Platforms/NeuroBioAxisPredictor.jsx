import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, Cell
} from 'recharts';
import './NeuroBioAxisPredictor.css';
import { API_ENDPOINTS } from '../../config/api';

const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (opt) => {
    onChange(opt);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-container" ref={containerRef}>
      <div className={`custom-select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span title={value || placeholder}>{value || placeholder}</span>
        <span className="custom-select-arrow"></span>
      </div>
      {isOpen && (
        <ul className="custom-select-options">
          {options.map(opt => (
            <li key={opt} className={`custom-select-option ${opt === value ? 'selected' : ''}`} onClick={() => handleSelect(opt)}>
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const CustomTooltip = ({ active, payload, label, labelFormatter, valueFormatter }) => {
  if (active && payload && payload.length) {
    return (
      <div className="premium-tooltip-container">
        {labelFormatter && <div className="tooltip-label">{labelFormatter(label)}</div>}
        {payload.map((item, index) => (
          <div key={index} className="tooltip-item">
            <span className="tooltip-dot" style={{ backgroundColor: item.color || item.payload.fill || '#F63A31' }}></span>
            <span className="tooltip-name">{item.name || 'Value'}:</span>
            <span className="tooltip-value">
              {valueFormatter ? valueFormatter(item.value) : item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const DEFAULT_INPUTS = {
  MIE_P_M_Type: 'Inorganic', MIE_P_Size_nm: 150, MIE_P_Shape: 'Sphere', MIE_P_Agglomeration: 'No', MIE_P_Zeta_potential: 'Negative',
  MIE_E_Cell_Type: 'Glial', MIE_E_NPs_Conc: 50, MIE_E_Stimulant: 'Inflammatory stimuli', MIE_E_Stimulant_Conc: 10, MIE_E_C_uptake: 'Low',
  MIE_E_Organism: 'Small rodents', MIE_E_Sex: 'Female', MIE_E_Age_Weeks: 8, MIE_E_Weight_g: 25, MIE_E_NPs_Dose: 10, MIE_E_Dose_Regimen: 'Multiple', MIE_E_Ad_route: 'Intravenous', MIE_E_Injury_Model: 'Spinal injury',
  KE_Pro: 'High', KE_Anti: 'Low', KE_Apoptosis: 'Low'
};

// --- DUMMY DATA FOR CHARTS ---

// ROC Data (mocked to show improvement from Baseline -> Intermediate -> Full)
const rocBaseline = [{ x: 0, y: 0 }, { x: 0.1, y: 0.4 }, { x: 0.3, y: 0.65 }, { x: 0.6, y: 0.8 }, { x: 1, y: 1 }];
const rocIntermediate = [{ x: 0, y: 0 }, { x: 0.05, y: 0.5 }, { x: 0.2, y: 0.75 }, { x: 0.5, y: 0.9 }, { x: 1, y: 1 }];
const rocFull = [{ x: 0, y: 0 }, { x: 0.02, y: 0.6 }, { x: 0.15, y: 0.85 }, { x: 0.4, y: 0.95 }, { x: 1, y: 1 }];
const chanceLine = [{ x: 0, y: 0 }, { x: 1, y: 1 }];

// Radar Data
const radarBiosafety = [
  { metric: 'Balanced Accuracy', val: 0.88, fullMark: 1.0 },
  { metric: 'PR-AUC', val: 0.82, fullMark: 1.0 },
  { metric: 'ROC-AUC', val: 0.94, fullMark: 1.0 },
  { metric: 'F1 (Macro)', val: 0.86, fullMark: 1.0 },
  { metric: 'MCC', val: 0.78, fullMark: 1.0 },
  { metric: 'Cohen\'s Kappa', val: 0.75, fullMark: 1.0 },
];

const radarRecovery = [
  { metric: 'Balanced Accuracy', val: 0.85, fullMark: 1.0 },
  { metric: 'PR-AUC', val: 0.79, fullMark: 1.0 },
  { metric: 'ROC-AUC', val: 0.91, fullMark: 1.0 },
  { metric: 'F1 (Macro)', val: 0.84, fullMark: 1.0 },
  { metric: 'MCC', val: 0.72, fullMark: 1.0 },
  { metric: 'Cohen\'s Kappa', val: 0.70, fullMark: 1.0 },
];

// SHAP Data
const shapData = [
  { name: 'Apoptosis_Low', value: 0.075 },
  { name: 'Apoptosis_High', value: 0.065 },
  { name: 'Pro_High', value: 0.058 },
  { name: 'Pro_Low', value: 0.052 },
  { name: 'M_Type_Inorganic', value: 0.045 },
  { name: 'Injury_Model_Brain', value: 0.038 },
  { name: 'Organism_Small_rodents', value: 0.032 },
  { name: 'Stimulant_NP_stimuli', value: 0.028 },
  { name: 'Age_Weeks_~0-5', value: 0.022 },
  { name: 'Injury_Model_Spinal', value: 0.018 },
  { name: 'Age_Weeks_~5-10', value: 0.015 },
  { name: 'Size_nm_~10-100', value: 0.012 },
  { name: 'Agglomeration_Yes', value: 0.010 },
  { name: 'Agglomeration_No', value: 0.008 }
].reverse(); // Reverse for bar chart layout (top to bottom)

// ------------------------------

const GaugeChart = ({ value }) => {
  const percentage = value * 100;
  const radius = 40;
  const strokeWidth = 9;

  // Needle trigonometry coordinates
  const cx = 55;
  const cy = 50;
  const L = 32; // Needle pointer length
  const rad = Math.PI * (1 - value);
  const x2 = cx + L * Math.cos(rad);
  const y2 = cy - L * Math.sin(rad);

  return (
    <div className="gauge-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '110px', height: '85px' }}>
      <svg width="110" height="65" viewBox="0 0 110 65">
        <defs>
          {/* Custom viability gradient (Red -> Orange -> Yellow -> Lime -> Green) */}
          <linearGradient id="gauge-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="25%" stopColor="#FF9500" />
            <stop offset="50%" stopColor="#FFCC00" />
            <stop offset="75%" stopColor="#8CD137" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        
        {/* Full colored rainbow arc */}
        <path
          d="M 15 50 A 40 40 0 0 1 95 50"
          fill="none"
          stroke="url(#gauge-rainbow)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        
        {/* Needle pointer pointing to value */}
        <line
          x1={cx}
          y1={cy}
          x2={x2}
          y2={y2}
          stroke="#1d1d1f"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        
        {/* Needle center pivot pivot */}
        <circle
          cx={cx}
          cy={cy}
          r="5"
          fill="#1d1d1f"
        />

        {/* 0% and 100% boundary labels */}
        <text x="15" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fill="#86868b">0%</text>
        <text x="95" y="62" textAnchor="middle" fontSize="8" fontWeight="700" fill="#86868b">100%</text>
      </svg>
      
      <div className="gauge-value" style={{ marginTop: '-4px', fontSize: '15px', fontWeight: '800', color: '#1d1d1f', letterSpacing: '-0.02em' }}>
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

const NeuroBioAxisPredictor = () => {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [suggestions, setSuggestions] = useState(null);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  const initialModes = {
    MIE_P_M_Type: false, MIE_P_Shape: false, MIE_P_Agglomeration: false, MIE_P_Zeta_potential: false,
    MIE_E_Cell_Type: false, MIE_E_Stimulant: false, MIE_E_C_uptake: false, MIE_E_Organism: false, MIE_E_Sex: false, MIE_E_Dose_Regimen: false, MIE_E_Ad_route: false, MIE_E_Injury_Model: false,
    KE_Pro: false, KE_Anti: false, KE_Apoptosis: false
  };
  const [customModes, setCustomModes] = useState(initialModes);

  const toggleCustomMode = (field, defaultOption) => {
    setCustomModes(prev => {
      const nextVal = !prev[field];
      if (!nextVal) {
        setInputs(inputsPrev => ({ ...inputsPrev, [field]: defaultOption }));
      } else {
        setInputs(inputsPrev => ({ ...inputsPrev, [field]: '' }));
      }
      return { ...prev, [field]: nextVal };
    });
  };

  const toggleAllCustomModes = () => {
    const allAreCustom = Object.values(customModes).every(v => v === true);
    const targetVal = !allAreCustom;
    const newModes = {};
    Object.keys(customModes).forEach(k => newModes[k] = targetVal);
    setCustomModes(newModes);

    setInputs(inputsPrev => {
      const updated = { ...inputsPrev };
      Object.keys(customModes).forEach(k => {
        if (!targetVal) updated[k] = DEFAULT_INPUTS[k];
        else updated[k] = '';
      });
      return updated;
    });
  };

  const handleInputChange = (field, val) => setInputs(prev => ({ ...prev, [field]: val }));
  
  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
    setCustomModes(initialModes);
    setResult(null);
    setSuggestions(null);
    setSuggestionsLoading(false);
  };

  const generateNeuroSuggestions = async (currentInputs, toxPred, recPred, toxConf, recConf) => {
    setSuggestionsLoading(true);
    setSuggestions(null);

    try {
      const response = await fetch(API_ENDPOINTS.NEURO_SUGGEST, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: currentInputs,
          toxicityPrediction: toxPred,
          recoveryPrediction: recPred,
          toxicityConfidence: toxConf,
          recoveryConfidence: recConf
        })
      });
      
      const resJson = await response.json();
      if (resJson.status === 'success') {
        setSuggestions(resJson.data);
      } else {
        console.error("Suggestions API error:", resJson.message);
      }
    } catch (err) {
      console.error("Error loading suggestions:", err);
    } finally {
      setSuggestionsLoading(false);
    }
  };

  const runPrediction = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setSuggestions(null);

    try {
      const response = await fetch(API_ENDPOINTS.NEURO_PREDICT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
      });
      
      const resultJson = await response.json();
      if (resultJson.status === 'success') {
        const { recovery, toxicity } = resultJson.data;
        setResult({ recovery, toxicity });
        generateNeuroSuggestions(inputs, toxicity.prediction, recovery.prediction, toxicity.confidence, recovery.confidence);
      } else {
        console.error("API error:", resultJson.message);
      }
    } catch (err) {
      console.error("Connection error:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderSelect = (id, label, options) => (
    <div className="nba-form-group" key={id}>
      <div className="input-header-row">
        <label>{label}</label>
        <label className="ios-switch">
          <input type="checkbox" checked={customModes[id]} onChange={() => toggleCustomMode(id, options[0])} />
          <span className="ios-switch-slider"></span>
        </label>
      </div>
      {customModes[id] ? (
        <input type="text" className="nba-input" placeholder={`Type ${label}...`} value={inputs[id]} onChange={(e) => handleInputChange(id, e.target.value)} />
      ) : (
        <CustomSelect value={inputs[id]} onChange={(val) => handleInputChange(id, val)} options={options} placeholder={`Select ${label}`} />
      )}
    </div>
  );

  const renderSlider = (id, label, min, max, unit) => (
    <div className="nba-form-group" key={id}>
      <div className="slider-label-row">
        <label>{label}</label>
        <span className="slider-bubble">{inputs[id]} {unit}</span>
      </div>
      <div className="slider-wrapper">
        <input type="range" className="nba-slider" min={min} max={max} value={inputs[id]} onChange={(e) => handleInputChange(id, Number(e.target.value))} />
        <input type="number" className="slider-num-input" value={inputs[id]} onChange={(e) => handleInputChange(id, Number(e.target.value))} />
      </div>
    </div>
  );

  const renderRocChart = (data, title, strokeColor, auroc, layer) => {
    const isFull = strokeColor === '#F63A31';
    return (
      <div className="nba-chart-card">
        <div className="chart-header-row">
          <h4 className="chart-title">{title}</h4>
          {layer && <span className="chart-layer-badge" style={isFull ? { color: '#F63A31', borderColor: 'rgba(246, 58, 49, 0.3)' } : {}}>{layer}</span>}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <filter id="premium-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#F63A31" floodOpacity="0.25" />
              </filter>
            </defs>
            <CartesianGrid stroke="#e8e8ed" strokeDasharray="3 3" vertical={false} />
            <XAxis type="number" dataKey="x" domain={[0, 1]} tick={{ fontSize: 10, fill: '#6e6e73' }} label={{ value: 'False positive rate', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#6e6e73' }} />
            <YAxis type="number" dataKey="y" domain={[0, 1]} tick={{ fontSize: 10, fill: '#6e6e73' }} label={{ value: 'True positive rate', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#6e6e73' }} />
            <RechartsTooltip 
              content={<CustomTooltip 
                labelFormatter={(lbl) => `FPR: ${typeof lbl === 'number' ? lbl.toFixed(2) : lbl}`} 
                valueFormatter={(val) => typeof val === 'number' ? val.toFixed(2) : val} 
              />}
            />
            <Line data={chanceLine} type="linear" dataKey="y" stroke="#d2d2d7" strokeDasharray="4 4" dot={false} isAnimationActive={false} />
            <Line 
              name={title} 
              data={data} 
              type="monotone" 
              dataKey="y" 
              stroke={strokeColor} 
              strokeWidth={isFull ? 3 : 1.8} 
              strokeOpacity={isFull ? 1.0 : 0.65} 
              filter={isFull ? "url(#premium-shadow)" : undefined} 
              dot={false} 
              activeDot={{ r: 4 }} 
            />
          </LineChart>
        </ResponsiveContainer>
        {auroc && (
          <div className="roc-auroc-label">
            <span>AUROC: </span>
            <strong style={isFull ? { color: '#F63A31', backgroundColor: 'rgba(246, 58, 49, 0.08)' } : {}}>
              {auroc}%
            </strong>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="nba-predictor-page fade-in">
      <aside className="nba-sidebar">
        <div className="sidebar-top-header">
          <h2>Prediction Inputs</h2>
          <div className="all-custom-toggle">
            <span>ALL CUSTOM</span>
            <label className="ios-switch">
              <input type="checkbox" checked={Object.values(customModes).every(v => v)} onChange={toggleAllCustomModes} />
              <span className="ios-switch-slider"></span>
            </label>
          </div>
        </div>

        <form onSubmit={runPrediction}>
          {/* 1. Material Properties */}
          <div className="form-section-header">
            <h3>1. MATERIAL PROPERTIES (MP)</h3>
          </div>
          <div className="form-row">
            {renderSelect('MIE_P_M_Type', 'Material Type', ['Inorganic', 'Organic', 'Carbon', 'Hybrid', 'Hydrogel', 'Other'])}
            {renderSelect('MIE_P_Shape', 'Shape', ['Sphere', 'Non-sphere'])}
            {renderSelect('MIE_P_Agglomeration', 'Agglomeration', ['No', 'Yes'])}
            {renderSelect('MIE_P_Zeta_potential', 'Zeta Potential', ['Negative', 'Positive'])}
          </div>
          {renderSlider('MIE_P_Size_nm', 'Core Size', 1, 1000, 'nm')}

          {/* 2. Experimental Conditions */}
          <div className="form-section-header">
            <h3>2. EXPERIMENTAL CONDITIONS (EC)</h3>
          </div>
          <div className="form-row">
            {renderSelect('MIE_E_Cell_Type', 'Cell Type', ['Glial', 'Neuronal', 'Primary', 'RAW 264.7', 'Other'])}
            {renderSelect('MIE_E_C_uptake', 'Cellular Uptake', ['Low', 'High'])}
            {renderSelect('MIE_E_Organism', 'Organism', ['Small rodents', 'Large mammals', 'Fish', 'Other vertebrates'])}
            {renderSelect('MIE_E_Sex', 'Sex', ['Female', 'Male', 'Both', 'Other'])}
          </div>
          
          <div className="form-row">
            {renderSelect('MIE_E_Stimulant', 'Stimulant', ['Inflammatory stimuli', 'Oxidative stress', 'Parkinsonism stimuli', 'Neurodegenrative peptide', 'Growth/DF', 'Neurotoxins', 'Ischemia models', 'Physical stimuli', 'NPs stimuli', 'Drug/metabolic modulators'])}
            {renderSelect('MIE_E_Injury_Model', 'Injury Model', ['Spinal injury', 'Brain injury', 'Peripheral nerve', 'Brain disease'])}
            {renderSelect('MIE_E_Dose_Regimen', 'Dose Regimen', ['Single', 'Multiple'])}
            {renderSelect('MIE_E_Ad_route', 'Admin Route', ['Intravenous', 'Intraperitoneal', 'Intranasal', 'Oral', 'Other'])}
          </div>

          {renderSlider('MIE_E_NPs_Conc', 'NPs Concentration', 0, 1000, 'ug/mL')}
          {renderSlider('MIE_E_Stimulant_Conc', 'Stimulant Conc.', 0, 1000, 'ug/mL')}
          
          <div className="form-row">
            {renderSlider('MIE_E_Age_Weeks', 'Age', 0, 50, 'weeks')}
            {renderSlider('MIE_E_Weight_g', 'Weight', 0, 500, 'g')}
          </div>
          {renderSlider('MIE_E_NPs_Dose', 'NPs Dose', 0, 200, 'mg/Kg')}

          {/* 3. Cellular Response */}
          <div className="form-section-header">
            <h3>3. CELLULAR RESPONSE (CR)</h3>
          </div>
          <div className="form-row">
            {renderSelect('KE_Pro', 'Pro-inflammatory', ['Low', 'High'])}
            {renderSelect('KE_Anti', 'Anti-inflammatory', ['Low', 'High'])}
          </div>
          {renderSelect('KE_Apoptosis', 'Apoptosis', ['Low', 'High'])}

          <div className="form-divider"></div>
          <div className="form-actions">
            <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
            <button type="submit" className="btn-predict" disabled={loading}>{loading ? 'Analyzing...' : 'Run Prediction'}</button>
          </div>
        </form>
      </aside>

      <section className="nba-results-content">
        {/* HEADER */}
        <header className="predictor-header">
          <div className="header-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 className="minimal-title">Neuro-Bio-Axis Predictor</h1>
              <span className="badge-red">ONNX DUAL-MODEL</span>
            </div>
            <p className="minimal-subtitle">
              Evaluate simultaneous predictions for nanomaterial recovery potential and biosafety using cross-scale predictive models.
            </p>
          </div>
        </header>

        {!loading && !result && (
          <div className="prediction-empty-state fade-in">
            <div className="pulse-radar-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
            </div>
            <h3>Ready to Predict</h3>
            <p>Adjust nanoparticle descriptors on the left, then click <strong>Run Prediction</strong> to generate AI prediction reports.</p>
          </div>
        )}

        {loading && (
          <div className="prediction-loading-state fade-in">
            <div className="loading-logo-spin"></div>
            <h3>Analyzing Nanoparticle Profiles...</h3>
            <p>Evaluating Baseline, Intermediate, and Full Mechanistic Models.</p>
          </div>
        )}

        {!loading && result && (
          <div className="prediction-results-active fade-in">
            {/* TOP CARDS ROW */}
            <div className="results-top-cards">
              {/* Card 1: Biosafety */}
              <div className={`result-card-small border-${result.toxicity.prediction === 'Good' ? 'safe' : 'danger'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 className="card-label">BIOSAFETY PREDICTION</h4>
                    <div className="card-status-row">
                      <span className={`status-icon icon-${result.toxicity.prediction === 'Good' ? 'safe' : 'danger'}`}>
                        {result.toxicity.prediction === 'Good' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11 11 13 15 9"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        )}
                      </span>
                      <span className={`status-text text-${result.toxicity.prediction === 'Good' ? 'safe' : 'danger'}`}>
                        {result.toxicity.prediction === 'Good' ? 'SAFE' : 'TOXIC'}
                      </span>
                    </div>
                    <p className="card-sub" style={{ margin: 0 }}>{result.toxicity.prediction === 'Good' ? 'Low risk predicted' : 'High hazard risk predicted'}</p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <GaugeChart value={result.toxicity.confidence} color={result.toxicity.prediction === 'Good' ? '#22c55e' : '#ef4444'} />
                  </div>
                </div>
              </div>

              {/* Card 2: Recovery */}
              <div className={`result-card-small border-${result.recovery.prediction === 'Good' ? 'safe' : 'danger'}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <h4 className="card-label">RECOVERY PREDICTION</h4>
                    <div className="card-status-row">
                      <span className={`status-icon icon-${result.recovery.prediction === 'Good' ? 'safe' : 'danger'}`}>
                        {result.recovery.prediction === 'Good' ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
                        )}
                      </span>
                      <span className={`status-text text-${result.recovery.prediction === 'Good' ? 'safe' : 'danger'}`}>
                        {result.recovery.prediction === 'Good' ? 'High Recovery' : 'Poor Recovery'}
                      </span>
                    </div>
                    <p className="card-sub" style={{ margin: 0 }}>{result.recovery.prediction === 'Good' ? 'Predicted to support positive recovery' : 'Unlikely to yield positive outcomes'}</p>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <GaugeChart value={result.recovery.confidence} color={result.recovery.prediction === 'Good' ? '#22c55e' : '#ef4444'} />
                  </div>
                </div>
              </div>
            </div>
            {/* ROC Curves Row */}
            <div className="roc-radar-row">
              {/* Left Column: Biosafety ROC */}
              <div className="roc-group">
                <h3 className="group-title">A. BIOSAFETY (TOXICITY) ROC CURVES</h3>
                <div className="roc-grid">
                  {renderRocChart(rocBaseline, 'Baseline', '#a1a1a6', 76, 'MP')}
                  {renderRocChart(rocIntermediate, 'Intermediate', '#3d3d3f', 86, 'MP+EC')}
                  {renderRocChart(rocFull, 'Full Mechanistic', '#F63A31', 94, 'MP+EC+CR')}
                </div>
                <div className="roc-watermark">
                  * Feature Layers — MP: Material Properties | EC: Experimental Conditions | CR: Cellular Response
                </div>
              </div>

              {/* Right Column: Recovery ROC */}
              <div className="roc-group">
                <h3 className="group-title">B. RECOVERY ROC CURVES</h3>
                <div className="roc-grid">
                  {renderRocChart(rocBaseline, 'Baseline', '#a1a1a6', 72, 'MP')}
                  {renderRocChart(rocIntermediate, 'Intermediate', '#3d3d3f', 81, 'MP+EC')}
                  {renderRocChart(rocFull, 'Full Mechanistic', '#F63A31', 91, 'MP+EC+CR')}
                </div>
                <div className="roc-watermark">
                  * Feature Layers — MP: Material Properties | EC: Experimental Conditions | CR: Cellular Response
                </div>
              </div>
            </div>

            {/* Combined SHAP & Radar Plots Card */}
            <div className="combined-analysis-card nba-card">
              <div className="analysis-grid">
                {/* Left Column: SHAP */}
                <div className="shap-column">
                  <h3 className="card-title">C. TOP FEATURE IMPORTANCE (SHAP)</h3>
                  <ResponsiveContainer width="100%" height={380}>
                    <BarChart data={shapData} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
                      <CartesianGrid stroke="rgba(0, 0, 0, 0.05)" strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 10, fill: '#1d1d1f', fontWeight: 600 }} label={{ value: 'Mean |SHAP value|', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#1d1d1f', fontWeight: 700 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 10.5, fill: '#1d1d1f', fontWeight: 700 }} width={120} />
                      <RechartsTooltip 
                        content={<CustomTooltip 
                          labelFormatter={(lbl) => `Feature: ${lbl}`} 
                          valueFormatter={(val) => typeof val === 'number' ? val.toFixed(4) : val} 
                        />}
                      />
                      <Bar dataKey="value" barSize={16} radius={[0, 8, 8, 0]} fill="url(#shapGradient)" filter="url(#premium-shadow)" />
                      <defs>
                        <linearGradient id="shapGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#1d1d1f" />
                          <stop offset="100%" stopColor="#F63A31" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Right Column: Radar Plots */}
                <div className="radar-column">
                  <h3 className="card-title">D. RADAR PLOTS</h3>
                  <div className="radar-grid">
                    <div className="radar-box">
                      <h4 className="radar-title">Biosafety (Toxicity)</h4>
                      <ResponsiveContainer width="100%" height={170}>
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarBiosafety}>
                          <PolarGrid stroke="rgba(0, 0, 0, 0.12)" />
                          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9.5, fill: '#1d1d1f', fontWeight: 700 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 1.0]} tick={{ fontSize: 8, fill: '#86868b', fontWeight: 600 }} />
                          <Radar name="Biosafety" dataKey="val" stroke="#1d1d1f" strokeWidth={3} fill="#1d1d1f" fillOpacity={0.14} dot={{ r: 4, strokeWidth: 1.5, fill: '#fff' }} />
                          <RechartsTooltip content={<CustomTooltip valueFormatter={(val) => val.toFixed(2)} />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="radar-box">
                      <h4 className="radar-title">Recovery</h4>
                      <ResponsiveContainer width="100%" height={170}>
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarRecovery}>
                          <PolarGrid stroke="rgba(0, 0, 0, 0.12)" />
                          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 9.5, fill: '#1d1d1f', fontWeight: 700 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 1.0]} tick={{ fontSize: 8, fill: '#86868b', fontWeight: 600 }} />
                          <Radar name="Recovery" dataKey="val" stroke="#F63A31" strokeWidth={3.5} fill="#F63A31" fillOpacity={0.20} dot={{ r: 4, strokeWidth: 1.5, fill: '#fff' }} />
                          <RechartsTooltip content={<CustomTooltip valueFormatter={(val) => val.toFixed(2)} />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Model Performance Comparison Card (Horizontal Tables) */}
            <div className="performance-comparison-card nba-card">
              <h3 className="card-title">E. MODEL PERFORMANCE COMPARISON</h3>
              <p className="card-sub-p" style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                Comparative analysis of Random Forest vs other machine learning models trained.
              </p>

              <div className="comparison-tables-grid">
                <div className="comparison-table-column">
                  <div className="comparison-subtitle">Biosafety (Toxicity) Classifier</div>
                  <div className="table-responsive">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>MODEL ARCHITECTURE</th>
                          <th>TEST ACCURACY</th>
                          <th>F1-SCORE</th>
                          <th>AUROC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { model: "Random Forest", accuracy: "88.00%", f1_score: "86.00%", auroc: "94.00%" },
                          { model: "XGBoost", accuracy: "86.00%", f1_score: "84.00%", auroc: "92.00%" },
                          { model: "SVM", accuracy: "82.00%", f1_score: "79.00%", auroc: "89.00%" },
                          { model: "Naive Bayes", accuracy: "75.00%", f1_score: "71.00%", auroc: "82.00%" }
                        ].map((row) => {
                          const isMainModel = row.model === "Random Forest";
                          return (
                            <tr key={row.model} className={isMainModel ? "highlight-row" : ""}>
                              <td className="model-name">
                                {row.model} {isMainModel && <span className="active-pill">Main Model</span>}
                              </td>
                              <td>{row.accuracy}</td>
                              <td>{row.f1_score}</td>
                              <td>{row.auroc}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="comparison-table-column">
                  <div className="comparison-subtitle">Recovery Classifier</div>
                  <div className="table-responsive">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th>MODEL ARCHITECTURE</th>
                          <th>TEST ACCURACY</th>
                          <th>F1-SCORE</th>
                          <th>AUROC</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { model: "Random Forest", accuracy: "85.00%", f1_score: "84.00%", auroc: "91.00%" },
                          { model: "XGBoost", accuracy: "83.00%", f1_score: "81.00%", auroc: "89.00%" },
                          { model: "SVM", accuracy: "80.00%", f1_score: "77.00%", auroc: "87.00%" },
                          { model: "Naive Bayes", accuracy: "72.00%", f1_score: "68.00%", auroc: "79.00%" }
                        ].map((row) => {
                          const isMainModel = row.model === "Random Forest";
                          return (
                            <tr key={row.model} className={isMainModel ? "highlight-row" : ""}>
                              <td className="model-name">
                                {row.model} {isMainModel && <span className="active-pill">Main Model</span>}
                              </td>
                              <td>{row.accuracy}</td>
                              <td>{row.f1_score}</td>
                              <td>{row.auroc}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* AI OPTIMIZATION RECOMMENDATIONS */}
            {suggestionsLoading && (
              <div className="result-card-large suggestions-card loading-suggestions fade-in" style={{ marginTop: '24px' }}>
                <h4 className="card-label">AI Optimization Recommendations</h4>
                <div className="suggestions-loader-container">
                  <div className="suggestions-spinner"></div>
                  <p className="loader-text">Analyzing toxicity drivers and compiling optimized formulation tweaks...</p>
                </div>
              </div>
            )}

            {!suggestionsLoading && suggestions && (
              <div className="result-card-large suggestions-card fade-in" style={{ marginTop: '24px' }}>
                <div className="suggestions-card-header">
                  <div className="header-title-wrapper">
                    <h4 className="card-label" style={{ margin: 0 }}>AI Optimization Recommendations</h4>
                    <span className={`engine-badge badge-${suggestions.engine}`}>
                      {suggestions.engine === 'gemini' ? '🧠 Gemini AI' : '🛡️ Fallback Rules'}
                    </span>
                  </div>
                </div>
                
                <div className="suggestions-explanation-section">
                  <div className="explanation-icon">💡</div>
                  <p className="explanation-text">{suggestions.explanation}</p>
                </div>

                {suggestions.tweaks && suggestions.tweaks.length > 0 && (
                  <div className="tweaks-table-container">
                    <h5 className="section-subtitle">Recommended Descriptor Adjustments</h5>
                    <div className="table-responsive">
                      <table className="tweaks-table">
                        <thead>
                          <tr>
                            <th>Parameter</th>
                            <th>Current Value</th>
                            <th>Recommended Value</th>
                            <th>Optimized Effect / Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          {suggestions.tweaks.map((tweak, index) => (
                            <tr key={index}>
                              <td className="tweak-param-name">{tweak.parameter}</td>
                              <td>
                                <span className="tweak-badge current-badge">{tweak.currentValue}</span>
                              </td>
                              <td>
                                <span className="tweak-badge recommended-badge">{tweak.recommendedValue}</span>
                              </td>
                              <td className="tweak-reason">{tweak.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {suggestions.generalTips && suggestions.generalTips.length > 0 && (
                  <div className="tips-section">
                    <h5 className="section-subtitle">General Formulation Guidelines</h5>
                    <ul className="tips-list">
                      {suggestions.generalTips.map((tip, index) => (
                        <li key={index} className="tip-item">
                          <span className="tip-bullet">⚡</span>
                          <span className="tip-text">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

          </div>
        )}
      </section>
    </div>
  );
};

export default NeuroBioAxisPredictor;
