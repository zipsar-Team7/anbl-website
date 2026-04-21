import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./GlobalNav.css";
import logoDark from "../../assets/logo-new.png";
import logoLight from "../../assets/logo-footer-new.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/pi", label: "Principal Investigator" },
  { to: "/research", label: "Research" },
  { to: "/projects", label: "Projects" },
  { to: "/publications", label: "Publications" },
  { to: "/news", label: "News" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/contact", label: "Contact" },
];

export default function GlobalNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location]);

  return (
    <header className="gnav">
      <div className="gnav__inner container">
        {/* Logo — Optimized with dual-rendering to prevent loading glitches */}
        <NavLink to="/" className="gnav__logo" id="nav-logo">
          <div className="logo-wrapper">
            <img src={logoDark} alt="ANBL Logo" className="gnav__logo-img" />
          </div>
        </NavLink>

        {/* Desktop links */}
        <nav className="gnav__links" id="nav-desktop">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `gnav__link ${isActive ? "gnav__link--active" : ""}`
              }
              id={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="gnav__right">
          <button
            className={`gnav__hamburger ${open ? "open" : ""}`}
            id="nav-mobile-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="gnav__mobile" id="nav-mobile-menu">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `gnav__mobile-link ${isActive ? "gnav__mobile-link--active" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="gnav__mobile-actions">
            <NavLink
              to="/contact"
              className="btn btn-red"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
