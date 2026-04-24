import { Link } from 'react-router-dom';
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

  
      
    </main>
  );
}
