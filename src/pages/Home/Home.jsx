import { labData } from '../../data/labData';
import './Home.css';

const { labInfo, quickNav, researchThemes } = labData;

export default function Home() {
  return (
    <main id="home-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <div className="hero__bg-gradient" aria-hidden="true" />
        <img src="/src/assets/hero-bg.png" className="hero__bg-img" alt="" aria-hidden="true" />
        <div className="hero__inner container">
          <div className="hero__content">
            <div className="hero__text-block">
              <p className="t-serif hero__tagline">
                Moving beyond trial-and-error.
              </p>
              <h1 className="t-hero hero__headline">
                {labInfo.headline}
              </h1>
              <p className="hero__sub">
                {labInfo.subHeadline}
              </p>
              <div className="hero__actions">
                <a href="/research" className="btn btn-red">Explore Our Research</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRODUCTION / ABOUT OVERVIEW ─────────────────── */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <span className="section-label">Laboratory Overview</span>
              <h2 className="t-h1">{labInfo.name}</h2>
              <p className="t-body" style={{ marginTop: 24 }}>
                {labInfo.description}
              </p>
              <div className="intro-feature card">
                <p className="t-body">
                  <strong>Feature Highlight:</strong> {labInfo.featureHighlight}
                </p>
              </div>
            </div>
            <div className="intro-visual">
              <div className="visual-box">
                <div className="visual-circle" />
                <div className="visual-data-dots">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="visual-dot" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK NAVIGATION CARDS ────────────────────────── */}
      <section className="section-lg quick-nav-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Core Specializations</span>
            <h2 className="t-h1">Explore Our Primary Research Pillars</h2>
          </div>
          <div className="quick-nav-grid">
            {quickNav.map((nav, idx) => (
              <a href={nav.link} key={idx} className="nav-card card">
                <div className="nav-card__icon">0{idx + 1}</div>
                <h3 className="t-h3">{nav.title}</h3>
                <p className="t-sm">{nav.description}</p>
                <span className="nav-card__more">Learn More →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION BAND ─────────────────────────────────── */}
      <section className="cta-band">
        <div className="container center">
          <h2 className="t-h2" style={{ color: '#fff' }}>{labInfo.missionHighlight}</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: 16 }}>
            Join us in transforming nanotoxicology into a mechanism-informed, predictive science.
          </p>
        </div>
      </section>

    </main>
  );
}
