import { labData } from "../../data/labData";
import "./About.css";

const { director } = labData;

export default function About() {
  return (
    <main className="about-page">
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
            <span className="section-label">Leadership</span>
            <h1 className="t-h1">Principal Investigator</h1>
            <p className="t-body inner-hero__sub">
              Leading the innovation in nanomedicine and biosafety through 
              interdisciplinary research and AI-driven methodologies.
            </p>
          </div>
        </div>
      </section>

      <div className="container about-layout">
        {/* ── LEFT SIDEBAR (Sticky) ────────────────────────── */}
        <aside className="about-sidebar">
          <div className="profile-card">
            <div className="profile-img-box">
              <div className="profile-img-fallback">
                <span>ANBL</span>
              </div>
            </div>
            <div className="profile-card__info">
              <h1 className="t-h3" style={{ fontSize: '24px', marginBottom: '8px' }}>{director.name}</h1>
              <p className="profile-card__title">{director.title}</p>
              <div className="profile-card__meta">
                <p>{director.affiliation}</p>
                <p className="profile-email">
                  <a href={`mailto:${director.email}`}>{director.email}</a>
                </p>
              </div>
              <a href="/opportunities" className="btn btn-red btn-sm">
                Join Our Team
              </a>
            </div>
          </div>
        </aside>

        {/* ── RIGHT CONTENT (Scrollable) ───────────────────── */}
        <div className="about-content">
          <section className="about-section bio-section">
            <h3 className="t-h3 section-title">Biography</h3>
            <div className="bio-text t-body">
              {director.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          <section className="about-section history-section">
            <h3 className="t-h3 section-title">Professional Experience</h3>
            <div className="custom-timeline">
              {director.experience.map((exp, i) => (
                <div key={i} className="timeline-node">
                  <div className="node-marker" />
                  <div className="node-content">
                    <span className="node-date">{exp.years}</span>
                    <h4 className="node-role">{exp.role}</h4>
                    <p className="node-inst">{exp.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="about-section history-section">
            <h3 className="t-h3 section-title">Academic Background</h3>
            <div className="custom-timeline">
              {director.education.map((edu, i) => (
                <div key={i} className="timeline-node">
                  <div className="node-marker" />
                  <div className="node-content">
                    <span className="node-date">{edu.years}</span>
                    <h4 className="node-role">{edu.degree}</h4>
                    <p className="node-inst">{edu.institution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <br />
    </main>
  );
}
