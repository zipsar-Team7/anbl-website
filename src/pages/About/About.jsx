import { labData } from '../../data/labData';
import './About.css';

const { director } = labData;

export default function About() {
  return (
    <main className="about-page">
      {/* ── PROFESSOR PROFILE HERO ─────────────────────── */}
      <section className="about-hero section-lg">
        <div className="container">
          <div className="profile-grid">
            <div className="profile-img-container">
              <div className="profile-img-placeholder">
                {/* Replace with actual image later */}
                <span style={{ fontSize: '100px' }}>👨‍🔬</span>
              </div>
            </div>
            <div className="profile-info">
              <span className="section-label">Principal Investigator</span>
              <h1 className="t-h1">{director.name}</h1>
              <p className="profile-title t-serif">{director.title}</p>
              <div className="profile-affiliation">
                <p className="t-body">{director.affiliation}</p>
                <p className="t-sm" style={{ marginTop: 8 }}>
                  <strong>Email:</strong> <a href={`mailto:${director.email}`}>{director.email}</a>
                </p>
              </div>
              <div className="profile-actions">
                <button className="btn btn-red">Download Full CV (PDF)</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIOGRAPHY ───────────────────────────────────── */}
      <section className="biography-section section">
        <div className="container narrow">
          <h2 className="t-h2">Biography</h2>
          <div className="t-body bio-text">
            {director.bio.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE & EDUCATION ───────────────────────── */}
      <section className="history-section section-lg" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="history-grid">
            <div className="history-column">
              <h3 className="t-h3 column-title">Work Experience</h3>
              <div className="timeline">
                {director.experience.map((exp, i) => (
                  <div key={i} className="timeline-item">
                    <span className="timeline-date">{exp.years}</span>
                    <h4 className="timeline-role">{exp.role}</h4>
                    <p className="timeline-inst">{exp.institution}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="history-column">
              <h3 className="t-h3 column-title">Education</h3>
              <div className="timeline">
                {director.education.map((edu, i) => (
                  <div key={i} className="timeline-item">
                    <span className="timeline-date">{edu.years}</span>
                    <h4 className="timeline-role">{edu.degree}</h4>
                    <p className="timeline-inst">{edu.institution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE TEAM ─────────────────────────────────────── */}
      <section className="team-section section-lg">
        <div className="container">
          <div className="section-header center">
            <span className="section-label">Our People</span>
            <h2 className="t-h1">The Research Team</h2>
          </div>
          
          <div className="team-filters">
            <button className="filter-btn active">Research Scientists</button>
            <button className="filter-btn">Students</button>
            <button className="filter-btn">Staff Members</button>
          </div>

          <div className="team-gallery card" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface)' }}>
            <p className="t-muted">[Gallery: Lab Photos and Videos Placeholder]</p>
          </div>

          <div className="join-us card center" style={{ marginTop: '64px', background: 'var(--red-soft)', borderColor: 'var(--red-border)' }}>
            <h3 className="t-h3">Join Our Mission</h3>
            <p className="t-body" style={{ maxWidth: '600px', margin: '16px auto' }}>
              We are always looking for passionate researchers to join our mission. 
              Contact us to inquire about open positions.
            </p>
            <a href="/contact" className="btn btn-red">Inquire Now</a>
          </div>
        </div>
      </section>
    </main>
  );
}
