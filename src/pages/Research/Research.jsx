import { labData } from '../../data/labData';
import './Research.css';

const { researchThemes, platforms, grants, collaborations } = labData;

export default function Research() {
  return (
    <main className="research-page">
      {/* ── HERO ───────────────────────────────────────── */}
      <section className="inner-hero">
        <div className="inner-hero__bg-gradient" aria-hidden="true" />
        <div className="inner-hero__particles">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="vibrating-particle" 
              style={{ 
                bottom: `${Math.random() * 80}px`, 
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }} 
            />
          ))}
        </div>
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">Research Program</span>
            <h1 className="t-h1">Multi-Scale, Mechanism-Informed Research</h1>
            <p className="t-body inner-hero__sub">
              Our research focuses on understanding and predicting nanoparticle–biological interactions. 
              By identifying conserved biological response programs and incorporating them into 
              machine learning models, we develop interpretable and generalizable predictive systems for 
              nanomaterial biosafety and recovery.
            </p>
          </div>
        </div>
      </section>

      {/* ── RESEARCH THEMES ──────────────────────────────── */}
      <section className="section themes-section">
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2">Research Themes</h2>
            <p className="t-body text-muted">Core areas of investigation and methodology.</p>
          </div>
          
          <div className="themes-grid">
            {researchThemes.map((theme, i) => (
              <div key={i} className="theme-card resource-card">
                <div className="card-header">
                  <span className="card-tag">{theme.id}</span>
                </div>
                <h3 className="t-h3">{theme.title}</h3>
                <p className="t-body">{theme.description}</p>
                <div className="card-footer-tags">
                  {theme.keywords.split(' · ').map((tag, j) => (
                    <span key={j} className="pill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREDICTIVE PLATFORMS ─────────────────────────── */}
      <section className="section platforms-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="t-h2">Databases & Predictive Platforms</h2>
            <p className="t-body text-muted">Open-source tools for the scientific community.</p>
          </div>
          
          <div className="platforms-grid">
            {platforms.map((plat, i) => (
              <div key={i} className="platform-card resource-card horizontal">
                <div className="card-content">
                  <h3 className="t-h3">{plat.name}</h3>
                  <p className="t-body">{plat.description}</p>
                </div>
                <div className="card-action">
                  <button className="btn btn-red btn-sm">Access Portal</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRANTS & FUNDING ────────────────────────────── */}
      <section className="section grants-section">
        <div className="container narrow">
          <div className="section-header center">
            <h2 className="t-h2">Research Grants</h2>
          </div>
          
          <div className="grants-list">
            {grants.map((grant, i) => (
              <div key={i} className="grant-item resource-card">
                <div className="grant-meta">
                  <span className={`badge ${grant.type === 'Ongoing' ? 'badge-red' : 'badge-gray'}`}>
                    {grant.type}
                  </span>
                  <span className="grant-agency">{grant.agency}</span>
                </div>
                <h4 className="t-h4">{grant.title}</h4>
                <div className="grant-details">
                  <span><strong>Funding:</strong> {grant.funding}</span>
                  <span><strong>Period:</strong> {grant.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COLLABORATIONS ───────────────────────────────── */}
      <section className="section collab-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header center">
            <h2 className="t-h2">Global Collaborations</h2>
            <p className="t-body text-muted">Building bridges across institutions worldwide.</p>
          </div>
          
          <div className="collab-grid">
            <div className="collab-group">
              <h3 className="t-h3 group-title">International</h3>
              <div className="collab-list">
                {collaborations.international.map((c, i) => (
                  <div key={i} className="collab-card">
                    <span className="collab-name">{c.name}</span>
                    <span className="collab-inst">{c.institution}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="collab-group">
              <h3 className="t-h3 group-title">Domestic</h3>
              <div className="collab-list">
                {collaborations.domestic.map((c, i) => (
                  <div key={i} className="collab-card">
                    <span className="collab-name">{c.name}</span>
                    <span className="collab-inst">{c.institution}</span>
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
