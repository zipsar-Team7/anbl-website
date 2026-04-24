import { labData } from "../../data/labData";
import "./Home.css";
import heroBg from "../../assets/hero.jpg";
import nanoTech from "../../assets/herobgmain.jpg";
import heroContent from "../../assets/hero-content.jpeg";
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

      {/* ── INNOVATION ───────────────────────────────────── */}
      <section className="section innovation-section">
        <div className="container">
          <div className="innovation-grid">
            <div className="innovation-content">
              <p className="intro-eyebrow">Our Mission & Innovation</p>
              <h2 className="t-h2">Bridging Multi-Omics with AI</h2>
              <p className="t-body">
                We are pioneering a paradigm shift in nanomedicine by integrating single-cell multi-omics, mechanistic biology, and predictive machine learning models. Our approach moves beyond traditional trial-and-error, enabling mechanism-informed design for safer and more effective therapeutic solutions.
              </p>
              <ul className="innovation-list">
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Predictive Analytics:</strong> Leveraging AI for rapid screening of nanomaterial biosafety.
                  </div>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Precision Medicine:</strong> Engineering targeted drug delivery systems for complex diseases.
                  </div>
                </li>
                <li>
                  <span className="list-icon">✓</span>
                  <div>
                    <strong>Human-Centric Models:</strong> Reducing reliance on animal testing through advanced in silico frameworks.
                  </div>
                </li>
              </ul>
            </div>

            <div className="innovation-visual">
              <div className="visual-box">
                <img
                  src={heroContent}
                  alt=""
                  className="visual-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
