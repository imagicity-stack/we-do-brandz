import ContactForm from '../components/ContactForm';
import './Contact.css';

const Contact = () => (
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
              <p>Monday to Saturday, 10 AM – 7 PM IST</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>hello@wedobrandz.com</p>
            </div>
            <div>
              <h3>WhatsApp</h3>
              <p>+91 91222 89578</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  </main>
);

export default Contact;
