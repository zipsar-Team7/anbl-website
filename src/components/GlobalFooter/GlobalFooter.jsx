import { NavLink } from 'react-router-dom';
import { labData } from '../../data/labData';
import './GlobalFooter.css';
import logo from '../../assets/logo-footer.png';

const { labInfo } = labData;

const footerNav = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Research', to: '/research' },
  { label: 'Publications', to: '/publications' },
  { label: 'Contact', to: '/contact' },
];

export default function GlobalFooter() {
  return (
    <footer className="gfooter">
      <div className="gfooter__top container">
        {/* Brand */}
        <div className="gfooter__brand">
          <div className="gfooter__logo">
            <img src={logo} alt="ANBL Logo" className="gfooter__logo-img" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <p className="gfooter__desc">
            Integrating experimental biology with artificial intelligence to build the next generation of predictive biosafety and nanomedicine frameworks.
          </p>
          <div className="gfooter__links-inline">
            <a href={labInfo.contact.googleScholar} target="_blank" rel="noreferrer" className="gfooter__ext-link">
              Google Scholar ↗
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="gfooter__col">
          <p className="gfooter__col-title">Navigation</p>
          <ul>
            {footerNav.map(l => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} className="gfooter__nav-link">
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="gfooter__col">
          <p className="gfooter__col-title">Contact</p>
          <address className="gfooter__address">
            {labInfo.contact.address}
          </address>
          <div className="gfooter__emails">
            {labInfo.contact.emails.map(e => (
              <a key={e} href={`mailto:${e}`} className="gfooter__email">{e}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="gfooter__bottom">
        <div className="container gfooter__bottom-inner">
          <p className="gfooter__copy">
            © {new Date().getFullYear()} Advanced Nanomedicine & Biosafety Lab · Hanyang University, Seoul, Republic of Korea
          </p>
          <p className="gfooter__legal">
            All rights reserved · Academic use only
          </p>
        </div>
      </div>
    </footer>
  );
}
