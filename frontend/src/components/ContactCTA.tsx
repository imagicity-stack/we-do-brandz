import { Link } from 'react-router-dom';
import './ContactCTA.css';

export const ContactCTA = () => (
  <section className="section contact-cta">
    <div className="main-container cta-inner">
      <div>
        <span className="tag">Let&apos;s build your next chapter</span>
        <h2>Ready for a brand that looks sharp and performs even better?</h2>
        <p className="section-intro">
          Tell us about your goals and we&apos;ll recommend the ideal brand, digital, and content mix to make them happen.
        </p>
      </div>
      <Link to="/contact" className="primary-button">
        Start a project
      </Link>
    </div>
  </section>
);

export default ContactCTA;
