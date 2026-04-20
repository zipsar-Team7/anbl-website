import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './GlobalNav.css';
import logoDark from '../../assets/logo-new.png';
import logoLight from '../../assets/logo-footer-new.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/research', label: 'Research' },
  { to: '/publications', label: 'Publications' },
];

export default function GlobalNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isSolid = scrolled;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`gnav ${isSolid ? 'gnav--scrolled' : 'gnav--transparent'}`}>
      <div className="gnav__inner container">
        {/* Logo — Optimized with dual-rendering to prevent loading glitches */}
        <NavLink to="/" className="gnav__logo" id="nav-logo">
          <div className="logo-wrapper">
            <img
              src={logoDark}
              alt="ANBL Logo"
              className={`gnav__logo-img logo-dark ${isSolid ? 'visible' : 'hidden'}`}
            />
            <img
              src={logoLight}
              alt="ANBL Logo"
              className={`gnav__logo-img logo-light ${isSolid ? 'hidden' : 'visible'}`}
            />
          </div>
        </NavLink>

        {/* Desktop links */}
        <nav className="gnav__links" id="nav-desktop">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `gnav__link ${isActive ? 'gnav__link--active' : ''}`
              }
              id={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="gnav__right">
          <NavLink
            to="/contact"
            className="btn gnav__contact-btn"
            id="nav-contact"
          >
            Contact Us
          </NavLink>
          <button
            className={`gnav__hamburger ${open ? 'open' : ''}`}
            id="nav-mobile-toggle"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle navigation"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="gnav__mobile" id="nav-mobile-menu">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `gnav__mobile-link ${isActive ? 'gnav__mobile-link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="gnav__mobile-actions">
            <NavLink to="/contact" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }}>
              Contact Us
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
