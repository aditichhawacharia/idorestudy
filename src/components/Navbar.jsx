import { useEffect, useState } from 'react';
import { BookOpen, Coffee, Menu, Timer, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/resources', label: 'Study guides' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

function linkClass({ isActive }) {
  return `nav-link${isActive ? ' active' : ''}`;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <NavLink to="/" className="brand" aria-label="IdoréStudy home">
          <span className="brand-mark" aria-hidden="true"><Coffee size={21} /></span>
          <span className="brand-copy">
            <span className="brand-name">IdoréStudy</span>
            <span className="brand-tagline">Focus room and study guides</span>
          </span>
        </NavLink>

        <div className="nav-links">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/study" className={({ isActive }) => `nav-link nav-cta${isActive ? ' active' : ''}`}>
            <Timer size={16} aria-hidden="true" /> Open study room
          </NavLink>
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
            <BookOpen size={15} aria-hidden="true" /> {link.label}
          </NavLink>
        ))}
        <NavLink to="/study" className="nav-link nav-cta">
          <Timer size={16} aria-hidden="true" /> Open study room
        </NavLink>
      </div>
    </nav>
  );
}
