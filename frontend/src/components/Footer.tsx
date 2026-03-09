import Link from 'next/link';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="main-container footer-inner">
        <div className="footer-brand">
          <h4>We do Brandz</h4>
          <p>Beautiful strategy, sharp storytelling, and growth systems designed for bold brands.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <div className="policy-links">
            <Link href="/services">Services</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <div className="policy-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/refund-and-return-policy">Refund Policy</Link>
          </div>
        </div>
        <div className="footer-links">
          <h4>Connect</h4>
          <div className="policy-links">
            <a href="mailto:connect@wedobrandz.com">connect@wedobrandz.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="main-container footer-bottom-inner">
          <span>© {currentYear} We do Brandz. All rights reserved.</span>
          <span className="footer-tagline">Made to be remembered.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
