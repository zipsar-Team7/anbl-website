import { labData } from '../../data/labData';
import './Contact.css';

const { labInfo } = labData;

export default function Contact() {
  return (
    <main className="contact-page section-lg">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Collaboration</span>
          <h1 className="t-h1">Get in Touch</h1>
          <p className="t-body" style={{ marginTop: 24, maxWidth: '600px' }}>
            Reach out for research collaborations, academic inquiries, or job opportunities.
          </p>
        </div>

        <div className="contact-grid" style={{ marginTop: 80 }}>
          <div className="contact-info">
            <div className="contact-card card">
              <h3 className="t-h3">{labInfo.name}</h3>
              <div className="contact-details">
                <div className="detail-item">
                  <strong>Department:</strong>
                  <span>{labInfo.contact.department}</span>
                </div>
                <div className="detail-item">
                  <strong>Institution:</strong>
                  <span>{labInfo.contact.institution}</span>
                </div>
                <div className="detail-item">
                  <strong>Address:</strong>
                  <span>{labInfo.contact.address}</span>
                </div>
                <div className="detail-item">
                  <strong>Emails:</strong>
                  {labInfo.contact.emails.map((email, i) => (
                    <a key={i} href={`mailto:${email}`}>{email}</a>
                  ))}
                </div>
              </div>
            </div>

            <div className="social-links" style={{ marginTop: 32 }}>
              <a href={labInfo.contact.googleScholar} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-lg">
                View Google Scholar Profile
              </a>
            </div>
          </div>

          <div className="contact-form-container">
            <form className="contact-form card">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your Email" />
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
                <textarea rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-red btn-lg" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
