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

      {/* ── TEAM SECTION ───────────────────────────────────── */}
      <section className="section team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our People</span>
            <h2 className="t-h2">Research Team</h2>
          </div>

          {/* Research Scientists */}
          <div className="team-group">
            <h3 className="team-category-title">Research Scientists</h3>
            <div className="team-grid">
              {labData.team.researchScientists.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="team-card__placeholder">
                        <span>{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="team-card__info">
                    <h4 className="team-card__name">{member.name}</h4>
                    <p className="team-card__role">{member.role}</p>
                    <p className="team-card__focus">{member.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Students */}
          <div className="team-group">
            <h3 className="team-category-title">
              Graduate & Undergraduate Students
            </h3>
            <div className="team-grid">
              {labData.team.students.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="team-card__placeholder">
                        <span>{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="team-card__info">
                    <h4 className="team-card__name">{member.name}</h4>
                    <p className="team-card__role">{member.role}</p>
                    <p className="team-card__focus">{member.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff */}
          <div className="team-group">
            <h3 className="team-category-title">Staff Members</h3>
            <div className="team-grid">
              {labData.team.staff.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    {member.image ? (
                      <img src={member.image} alt={member.name} />
                    ) : (
                      <div className="team-card__placeholder">
                        <span>{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="team-card__info">
                    <h4 className="team-card__name">{member.name}</h4>
                    <p className="team-card__role">{member.role}</p>
                    <p className="team-card__focus">{member.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ────────────────────────────────── */}
      <section
        className="section gallery-section"
        style={{ background: "var(--surface)" }}
      >
        <div className="container">
          <div className="section-header">
            <span className="section-label">Visual Journey</span>
            <h2 className="t-h2">Lab Gallery</h2>
          </div>
          <div className="gallery-grid">
            {labData.gallery.map((item, i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-media">
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.caption} />
                  ) : (
                    <video src={item.url} controls />
                  )}
                  <div className="gallery-overlay">
                    <p className="gallery-caption">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
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

        <div className="container">
          <div className="cta-band__glass">
            <div className="cta-band__inner">
              <div className="cta-band__text">
                <p className="cta-band__label">Join the Team</p>
                <h2 className="cta-band__headline">
                  Shaping the next generation of researchers.
                </h2>
                <p className="cta-band__sub">
                  Are you passionate about nanomedicine and AI? We're looking
                  for dedicated researchers and students to join our mission.
                </p>
              </div>
              <div className="cta-band__actions">
                <a href="/opportunities" className="btn btn-red btn-lg">
                  View Open Positions
                </a>
                <a
                  href="/contact"
                  className="btn btn-outline btn-lg"
                  style={{
                    color: "var(--text-primary)",
                    background: "rgba(0,0,0,0.03)",
                  }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
