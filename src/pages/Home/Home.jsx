import { labData } from "../../data/labData";
import "./Home.css";
import heroBg from "../../assets/hero-4.jpg";
import nanoTech from "../../assets/herobgmain.jpg";
// src\assets\herobgmain.jpg
const { labInfo, quickNav, researchThemes } = labData;

export default function Home() {
  return (
    <main id="home-page">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero" id="hero">
        <img src={heroBg} className="hero__bg-img" alt="" aria-hidden="true" />
        <div className="hero__bg-gradient" aria-hidden="true" />

        {/* Nanoparticle Animation */}
        {/* <div className="hero__visual-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`particle particle--${i + 1}`} />
          ))}
        </div> */}

        <div className="hero__inner container">
          <div className="hero__content">
            <p className="hero__eyebrow">
              <span className="hero__eyebrow-dot" />
              Welcome to Advanced Nanomedicine &amp; Biosafety Lab · Hanyang University
            </p>
            <h1 className="t-hero hero__headline">
              Pioneering the Future
              <br />
              of <span className="accent">Nanomedicine</span>
              <br />
            </h1>
            <p className="hero__sub">{labInfo.subHeadline}</p>
            <div className="hero__actions">
              <a href="/webtool" className="btn btn-red btn-lg">
                Explore Our Tools
              </a>
            </div>

            {/* Stats */}
            <div className="hero__stats">
              <div>
                <div className="hero__stat-num">
                  100<span>+</span>
                </div>
                <div className="hero__stat-label">Peer-Reviewed Articles</div>
              </div>
              <div>
                <div className="hero__stat-num">
                  7<span>+</span>
                </div>
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
              
              <div style={{ marginTop: '24px' }}>
                <h3 className="t-h3" style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Areas of Expertise</h3>
                <ul className="innovation-list" style={{ marginTop: '0' }}>
                  {labInfo.expertise.map((item, idx) => (
                    <li key={idx} style={{ alignItems: 'flex-start' }}>
                      <span className="list-icon" style={{ marginTop: '4px' }}>✓</span>
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '48px' }}>
                <h3 className="t-h3" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>AI Platform Initiative</h3>
                <p className="t-body">
                  {labInfo.featureHighlight}
                </p>
                <ul className="innovation-list" style={{ marginTop: '16px' }}>
                  {labInfo.featureBullets.map((bullet, idx) => (
                    <li key={idx} style={{ alignItems: 'flex-start' }}>
                      <span className="list-icon" style={{ marginTop: '4px' }}>✓</span>
                      <div>
                        <strong>{bullet.title} </strong>
                        {bullet.desc}
                      </div>
                    </li>
                  ))}
                </ul>
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

      {/* ── INNOVATION ───────────────────────────────────── */}
      <section className="section innovation-section">
        <div className="container">
          <div className="innovation-grid">
            <div className="innovation-content">
              <p className="intro-eyebrow">Our Mission & Innovation</p>
              <h2 className="t-h2">Our Mission</h2>
              <p className="t-body">
                To transform nanomaterial development from empirical, trial-and-error approaches into a predictive, mechanism-driven science by integrating artificial intelligence with experimental biology. ANBL aims to establish a unified and generalizable framework for the rational design of safe and effective nanomaterials across biomedical and industrial applications.
              </p>
              <h3 className="t-h3" style={{ fontSize: '1.2rem', marginTop: '24px', marginBottom: '12px' }}>Innovation</h3>
              <ul className="innovation-list">
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Biology-informed AI framework: </strong>
                    Applies biological response features when modeling heterogeneous nanoparticle systems, where material- and exposure-based descriptors alone are insufficient, enabling accurate and generalizable prediction
                  </div>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Biological response pathway concept: </strong>
                    Identifies key pathways governing biosafety and recovery across materials, models, and organs
                  </div>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Context-dependent modeling strategy: </strong>
                    Defines when material-centric approaches are sufficient and when biological information becomes essential, establishing a principled and adaptive modeling framework
                  </div>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Cross-scale integration: </strong>
                    Unifies molecular, cellular, and in vivo data into a single predictive framework, bridging experimental scales
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
