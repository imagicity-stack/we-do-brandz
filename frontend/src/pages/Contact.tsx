import ContactForm from '../components/ContactForm';
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
              Fill out the form and our team will get back within 24 hours with recommendations tailored to your brand and
              growth goals.
            </p>
            <div className="contact-details">
              <div>
                <h3>Office hours</h3>
                <p>Monday to Friday, 9 AM – 6 PM ET</p>
              </div>
              <div>
                <h3>Email</h3>
                <p>hello@wedobrandz.com</p>
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (415) 555-0198</p>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
};

export default Contact;
