import { labData } from '../../data/labData';
import './Publications.css';

const scholarUrl = labData.labInfo.contact.googleScholar;

export default function Publications() {
  return (
    <main className="publications-page section-lg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Output</span>
          <h1 className="t-h1">Published Research & Literature</h1>
          <p className="t-body" style={{ marginTop: 24, maxWidth: '700px' }}>
            Browse our latest findings in high-impact peer-reviewed journals. 
            Our work spans nanomedicine, biosafety, and AI-driven biological modeling.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="btn btn-red">
              View Full Profile on Google Scholar
            </a>
          </div>
        </div>

        <div className="publications-list" style={{ marginTop: 80 }}>
          {/* 2026 */}
          <div className="pub-year-group">
            <h2 className="pub-year">2026</h2>
            <div className="pub-items">
              <div className="pub-item card">
                <p className="pub-meta">Nature Communications · 2026</p>
                <h3 className="pub-title">Mechanism-informed machine learning for predicting nanoparticle therapeutic efficacy.</h3>
                <p className="pub-authors">Perumalsamy, H., et al.</p>
                <div className="pub-links">
                  <a href="#" className="t-link">DOI Link</a>
                  <a href="#" className="t-link">PDF</a>
                </div>
              </div>
            </div>
          </div>

          {/* 2025 */}
          <div className="pub-year-group">
            <h2 className="pub-year">2025</h2>
            <div className="pub-items">
              <div className="pub-item card">
                <p className="pub-meta">ACS Nano · 2025</p>
                <h3 className="pub-title">Single-cell RNA sequencing reveals cell-type specific responses to polymeric nanomaterials.</h3>
                <p className="pub-authors">Perumalsamy, H., Balusamy, S.R., et al.</p>
                <div className="pub-links">
                  <a href="#" className="t-link">DOI Link</a>
                </div>
              </div>
            </div>
          </div>

          {/* 2024 */}
          <div className="pub-year-group">
            <h2 className="pub-year">2024</h2>
            <div className="pub-items">
              <div className="pub-item card">
                <p className="pub-meta">Advanced Materials · 2024</p>
                <h3 className="pub-title">Predictive biosafety frameworks for next-generation drug delivery systems.</h3>
                <p className="pub-authors">Perumalsamy, H., et al.</p>
                <div className="pub-links">
                  <a href="#" className="t-link">DOI Link</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pub-footer center" style={{ marginTop: 64 }}>
            <p className="t-muted">Showing recent selected publications. For a complete list of over 100+ articles, please visit Google Scholar.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
