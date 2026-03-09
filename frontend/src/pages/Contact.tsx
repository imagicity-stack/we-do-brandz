import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

const Contact = () => {
  useMetaPageEvents('Contact', { params: { content_category: 'Contact' } });

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="main-container contact-hero-inner">
          <div>
            <span className="tag">Contact Us</span>
            <h1>Let&apos;s talk about what you&apos;re building</h1>
            <p>
              Share your goals over email and our team will get back within 24 hours with recommendations tailored to your
              brand and growth stage.
            </p>
            <div className="contact-details">
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:connect@wedobrandz.com">connect@wedobrandz.com</a>
                </p>
              </div>
              <div>
                <h3>Response time</h3>
                <p>Within 24 business hours</p>
              </div>
            </div>
            <div className="form-actions" style={{ marginTop: '1rem' }}>
              <a href="mailto:connect@wedobrandz.com" className="primary-button">
                Email our team
              </a>
            </div>
          </div>
          <div className="card">
            <h3>What to include in your email</h3>
            <ul style={{ marginTop: '0.8rem', paddingLeft: '1rem', color: 'var(--text-muted)' }}>
              <li>Your brand/business name</li>
              <li>Service(s) you need</li>
              <li>Expected timeline</li>
              <li>Any references or requirements</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
