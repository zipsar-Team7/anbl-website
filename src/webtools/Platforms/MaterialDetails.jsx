import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';
import './MaterialDetails.css';
import logo from '../../assets/logo-new.png';

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [toolName, setToolName] = useState(location.state?.fromTool || "Neuro-Bio-Axis");
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  const isPolyTox = toolName === "Poly-ToxMap";

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        setLoading(true);
        // Determine URL based on current isPolyTox state (derived from toolName or state)
        let currentIsPolyTox = location.state?.fromTool === "Poly-ToxMap" || 
                               (location.state?.fromTool === undefined && toolName === "Poly-ToxMap");
        
        let fetchUrl = currentIsPolyTox 
          ? `${API_ENDPOINTS.POLYTOX_RECORDS}/${id}` 
          : `${API_ENDPOINTS.RECORDS}/${id}`;
        
        let response = await fetch(fetchUrl);
        let result = await response.json();
        
        // If not found and fromTool wasn't explicitly provided in state, try the other endpoint
        if (result.status !== 'success' && !location.state?.fromTool) {
          currentIsPolyTox = !currentIsPolyTox;
          fetchUrl = currentIsPolyTox 
            ? `${API_ENDPOINTS.POLYTOX_RECORDS}/${id}` 
            : `${API_ENDPOINTS.RECORDS}/${id}`;
          response = await fetch(fetchUrl);
          result = await response.json();
        }

        if (result.status === 'success') {
          setMaterial(result.data);
          setToolName(currentIsPolyTox ? "Poly-ToxMap" : "Neuro-Bio-Axis");
        } else {
          setError(result.message || 'No material found');
        }
      } catch (err) {
        setError('Failed to fetch material details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterialDetails();
  }, [id, location.state?.fromTool]);

  if (loading) return <div className="report-loading">Generating Report...</div>;
  if (error) return <div className="report-error">Error: {error}</div>;
  if (!material) return <div className="report-error">No material found</div>;

  // Map flat data to report sections
  const sections = isPolyTox ? {
    physiochemical: {
      "Polymer type": material.Polymers,
      "Type of materials": material.Polymer_type,
      "Synthesis method": material.Synthesis_method,
      "Functional group/drug": material.Material_2,
      "Abbreviation": material.Article_Name,
      "Core size (nm)": material.Core_size_nm,
      "Shape": material.Shape,
      "PDI": material.PDI,
      "Hydrodynamic size in water (nm)": material.Hydrodynamic_size_water_nm,
      "Surface charge in water (mV)": material.Surface_charge_water_mV
    },
    inVitro: {
      "Media_Type": material.Media,
      "Assay Type": material.Assay,
      "Cell Name": material.Cell_name,
      "Cell Type": material.Cell_type,
      "Cell Type Origin": material.Cell_Type_Origin,
      "Exposure dose (ug/mL)": material.Exposure_dose_ug_mL,
      "Exposure time (h)": material.Exposure_time_h
    },
    metrics: {
      "Viability (%)": material.Viability_percent,
      "Toxicity (%)": material.Toxicity
    }
  } : {
    physiochemical: {
      "Scale Coverage": material.Scale_Coverage,
      "Meta Scale": material.Meta_Scale,
      "Material Type": material.MIE_P_M_Type,
      "Size (nm)": material.MIE_P_Size_nm,
      "Shape": material.MIE_P_Shape,
      "Agglomeration": material.MIE_P_Agglomeration,
      "Zeta Potential": material.MIE_P_Zeta_potential
    },
    inVitro: {
      "Cell Type": material.MIE_E_Cell_Type,
      "NP Concentration (ug/mL)": material.MIE_E_NPs_Conc_ug_mL,
      "Stimulant": material.MIE_E_Stimulant,
      "Stimulant Conc (ug/ml)": material.MIE_E_Stimulant_Conc_ug_ml,
      "Cellular Uptake": material.MIE_E_C_uptake,
      "Pro-Inflammatory": material.KE_Pro,
      "Anti-Inflammatory": material.KE_Anti,
      "Apoptosis": material.KE_Apoptosis
    },
    inVivo: {
      "Organism": material.MIE_E_Organism,
      "Sex": material.MIE_E_Sex,
      "Age (Weeks)": material.MIE_E_Age_Weeks,
      "Weight (g)": material.MIE_E_Weight_g,
      "Dose (mg/Kg)": material.MIE_E_NPs_Dose_mg_Kg,
      "Dose Regimen": material.MIE_E_Dose_Regimen,
      "Administration Route": material.MIE_E_Ad_route,
      "Injury Model": material.MIE_E_Injury_Model
    },
    biosafetyRecovery: {
      "Biosafety": material.AO_Biosafety,
      "Recovery": material.AO_Recovery
    }
  };

  return (
    <div className="report-container fade-in">
      <div className="report-sheet">
        <button className="floating-back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>

        <header className="report-header">
          <div className="report-branding">
            <img src={logo} alt="ANBL Logo" className="report-logo" />
          </div>
          <div className="report-title-block">
            <h1 className="report-main-title">{toolName} Analysis Report</h1>
            <p className="report-subtitle">
              {isPolyTox 
                ? "Comprehensive characterization and toxicity profiling of polymer-based nanomaterials."
                : "Comprehensive characterization of nanoparticle interactions within neurological biological systems."}
            </p>
          </div>
        </header>

        <div className="report-body">
          {/* Section 1.0 */}
          <section className="report-section">
            <div className="section-number">1.0</div>
            <div className="section-content">
              <h2 className="report-section-title">Physiochemical Parameters</h2>
              <div className="report-data-grid">
                {Object.entries(sections.physiochemical).map(([key, val]) => (
                  <div key={key} className="report-data-cell">
                    <span className="cell-label">{key}</span>
                    <span className="cell-value">{val || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2.0 */}
          <section className="report-section">
            <div className="section-number">2.0</div>
            <div className="section-content">
              <h2 className="report-section-title">Exposure: In vitro analysis</h2>
              <div className="report-data-grid">
                {Object.entries(sections.inVitro).map(([key, val]) => (
                  <div key={key} className="report-data-cell">
                    <span className="cell-label">{key}</span>
                    <span className="cell-value">{val || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3.0: In Vivo (NeuroBio) OR Metrics (PolyTox) */}
          {isPolyTox ? (
            <section className="report-section">
              <div className="section-number">3.0</div>
              <div className="section-content">
                <h2 className="report-section-title">Toxicity & Viability Metrics</h2>
                <div className="report-data-grid">
                  {Object.entries(sections.metrics).map(([key, val]) => (
                    <div key={key} className="report-data-cell">
                      <span className="cell-label">{key}</span>
                      <span className={`cell-value ${val && val.toString().includes('ANOMALY') ? 'text-warning' : ''}`}>
                        {val ? (val.toString().includes('ANOMALY') ? `${val.toString().replace('ANOMALY:', '').trim()}%` : val) : "—"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <section className="report-section">
              <div className="section-number">3.0</div>
              <div className="section-content">
                <h2 className="report-section-title">Exposure: In vivo analysis</h2>
                <div className="report-data-grid">
                  {Object.entries(sections.inVivo).map(([key, val]) => (
                    <div key={key} className="report-data-cell">
                      <span className="cell-label">{key}</span>
                      <span className="cell-value">{val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section 4.0: Safety & Recovery (Only for Neuro-Bio-Axis Tool 1) */}
          {!isPolyTox && (
            <section className="report-section">
              <div className="section-number">4.0</div>
              <div className="section-content">
                <h2 className="report-section-title">Biosafety & Recovery Assessment</h2>
                <div className="report-data-grid">
                  {Object.entries(sections.biosafetyRecovery).map(([key, val]) => (
                    <div key={key} className="report-data-cell">
                      <span className="cell-label">{key}</span>
                      <span className="cell-value">{val || "—"}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Section 4.0 / 5.0: Reference */}
          <section className="report-section">
            <div className="section-number">{isPolyTox ? "4.0" : "5.0"}</div>
            <div className="section-content">
              <h2 className="report-section-title">Reference Documentation</h2>
              <div className="reference-box">
                {isPolyTox ? (
                  <>
                    <div className="ref-item" style={{ marginBottom: '12px' }}>
                      <strong>Title:</strong> Research Article {material.Article_Name || "N/A"} (Pubmed ID: {material.Pubmed_ID || "N/A"})
                    </div>
                    <div className="ref-item">
                      <strong>Doi:</strong> {material.DOI && material.DOI !== "Missing" ? (
                        <a href={material.DOI.startsWith('http') ? material.DOI : `https://doi.org/${material.DOI}`} target="_blank" rel="noopener noreferrer" className="ref-link">
                          {material.DOI}
                        </a>
                      ) : "N/A"}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ref-item" style={{ marginBottom: '12px' }}>
                      <strong>Article No:</strong> {material.Meta_Article_no || "N/A"}
                    </div>
                    <div className="ref-item" style={{ marginBottom: '12px' }}>
                      <strong>Title:</strong> {material.Meta_Title || "N/A"}
                    </div>
                    <div className="ref-item">
                      <strong>DOI / Source:</strong> {material.Meta_doi && material.Meta_doi !== "Missing" ? (
                        <a href={material.Meta_doi.startsWith('http') ? material.Meta_doi : `https://doi.org/${material.Meta_doi}`} target="_blank" rel="noopener noreferrer" className="ref-link">
                          {material.Meta_doi}
                        </a>
                      ) : "N/A"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>

        <footer className="report-footer-seal">
          <div className="footer-disclaimer">
            <p><strong>Thank you for visiting the ANBL Lab!!!</strong></p>
            <p>If you are interested in validating your own datasets, please explore our dedicated tools designed for independent analysis and evaluation.</p>
          </div>
        </footer>
      </div>

      <div className="report-actions">
        <button className="action-btn print" onClick={() => window.print()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
          Export PDF
        </button>
        <Link to="/webtools/documentation" className="action-btn explore">Explore More Tools</Link>
      </div>
    </div>
  );
};

export default MaterialDetails;
