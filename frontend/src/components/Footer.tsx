import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="main-container footer-inner">
        <div className="footer-brand">
          <h3>We do Brandz</h3>
          <p>We partner with ambitious founders and marketing teams to build magnetic brands that scale.</p>
        </div>
        <div className="footer-links">
          <h4>Policies</h4>
          <div className="policy-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms and Conditions</Link>
            <Link to="/refund-and-return-policy">Refund and Return Policy</Link>
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
