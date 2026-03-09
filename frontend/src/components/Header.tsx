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

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="header">
      <div className="main-container header-inner">
        <a href="/" className="brand-mark" aria-label="We do Brandz home" onClick={() => setIsNavOpen(false)}>
          <span className="brand-orb" aria-hidden="true" />
          <div>
            <strong>We do Brandz</strong>
            <span>Creative direction + digital craft</span>
          </div>
        </a>

        <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`} aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
              onClick={() => setIsNavOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a href="/contact" className="header-cta" onClick={() => setIsNavOpen(false)}>
            Start your project
          </a>
          <button
            className={`mobile-toggle ${isNavOpen ? 'open' : ''}`}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isNavOpen}
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
