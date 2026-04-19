import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './GlobalNav.css';
import logoDark from '../../assets/logo.png';
import logoLight from '../../assets/logo-footer.png';

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

  const isHome = location.pathname === '/';
  // Force scrolled state on non-home pages
  const isSolid = !isHome || scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // close on route change
  useEffect(() => setOpen(false), [location]);

  return (
    <header className={`gnav ${isSolid ? 'gnav--scrolled' : ''}`}>
      <div className="gnav__inner container">
        {/* Logo */}
        <NavLink to="/" className="gnav__logo" id="nav-logo">
          <img 
            src={isSolid ? logoDark : logoLight} 
            alt="ANBL Logo" 
            className="gnav__logo-img" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
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

        {/* Right slot */}
        <div className="gnav__right">
          <NavLink
            to="/contact"
            className="btn btn-white btn-sm gnav__contact-btn"
            id="nav-contact"
          >
            Get Started
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
            <NavLink to="/contact" className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
              Contact Us
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
