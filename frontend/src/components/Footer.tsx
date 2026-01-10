import Link from 'next/link';
import { useLocalePath } from '../hooks/useLocalePath';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const buildPath = useLocalePath();

  return (
    <footer className="footer">
      <div className="main-container footer-inner">
        <div className="footer-brand">
          <p>We partner with ambitious founders and marketing teams to build magnetic brands that scale.</p>
        </div>
        <div className="footer-links">
          <h4>Policies</h4>
          <div className="policy-links">
            <Link href={buildPath('/privacy-policy')}>Privacy Policy</Link>
            <Link href={buildPath('/terms-and-conditions')}>Terms and Conditions</Link>
            <Link href={buildPath('/refund-and-return-policy')}>Refund and Return Policy</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="main-container footer-bottom-inner">
          <span>© {currentYear} We do Brandz. All rights reserved.</span>
          <span className="footer-tagline">Strategy. Story. Scale.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
