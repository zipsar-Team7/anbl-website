import { labData } from '../../data/labData';
import './Home.css';
import heroBg from '../../assets/herobg.jpg';
import nanoTech from '../../assets/nano-tech.jpg';

const { labInfo, quickNav, researchThemes } = labData;

export default function Home() {
  return (
    <main id="home-page">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <img src={heroBg} className="hero__bg-img" alt="" aria-hidden="true" />
        <div className="hero__bg-gradient" aria-hidden="true" />
        
        {/* Nanoparticle Animation */}
        <div className="hero__visual-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle--${i + 1}`} />
          ))}
        </div>

        <div className="hero__inner container">
          <div className="hero__content">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Advanced Nanomedicine &amp; Biosafety Lab · Hanyang University
            </p>
            <h1 className="t-hero hero__headline">
              Pioneering the Future<br />
              of <span className="accent">Nanomedicine</span><br />
              with AI.
            </h1>
            <p className="hero__sub">
              {labInfo.subHeadline}
            </p>
            <div className="hero__actions">
              <a href="/research" className="btn btn-red btn-lg">Explore Our Research</a>
              <a href="/publications" className="btn btn-lg" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}>
                View Publications
              </a>
            </div>

            {/* Stats */}
            <div className="hero__stats">
              <div>
                <div className="hero__stat-num">100<span>+</span></div>
                <div className="hero__stat-label">Peer-Reviewed Articles</div>
              </div>
              <div>
                <div className="hero__stat-num">7<span>+</span></div>
                <div className="hero__stat-label">Global Collaborations</div>
              </div>
              <div>
                <div className="hero__stat-num">3</div>
                <div className="hero__stat-label">Active Research Grants</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LAB OVERVIEW ───────────────────────────────────── */}
      <section className="section intro-section" id="overview">
        <div className="container">
          <div className="intro-grid">
            <div className="intro-content">
              <p className="intro-eyebrow">Laboratory Overview</p>
              <h2 className="t-h2">{labInfo.name}</h2>
              <p className="t-body" style={{ marginTop: 8 }}>
                {labInfo.description}
              </p>
              <div className="intro-feature">
                <p className="t-body">
                  <strong>AI Platform Initiative: </strong>
                  {labInfo.featureHighlight}
                </p>
              </div>
            </div>

            <div className="intro-visual">
              <div className="visual-box">
                <img 
                  src={nanoTech} 
                  alt="Advanced Nanomedicine Lab" 
                  className="visual-img" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FRAMEWORK DIAGRAM ─────────────────────────────────── */}
      <section className="section framework-section">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our Methodology</span>
            <h2 className="t-h2">A multi-scale, AI-integrated framework for<br />predicting nanomaterial biosafety and recovery</h2>
          </div>

          <div className="framework-flow">
            {/* Step A */}
            <div className="flow-step">
              <div className="step-tag">A</div>
              <h3 className="step-title">Nanomaterial properties</h3>
              <div className="step-visual properties-visual">
                <div className="prop-dot dot-blue" />
                <div className="prop-dot dot-gold" />
                <div className="prop-dot dot-red-core" />
                <div className="prop-dot dot-mesh" />
              </div>
              <ul className="step-list">
                <li>Size · Shape</li>
                <li>Surface Charge</li>
                <li>Composition</li>
              </ul>
            </div>

            <div className="flow-arrow">→</div>

            {/* Step B */}
            <div className="flow-step">
              <div className="step-tag">B</div>
              <h3 className="step-title">Exposure context & systems</h3>
              <div className="step-visual context-visual">
                <div className="symbol-dish" title="Petri Dish" />
                <div className="symbol-liver" title="Liver" />
                <div className="symbol-mouse" title="Mouse" />
              </div>
              <ul className="step-list">
                <li>Dose · Time · Route</li>
                <li>Disease context</li>
              </ul>
            </div>

            <div className="flow-arrow">→</div>

            {/* Step C */}
            <div className="flow-step step-wide">
              <div className="step-tag">C</div>
              <h3 className="step-title">Multi-omics integration</h3>
              <div className="step-visual integration-visual">
                <div className="omics-symbols">
                  <div className="symbol-dna" title="Transcriptomics" />
                  <div className="symbol-protein" title="Proteomics" />
                  <div className="symbol-cell" title="scRNA-seq" />
                </div>
                <div className="triangle-container">
                  <div className="tri-label tri-top">Pro-inflammatory</div>
                  <div className="tri-label tri-left">Apoptosis</div>
                  <div className="tri-label tri-right">Anti-inflammatory</div>
                  <div className="tri-shape" />
                </div>
              </div>
              <ul className="step-list center">
                <li>Mechanistic Pathway Integration</li>
              </ul>
            </div>

            <div className="flow-arrow">→</div>

            {/* Step D */}
            <div className="flow-step">
              <div className="step-tag">D</div>
              <h3 className="step-title">AI-based framework</h3>
              <div className="step-visual ai-visual">
                <div className="ai-box">
                  <span>RF · XGBoost · SVM</span>
                </div>
              </div>
            </div>

            <div className="flow-arrow">→</div>

            {/* Step E */}
            <div className="flow-step">
              <div className="step-tag">E</div>
              <h3 className="step-title">Predictive outcomes</h3>
              <div className="step-visual outcomes-visual">
                <div className="outcome-scale">
                  <div className="scale-bar biosafety-bar" />
                  <span>Biosafety</span>
                </div>
                <div className="outcome-scale">
                  <div className="scale-bar recovery-bar" />
                  <span>Recovery</span>
                </div>
              </div>
              <ul className="step-benefits">
                <li>↓ Animal testing</li>
                <li>↓ Cost & time</li>
                <li>↑ Mechanistic insight</li>
                <li>↑ Safer design</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESEARCH PILLARS ─────────────────────────────────── */}
      <section className="pillars-section" id="pillars">
        <div className="container">
          <div className="pillars-header">
            <div>
              <p className="section-label">Core Research Areas</p>
              <h2 className="t-h2">Five Pillars of<br />Scientific Excellence</h2>
            </div>
            <a href="/research" className="btn btn-outline">View All Research →</a>
          </div>

          <div className="pillars-grid">
            {researchThemes.map((theme) => (
              <div key={theme.id} className="pillar-card">
                <div className="pillar-num">{theme.id}</div>
                <h3 className="pillar-title">{theme.title}</h3>
                <p className="pillar-desc">{theme.description}</p>
                <div className="pillar-tags">
                  {theme.keywords.split(' · ').map((tag, j) => (
                    <span key={j} className="pillar-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION CTA BAND ─────────────────────────────────── */}
      <section className="cta-band" id="mission">
        <div className="container cta-band__inner">
          <div className="cta-band__text">
            <p className="cta-band__label">Our Mission</p>
            <h2 className="cta-band__headline">{labInfo.missionHighlight}</h2>
            <p className="cta-band__sub">
              Join us in transforming nanotoxicology into a mechanism-informed,
              predictive science — reducing cost, time, and reliance on animal testing.
            </p>
          </div>
          <div className="cta-band__actions">
            <a href="/contact" className="btn btn-red btn-lg">Collaborate With Us</a>
            <a href="/about" className="btn btn-lg" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.06)' }}>
              Meet the Team
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
