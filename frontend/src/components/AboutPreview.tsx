import Link from 'next/link';
import { useLocalePath } from '../hooks/useLocalePath';

export const AboutPreview = () => {
  const buildPath = useLocalePath();
  return (
    <section className="section">
      <div className="main-container about-preview">
        <div>
          <span className="tag">About We do Brandz</span>
          <h2>We blend strategic thinking with sharp execution.</h2>
          <p>
            Our in-house team of brand strategists, designers, developers, and media specialists build high-performing funnels
            tailored to your goals. From identity design to paid acquisition, we ship tangible outcomes.
          </p>
          <Link href={buildPath('/about')} className="primary-button">
            Learn about our approach
          </Link>
        </div>
        <div className="about-stats">
          <div>
            <span className="stat-value">12+</span>
            <span className="stat-label">industries served</span>
          </div>
          <div>
            <span className="stat-value">250+</span>
            <span className="stat-label">brand assets launched</span>
          </div>
          <div>
            <span className="stat-value">5+</span>
            <span className="stat-label">years of execution</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
