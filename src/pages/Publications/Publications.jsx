import { labData } from '../../data/labData';
import './Publications.css';

const scholarUrl = labData.labInfo.contact.googleScholar;

export default function Publications() {
  return (
    <main className="publications-page">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="inner-hero__bg-gradient" aria-hidden="true" />
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">Academic Impact</span>
            <h1 className="t-h1">Published Research & Literature</h1>
            <p className="t-body inner-hero__sub">
              Browse our contributions to high-impact journals in nanomedicine, 
              biosafety, and AI-driven modeling.
            </p>
            <div className="inner-hero__actions" style={{ marginTop: '32px' }}>
              <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
                Explore 100+ Articles on Google Scholar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS LIST ────────────────────────────── */}
      <section className="section pubs-section">
        <div className="container">
          <div className="pubs-timeline">
            {/* 2026 */}
            <div className="year-group">
              <div className="year-label">2026</div>
              <div className="pub-grid">
                <div className="pub-card resource-card">
                  <div className="pub-header">
                    <span className="pub-journal">Nature Communications</span>
                    <span className="pub-year-badge">2026</span>
                  </div>
                  <h3 className="pub-title">Mechanism-informed machine learning for predicting nanoparticle therapeutic efficacy.</h3>
                  <p className="pub-authors">Perumalsamy, H., et al.</p>
                  <div className="pub-links">
                    <a href="#" className="text-btn">DOI Link</a>
                    <a href="#" className="text-btn">PDF</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2025 */}
            <div className="year-group">
              <div className="year-label">2025</div>
              <div className="pub-grid">
                <div className="pub-card resource-card">
                  <div className="pub-header">
                    <span className="pub-journal">ACS Nano</span>
                    <span className="pub-year-badge">2025</span>
                  </div>
                  <h3 className="pub-title">Single-cell RNA sequencing reveals cell-type specific responses to polymeric nanomaterials.</h3>
                  <p className="pub-authors">Perumalsamy, H., Balusamy, S.R., et al.</p>
                  <div className="pub-links">
                    <a href="#" className="text-btn">DOI Link</a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 */}
            <div className="year-group">
              <div className="year-label">2024</div>
              <div className="pub-grid">
                <div className="pub-card resource-card">
                  <div className="pub-header">
                    <span className="pub-journal">Advanced Materials</span>
                    <span className="pub-year-badge">2024</span>
                  </div>
                  <h3 className="pub-title">Predictive biosafety frameworks for next-generation drug delivery systems.</h3>
                  <p className="pub-authors">Perumalsamy, H., et al.</p>
                  <div className="pub-links">
                    <a href="#" className="text-btn">DOI Link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pubs-footer center">
            <p className="t-muted">
              This is a selected list of recent publications. For a complete academic history, 
              please refer to our Google Scholar profile.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
