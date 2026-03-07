import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import SearchBar from './SearchBar';
import { useLocalePath } from '../hooks/useLocalePath';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const buildPath = useLocalePath();
  const router = useRouter();
  const pathname = useMemo(() => router.asPath.split('?')[0], [router.asPath]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const isActive = (path: string) => pathname === buildPath(path) || pathname.startsWith(`${buildPath(path)}/`);

  return (
    <header className="header">
      <div className="main-container header-inner">
        <Link href={buildPath('/')} className="brand-mark" aria-label="We do Brandz home">
          <strong>We do Brandz</strong>
          <span>Strategy • Creative • Growth</span>
        </Link>

        <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={buildPath(link.href)} className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
              {link.label}
            </Link>
          ))}
          <div className="nav-search">
            <SearchBar autoFocus onNavigate={() => setIsNavOpen(false)} />
          </div>
        </nav>

        <div className="header-actions">
          <div className="search-desktop">
            <SearchBar />
          </div>
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
