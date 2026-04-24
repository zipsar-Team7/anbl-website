import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './GlobalNav.css';
import logoDark from '../../assets/logo-new.png';
import logoLight from '../../assets/logo-footer-new.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Principal Investigator' },
  { to: '/research', label: 'Research' },
  { to: '/team', label: 'Research Team' },
  { to: '/projects', label: 'Projects' },
  { to: '/webtool', label: 'Web Tools' },
  { to: '/publications', label: 'Publications' },
  { to: '/opportunities', label: 'Opportunities' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact Us' },
];

export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="gnav">
      <div className="gnav__inner">
        <NavLink to="/" className="gnav__logo" id="nav-logo">
          <div className="logo-wrapper">
            <img
              src={logoDark}
              alt="ANBL Logo"
              className="gnav__logo-img logo-dark visible"
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
        </div>
      )}
    </header>
  );
}
