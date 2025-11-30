import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLocalePath } from '../hooks/useLocalePath';
import SearchBar from './SearchBar';
import './Header.css';

const menuItems = [
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact Us', path: '/contact' }
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const buildPath = useLocalePath();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);
  const toggleDesktopSearch = () => setIsDesktopSearchOpen((prev) => !prev);
  const closeDesktopSearch = () => setIsDesktopSearchOpen(false);

  return (
    <header className="header">
      <div className="main-container header-inner">
        <button
          className={`mobile-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
        <Link to={buildPath('/')} className="logo" onClick={closeMenu}>
          <img src="/logo.svg" alt="We do Brandz" className="logo-image" />
        </Link>
        <div className="header-actions">
          <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
            <div className="nav-header">
              <Link to={buildPath('/')} className="nav-logo" onClick={closeMenu}>
                <img src="/logo.svg" alt="We do Brandz" />
              </Link>
              <button type="button" className="nav-close" onClick={toggleMenu} aria-label="Close menu">
                <span />
                <span />
              </button>
            </div>
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
            <div className="search-mobile">
              <SearchBar onNavigate={closeMenu} />
            </div>
          </nav>
          <button
            type="button"
            className={`search-toggle ${isDesktopSearchOpen ? 'open' : ''}`}
            onClick={toggleDesktopSearch}
            aria-label={isDesktopSearchOpen ? 'Close search' : 'Open search'}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l4.25 4.25a1 1 0 0 0 1.42-1.42L15.5 14Zm-6 0a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className={`search-desktop ${isDesktopSearchOpen ? 'open' : ''}`}>
            <SearchBar onNavigate={() => { closeMenu(); closeDesktopSearch(); }} autoFocus={isDesktopSearchOpen} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
