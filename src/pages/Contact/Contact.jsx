import { labData } from '../../data/labData';
import './Contact.css';

const { labInfo } = labData;

export default function Contact() {
  return (
    <main className="contact-page">
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
            <span className="section-label">Collaboration</span>
            <h1 className="t-h1">Get in Touch</h1>
            <p className="t-body inner-hero__sub">
              Reach out for research collaborations, academic inquiries, or 
              inquiries regarding open research positions.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT GRID ────────────────────────────────── */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Column */}
            <div className="contact-info">
              <div className="info-card resource-card">
                <h3 className="t-h3">{labInfo.name}</h3>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Institution</span>
                    <p className="t-body">{labInfo.contact.institution}</p>
                    <p className="t-sm text-muted">{labInfo.contact.department}</p>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Address</span>
                    <p className="t-body">{labInfo.contact.address}</p>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Direct Communication</span>
                    <div className="email-stack">
                      {labInfo.contact.emails.map((email, i) => (
                        <a key={i} href={`mailto:${email}`} className="text-btn">{email}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="info-social" style={{ marginTop: '32px' }}>
                <a href={labInfo.contact.googleScholar} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg w-100">
                  Google Scholar Profile
                </a>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <form className="contact-form resource-card" onSubmit={(e) => e.preventDefault()}>
                <h3 className="t-h3" style={{ marginBottom: '32px' }}>Send a Message</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select>
                    <option>Research Collaboration</option>
                    <option>Academic Inquiry</option>
                    <option>Job Opportunity</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows="6" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn btn-red btn-lg w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
