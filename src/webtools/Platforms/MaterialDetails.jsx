import React from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import './MaterialDetails.css';
import logo from '../../assets/logo-new.png';

const MaterialDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const toolName = location.state?.fromTool || "ANBL Platform";

  // Mock data for the specific material
  const materialData = {
    physiochemical: {
      type: "Inorganic",
      subtype: "Gold (Au)",
      functional: "Citrate",
      abbrev: id || "Au-NP-01",
      size: "15 nm",
      shape: "Sphere",
      agglomeration: "Low",
      zeta: "-35 mV"
    },
    inVitro: {
      cellType: "RAW 264.7 (Macrophage)",
      conc: "10 ug/mL",
      stimulant: "LPS",
      stimulantConc: "1 ug/mL",
      uptake: "High (Endocytosis)",
      proInflammatory: "Increased (TNF-a, IL-6)",
      antiInflammatory: "No Change",
      apoptosis: "Not Detected"
    },
    inVivo: {
      organism: "BALB/c Mouse",
      gender: "Female",
      age: "8 Weeks",
      weight: "22 g",
      dose: "5 mg/Kg",
      doseTimes: "Single dose",
      route: "Intravenous (IV)",
      injuryModel: "Acute Lung Injury",
      biosafety: "Safe at tested dose",
      recovery: "Partial recovery at 7 days"
    },
    reference: {
      title: "Cross-scale interaction of gold nanoparticles with neurological systems.",
      doi: "10.1016/j.biomaterials.2024.122543"
    }
  };

  return (
    <div className="report-container fade-in">

      <div className="report-sheet">
        {/* Back Button - Moved Inside */}
        <button className="floating-back-btn" onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        {/* Report Header */}
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
                {Object.entries(materialData.physiochemical).map(([key, val]) => (
                  <div key={key} className="report-data-cell">
                    <span className="cell-label">{key.replace(/_/g, ' ')}</span>
                    <span className="cell-value">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2.0 */}
          <section className="report-section">
            <div className="section-number">2.0</div>
            <div className="section-content">
              <h2 className="report-section-title">Exposure_In vitro analysis</h2>
              <div className="report-data-grid">
                {Object.entries(materialData.inVitro).map(([key, val]) => (
                  <div key={key} className="report-data-cell">
                    <span className="cell-label">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    <span className="cell-value">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3.0 */}
          <section className="report-section">
            <div className="section-number">3.0</div>
            <div className="section-content">
              <h2 className="report-section-title">Exposure_In vivo analysis</h2>
              <div className="report-data-grid">
                {Object.entries(materialData.inVivo).map(([key, val]) => (
                  <div key={key} className="report-data-cell">
                    <span className="cell-label">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    <span className="cell-value">{val}</span>
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
                  <strong>Publication Title:</strong> {materialData.reference.title}
                </div>
                <div className="ref-item">
                  <strong>DOI:</strong> <span className="ref-link">{materialData.reference.doi}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Report Footer */}
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
