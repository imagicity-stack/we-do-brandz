import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/#work', label: 'Work' },
  { href: '/#contact', label: 'Contact' }
];

export const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();
  const pathname = useMemo(() => router.asPath.split('?')[0], [router.asPath]);

  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  return (
    <header className="header">
      <div className="main-container header-inner">
        <Link href="/" className="brand-mark" aria-label="We do Brandz home">
          <span className="brand-orb" aria-hidden="true" />
          <div>
            <strong>We do Brandz</strong>
            <span>Creative direction + digital craft</span>
          </div>
        </Link>

        <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a href="mailto:connect@wedobrandz.com" className="header-mail-link">
            connect@wedobrandz.com
          </a>
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
