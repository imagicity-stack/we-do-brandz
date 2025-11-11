import { Link } from 'react-router-dom';
import './AboutPreview.css';

export const AboutPreview = () => (
  <section className="section about-preview">
    <div className="main-container about-grid">
      <div>
        <span className="tag">About We do Brandz</span>
        <h2>Full-stack brand building for founders who want momentum.</h2>
        <p className="section-intro">
          We are a multi-disciplinary marketing agency pairing strategy with execution. Our creators, strategists, and
          engineers work together to build brands that stand out, perform, and stay consistent across every touchpoint.
        </p>
        <Link to="/about" className="primary-button">
          Discover our story
        </Link>
      </div>
      <div className="about-pillars">
        <div>
          <h3>Brand Strategy</h3>
          <p>Positioning, messaging, and identity systems designed to anchor your story.</p>
        </div>
        <div>
          <h3>Digital Growth</h3>
          <p>Paid and organic growth frameworks engineered to convert awareness into revenue.</p>
        </div>
        <div>
          <h3>Content Lab</h3>
          <p>Video, motion, and campaign content that keeps your brand culturally relevant.</p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutPreview;
