import { labData } from '../../data/labData';
import './Research.css';

const { researchThemes, platforms, grants, collaborations } = labData;

export default function Research() {
  return (
    <main className="research-page">
      {/* ── OVERVIEW ───────────────────────────────────── */}
      <section className="research-hero section-lg">
        <div className="container">
          <span className="section-label">Research Program</span>
          <h1 className="t-h1">Multi-Scale, Mechanism-Informed Research</h1>
          <p className="t-body overview-text" style={{ maxWidth: '800px', marginTop: 32 }}>
            Our research focuses on understanding and predicting nanoparticle–biological interactions. 
            We integrate material properties, exposure conditions, and biological responses using 
            advanced technologies such as single-cell RNA sequencing (scRNA-seq), mass cytometry (CyTOF), 
            and multi-omics data analysis. By identifying conserved biological response programs 
            (pro-inflammatory, anti-inflammatory, and apoptotic pathways) and incorporating them into 
            machine learning models, we develop interpretable and generalizable predictive systems for 
            nanomaterial biosafety and recovery.
          </p>
        </div>
      </section>

      {/* ── RESEARCH THEMES ──────────────────────────────── */}
      <section className="themes-section section-lg" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <h2 className="t-h2">Research Themes</h2>
          <div className="themes-grid">
            {researchThemes.map((theme, i) => (
              <div key={i} className="theme-card card">
                <div className="theme-number">{theme.id}</div>
                <h3 className="t-h3">{theme.title}</h3>
                <p className="t-body">{theme.description}</p>
                <div className="theme-tags">
                  {theme.keywords.split(' · ').map((tag, j) => (
                    <span key={j} className="theme-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREDICTIVE PLATFORMS ─────────────────────────── */}
      <section className="platforms-section section-lg" id="platforms">
        <div className="container">
          <h2 className="t-h2">Databases & Predictive Platforms</h2>
          <div className="platforms-list">
            {platforms.map((plat, i) => (
              <div key={i} className="platform-item card">
                <div className="platform-info">
                  <h3 className="t-h3">{plat.name}</h3>
                  <p className="t-body">{plat.description}</p>
                </div>
                <div className="platform-action">
                  <button className="btn btn-outline btn-sm">Access Platform</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRANTS ───────────────────────────────────────── */}
      <section className="grants-section section-lg" style={{ background: 'var(--surface)' }}>
        <div className="container narrow">
          <h2 className="t-h2 center">Research Grants</h2>
          <div className="grants-list" style={{ marginTop: 48 }}>
            {grants.map((grant, i) => (
              <div key={i} className="grant-card card">
                <div className="grant-header">
                  <span className={`badge ${grant.type === 'Ongoing' ? 'badge-red' : 'badge-gray'}`}>
                    {grant.type}
                  </span>
                  <span className="grant-funding">{grant.funding}</span>
                </div>
                <h4 className="t-h4" style={{ margin: '16px 0' }}>{grant.title}</h4>
                <div className="grant-footer">
                  <span className="t-sm"><strong>Agency:</strong> {grant.agency}</span>
                  <span className="t-sm"><strong>Period:</strong> {grant.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLABORATIONS ───────────────────────────────── */}
      <section className="collab-section section-lg">
        <div className="container">
          <h2 className="t-h2 center">Global Collaborations</h2>
          <div className="collab-grid" style={{ marginTop: 64 }}>
            <div className="collab-box">
              <h3 className="t-h3" style={{ marginBottom: 32, color: 'var(--red)' }}>International</h3>
              <div className="collab-list">
                {collaborations.international.map((c, i) => (
                  <div key={i} className="collab-item">
                    <strong>{c.name}</strong>
                    <span>{c.institution}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="collab-box">
              <h3 className="t-h3" style={{ marginBottom: 32, color: 'var(--red)' }}>Domestic</h3>
              <div className="collab-list">
                {collaborations.domestic.map((c, i) => (
                  <div key={i} className="collab-item">
                    <strong>{c.name}</strong>
                    <span>{c.institution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
