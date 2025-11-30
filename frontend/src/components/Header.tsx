import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useLocalePath } from '../hooks/useLocalePath';
import './Header.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const buildPath = useLocalePath();

  useEffect(() => {
    setIsNavOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === buildPath(path) || location.pathname.startsWith(`${buildPath(path)}/`);

  return (
    <header className="header">
      <div className="main-container header-inner">
        <Link to={buildPath('/')} className="logo" aria-label="We do Brandz home">
          <img src="/logo.svg" alt="We do Brandz" className="logo-image" />
        </Link>

        <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`} aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={buildPath(link.href)}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="nav-search">
            <SearchBar autoFocus onNavigate={() => setIsNavOpen(false)} />
          </div>
        </nav>

        <div className="header-actions">
          <div className={`search-desktop ${isSearchOpen ? 'open' : ''}`}>
            <SearchBar onNavigate={() => setIsSearchOpen(false)} />
          </div>
          <button
            type="button"
            className={`search-toggle ${isSearchOpen ? 'open' : ''}`}
            aria-label="Toggle search"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="6" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" />
            </svg>
          </button>
          <button
            className={`mobile-toggle ${isNavOpen ? 'open' : ''}`}
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
