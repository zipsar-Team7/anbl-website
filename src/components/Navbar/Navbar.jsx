import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
  {
    label: 'Our Services',
    dropdown: [
      { label: 'Undergraduate Admissions', href: '#' },
      { label: 'Postgraduate Admissions', href: '#' },
      { label: 'College IV Trips', href: '#' },
      { label: 'Spiritual Circuits', href: '#' },
      { label: 'School Programs', href: '#' },
    ],
  },
  {
    label: 'About Us',
    dropdown: [
      { label: 'Our Story', href: '#about' },
      { label: 'Our Team', href: '#' },
      { label: 'Our Results', href: '#' },
      { label: 'Student Stories', href: '#' },
    ],
  },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog & Guides', href: '#' },
      { label: 'Upcoming Events', href: '#' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="announcement-bar">
        <span>Shaping futures, one student at a time. &nbsp;—&nbsp;</span>
        <a href="#contact">Book a Free Consultation →</a>
      </div>

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo" id="nav-logo">
            <div className="navbar__logo-icon">A</div>
            <div className="navbar__logo-text">
              <span className="navbar__logo-name">ANBL</span>
              <span className="navbar__logo-tagline">Education</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="navbar__links" id="nav-desktop">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="navbar__item"
                onMouseEnter={() => setOpenMenu(link.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button className="navbar__link" id={`nav-${link.label.replace(/\s/g, '-').toLowerCase()}`}>
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  </svg>
                </button>
                {openMenu === link.label && (
                  <div className="navbar__dropdown">
                    {link.dropdown.map((item) => (
                      <a key={item.label} href={item.href} className="navbar__dropdown-item">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#contact" className="navbar__link" id="nav-contact">Contact</a>
          </nav>

          {/* CTA */}
          <a href="#contact" className="btn btn--primary navbar__cta" id="nav-cta">
            Get Started
          </a>

          {/* Mobile Hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
            id="nav-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="navbar__mobile" id="nav-mobile-menu">
            {navLinks.map((link) => (
              <div key={link.label} className="navbar__mobile-group">
                <p className="navbar__mobile-label">{link.label}</p>
                {link.dropdown.map((item) => (
                  <a key={item.label} href={item.href} className="navbar__mobile-item" onClick={() => setMobileOpen(false)}>
                    {item.label}
                  </a>
                ))}
              </div>
            ))}
            <a href="#contact" className="btn btn--primary navbar__mobile-cta" onClick={() => setMobileOpen(false)}>
              Get Started
            </a>
          </div>
        )}
      </header>
    </>
  );
}
