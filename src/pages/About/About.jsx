import { labData } from "../../data/labData";
import "./About.css";

const { director } = labData;

export default function About() {
  return (
    <main className="about-page">
      {/* ── PROFILE HERO ───────────────────────────────── */}
      <section className="inner-hero profile-hero">
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
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="profile-hero__grid">
            <div className="profile-hero__image">
              <div className="profile-img-box">
                {/* Placeholder image representation */}
                <div className="profile-img-fallback">
                  <span>ANBL</span>
                </div>
              </div>
            </div>
            <div className="profile-hero__text">
              <span className="section-label">Principal Investigator</span>
              <h1 className="t-h1">{director.name}</h1>
              <p className="profile-hero__title">{director.title}</p>
              <div className="profile-hero__meta">
                <p>{director.affiliation}</p>
                <p className="profile-email">
                  <a href={`mailto:${director.email}`}>{director.email}</a>
                </p>
              </div>
              <div className="profile-hero__actions">
                <a href="/opportunities" className="btn btn-red">
                  Join Our Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIOGRAPHY ───────────────────────────────────── */}
      <section className="section biography-section">
        <div className="container narrow">
          <div className="section-header">
            <h2 className="t-h2">Biography</h2>
          </div>
          <div className="bio-content t-body">
            {director.bio.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOURNEY (TIMELINE) ───────────────────────────── */}
      <section
        className="section history-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="container">
          <div className="history-grid">
            {/* Experience */}
            <div className="history-col">
              <h3 className="t-h3 history-title">Professional Experience</h3>
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
            </div>

            {/* Education */}
            <div className="history-col">
              <h3 className="t-h3 history-title">Academic Background</h3>
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
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────────────── */}
      <section className="cta-band">
        {/* Background Particles */}
        <div className="cta-band__visual-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                right: `${Math.random() * 50}%`,
                animationDelay: `${Math.random() * -10}s`,
                opacity: 0.15,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
