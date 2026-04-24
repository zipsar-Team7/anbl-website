import { labData } from "../../data/labData";
import "./ResearchTeam.css";

const { collaborations } = labData;

export default function ResearchTeam() {
  return (
    <main className="research-team-page">
      {/* ── HERO ─────────────────────────────────────────── */}
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
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="inner-hero__content">
            <span className="section-label">Our People</span>
            <h1 className="t-h1">Research Team</h1>
            <p className="t-body inner-hero__sub">
              The Advanced Nanomedicine & Biosafety Lab is composed of dedicated 
              researchers, students, and staff working together to pioneer the future 
              of nanomedicine through AI and mechanistic biology.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM SECTION ───────────────────────────────────── */}
      <section className="section team-section">
        <div className="container">
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

      {/* ── COLLABORATIONS SECTION ────────────────────────── */}
      <section className="section collaborations-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Global Network</span>
            <h2 className="t-h2">Global Collaborations</h2>
            <p className="t-body text-muted">Building bridges across institutions worldwide.</p>
          </div>

          {/* International Collaborations */}
          <div className="team-group">
            <h3 className="team-category-title">International Collaborators</h3>
            <div className="team-grid">
              {collaborations.international.map((c, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    <div className="team-card__placeholder">
                      <span>{c.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="team-card__info">
                    <h4 className="team-card__name">{c.name}</h4>
                    <p className="team-card__role">Collaborating Partner</p>
                    <p className="team-card__focus">{c.institution}</p>
                    <a 
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(c.name + " " + c.institution)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-outline-red team-card__btn"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Domestic Collaborations */}
          <div className="team-group">
            <h3 className="team-category-title">Domestic Collaborators</h3>
            <div className="team-grid">
              {collaborations.domestic.map((c, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    <div className="team-card__placeholder">
                      <span>{c.name.charAt(0)}</span>
                    </div>
                  </div>
                  <div className="team-card__info">
                    <h4 className="team-card__name">{c.name}</h4>
                    <p className="team-card__role">Domestic Partner</p>
                    <p className="team-card__focus">{c.institution}</p>
                    <a 
                      href={`https://scholar.google.com/scholar?q=${encodeURIComponent(c.name + " " + c.institution)}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-outline-red team-card__btn"
                    >
                      View Profile
                    </a>
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

    </main>
  );
}
