import { labData } from '../../data/labData';
import './About.css';

const { director } = labData;

export default function About() {
  return (
    <main className="about-page">
      {/* ── PI PROFILE HEADER ───────────────────────────────── */}
      <section className="pi-header">
        <div className="container">
          <div className="pi-grid">
            <div className="pi-sidebar">
              <div className="pi-image-box">
                <div className="pi-placeholder">ANBL PI</div>
              </div>
              <div className="pi-contact-info">
                <h1 className="pi-name">{director.name}</h1>
                <p className="pi-title">{director.title}</p>
                <div className="pi-meta">
                  <p>{director.affiliation}</p>
                  <a href={`mailto:${director.email}`} className="pi-email">{director.email}</a>
                </div>

              </div>
            </div>

            <div className="pi-main">
              <section className="pi-section">
                <h2 className="pi-section-title">Biography</h2>
                <div className="pi-bio-text">
                  {director.bio.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              <section className="pi-section">
                <h2 className="pi-section-title">Professional Experience</h2>
                <div className="pi-timeline">
                  {director.experience.map((exp, i) => (
                    <div key={i} className="pi-timeline-item">
                      <span className="pi-year">{exp.years}</span>
                      <div className="pi-timeline-content">
                        <h4 className="pi-role">{exp.role}</h4>
                        <p className="pi-inst">{exp.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="pi-section">
                <h2 className="pi-section-title">Academic Background</h2>
                <div className="pi-timeline">
                  {director.education.map((edu, i) => (
                    <div key={i} className="pi-timeline-item">
                      <span className="pi-year">{edu.years}</span>
                      <div className="pi-timeline-content">
                        <h4 className="pi-role">{edu.degree}</h4>
                        <p className="pi-inst">{edu.institution}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
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
                    {member.image ? <img src={member.image} alt={member.name} /> : <div className="team-card__placeholder"><span>{member.name.charAt(0)}</span></div>}
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
            <h3 className="team-category-title">Graduate & Undergraduate Students</h3>
            <div className="team-grid">
              {labData.team.students.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-card__img-box">
                    {member.image ? <img src={member.image} alt={member.name} /> : <div className="team-card__placeholder"><span>{member.name.charAt(0)}</span></div>}
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
                    {member.image ? <img src={member.image} alt={member.name} /> : <div className="team-card__placeholder"><span>{member.name.charAt(0)}</span></div>}
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
      <section className="section gallery-section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Visual Journey</span>
            <h2 className="t-h2">Lab Gallery</h2>
          </div>
          <div className="gallery-grid">
            {labData.gallery.map((item, i) => (
              <div key={i} className="gallery-item">
                <div className="gallery-media">
                  {item.type === 'image' ? (
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
        <div className="container cta-band__inner">
          <div className="cta-band__text">
            <p className="cta-band__label">Join the Team</p>
            <h2 className="cta-band__headline">Shaping the next generation of researchers.</h2>
            <p className="cta-band__sub">
              Are you passionate about nanomedicine and AI? We're looking for 
              dedicated researchers and students to join our mission.
            </p>
          </div>
          <div className="cta-band__actions">
            <a href="/contact" className="btn btn-red btn-lg">View Open Positions</a>
          </div>
        </div>
      </section>
    </main>
  );
}
