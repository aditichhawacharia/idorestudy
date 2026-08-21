import { useEffect, useState } from 'react';
import { ArrowRight, Coffee, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/study', label: 'Study room' },
  { to: '/resources', label: 'Study guides' },
  { to: '/about', label: 'About' },
];

function linkClass({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <NavLink to="/" end className="brand" aria-label="IdoréStudy home">
          <span className="brand-mark" aria-hidden="true"><Coffee size={20} /></span>
          <span className="brand-copy">
            <span className="brand-name">IdoréStudy</span>
            <span className="brand-tagline">K-pop study room</span>
          </span>
        </NavLink>

        <div className="nav-links">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/#choose-buddy" className="nav-primary">
            Choose a buddy <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <div id="mobile-navigation" className={`mobile-menu${open ? ' open' : ''}`}>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
            {link.label}
          </NavLink>
        ))}
        <Link to="/#choose-buddy" className="nav-primary">
          Choose a K-pop study buddy <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </nav>
  );
}
