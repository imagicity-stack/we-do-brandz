import { Link } from 'react-router-dom';
import './Hero.css';

export const Hero = () => (
  <section className="hero">
    <div className="main-container hero-inner">
      <div className="hero-copy">
        <span className="tag">Strategic Brand & Growth Studio</span>
        <h1>We craft magnetic brands and full-funnel marketing that scales.</h1>
        <p>
          We do Brandz helps founders and marketing teams build premium brand identities, digital experiences, and content
          engines that convert attention into loyal customers.
        </p>
        <div className="hero-actions">
          <Link to="/services" className="primary-button">
            Explore Services
          </Link>
          <Link to="/contact" className="secondary-button">
            Book a Discovery Call
          </Link>
        </div>
      </div>
      <div className="hero-card">
        <div className="hero-stats">
          <div>
            <span className="stat-value">50+</span>
            <span className="stat-label">brands elevated</span>
          </div>
          <div>
            <span className="stat-value">90%</span>
            <span className="stat-label">client retention</span>
          </div>
          <div>
            <span className="stat-value">4x</span>
            <span className="stat-label">avg ROI on paid media</span>
          </div>
        </div>
        <div className="hero-highlight">
          <p>
            "They don&apos;t just launch campaigns. They partner with you to own the brand narrative and create real business
            impact."
          </p>
          <span className="hero-highlight-author">— Founder, D2C Beauty Brand</span>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
