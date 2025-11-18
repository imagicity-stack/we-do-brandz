import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalePath } from '../hooks/useLocalePath';
import './Header.css';

const menuItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' }
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buildPath = useLocalePath();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="header">
      <div className="main-container header-inner">
        <Link to={buildPath('/')} className="logo" onClick={closeMenu}>
          <span className="logo-mark">We do</span>
          <span className="logo-accent">Brandz</span>
        </Link>
        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={buildPath(item.path)}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              onClick={closeMenu}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className={`mobile-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu} aria-label="Toggle menu">
          <span />
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
