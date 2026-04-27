import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import './MaterialDetails.css';
import logo from '../../assets/logo-new.png';

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toolName = location.state?.fromTool || "ANBL Platform";
  
  const [loading, setLoading] = useState(true);
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/records/${id}`);
        const result = await response.json();
        if (result.status === 'success') {
          setMaterial(result.data);
        } else {
          setError(result.message);
        }
      } catch (err) {
        setError('Failed to fetch material details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMaterialDetails();
  }, [id]);

  if (loading) return <div className="report-loading">Generating Report...</div>;
  if (error) return <div className="report-error">Error: {error}</div>;
  if (!material) return <div className="report-error">No material found</div>;

  // Map flat data to report sections
  const sections = {
    physiochemical: {
      "Material Type": material.Type_of_materials,
      "Sub-type": material.Sub_type_of_materials,
      "Functional Group/Drug": material.Functional_group_drug,
      "Abbreviation": material.Abbreviation,
      "Size (nm)": material.Size_nm_min && material.Size_nm_max 
        ? `${material.Size_nm_min} - ${material.Size_nm_max}` 
        : material.Size_nm_min || material.Size_nm_max || "N/A",
      "Shape": material.Shape,
      "Agglomeration": material.Agglomeration,
      "Zeta Potential": material.Zeta_potential
    },
    inVitro: {
      "Cell Type": material.Cell_Type,
      "NP Concentration (ug/mL)": material.NPs_Conc_ug_mL_min && material.NPs_Conc_ug_mL_max
        ? `${material.NPs_Conc_ug_mL_min} - ${material.NPs_Conc_ug_mL_max}`
        : material.NPs_Conc_ug_mL_min || "N/A",
      "Stimulant": material.Stimulant,
      "Stimulant Conc (ug/ml)": material.Stimulant_Conc_ug_ml_min || "N/A",
      "Cellular Uptake": material.Cellular_uptake,
      "Pro-Inflammatory": material.Pro_inflammatory,
      "Anti-Inflammatory": material.Anti_inflammatory,
      "Apoptosis": material.Apoptosis
    },
    inVivo: {
      "Organism": material.Organism,
      "Gender": material.Gender,
      "Age (Weeks)": material.Age_Weeks_min || "N/A",
      "Weight (g)": material.Weight_g_min || "N/A",
      "Dose (mg/Kg)": material.Dose_invivo_mg_Kg_min || "N/A",
      "Dose Times": material.Dose_times,
      "Administration Route": material.Administration_route,
      "Injury Model": material.Injury_Model,
      "Biosafety": material.Biosafety,
      "Recovery": material.Recovery
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
            <p className="report-subtitle">Comprehensive characterization of nanoparticle interactions within neurological biological systems.</p>
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

          {/* Section 3.0 */}
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

          {/* Section 4.0 */}
          <section className="report-section">
            <div className="section-number">4.0</div>
            <div className="section-content">
              <h2 className="report-section-title">Reference Documentation</h2>
              <div className="reference-box">
                <div className="ref-item">
                  <strong>Source / Reference:</strong> {material.Reference || "N/A"}
                </div>
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
