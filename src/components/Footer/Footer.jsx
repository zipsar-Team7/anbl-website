import './Footer.css';

const footerLinks = {
  Services: [
    { label: 'Undergraduate Admissions', href: '#' },
    { label: 'Postgraduate Admissions', href: '#' },
    { label: 'College IV Trips', href: '#' },
    { label: 'Spiritual Circuits', href: '#' },
    { label: 'School Programs', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#' },
    { label: 'Student Stories', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Resources: [
    { label: 'Blog & Guides', href: '#' },
    { label: 'Upcoming Events', href: '#' },
    { label: 'Contact Us', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer__top">
        <div className="footer__inner">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <div className="footer__logo-icon">A</div>
              <div>
                <div className="footer__logo-name">ANBL Education</div>
                <div className="footer__logo-tagline">Shaping futures, globally.</div>
              </div>
            </div>
            <p className="footer__desc">
              Empowering students across India to reach the world's best universities through expert counselling, curated packages, and end‑to‑end support.
            </p>
            <div className="footer__social">
              {['instagram', 'linkedin', 'youtube', 'facebook'].map(s => (
                <a key={s} href="#" className="footer__social-link" aria-label={s} id={`footer-${s}`}>
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <circle cx="12" cy="12" r="10" opacity="0.15"/>
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="currentColor">{s[0].toUpperCase()}</text>
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="footer__col">
              <h4 className="footer__col-title">{section}</h4>
              <ul className="footer__col-list">
                {links.map(link => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__col-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__inner footer__bottom-inner">
          <p className="footer__copy">© 2026 ANBL Education. All rights reserved.</p>
          <div className="footer__legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
