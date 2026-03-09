import { FormEvent, useState } from 'react';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';

interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  message: ''
};

const Contact = () => {
  useMetaPageEvents('Contact', { params: { content_category: 'Contact' } });
  const [formState, setFormState] = useState<ContactFormState>(initialFormState);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitStatus('submitting');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formType: 'contact',
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      if (!response.ok) {
        throw new Error('Unable to submit right now.');
      }

      setFormState(initialFormState);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="main-container contact-hero-inner">
          <div>
            <span className="tag">Contact Us</span>
            <h1>Let&apos;s talk about what you&apos;re building</h1>
            <p>
              Share your requirements using the contact form and our team will get back within 24 hours with recommendations
              tailored to your brand and growth stage.
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
            <form className="contact-form" style={{ marginTop: '1.25rem' }} onSubmit={handleSubmit}>
              <label>
                Full Name
                <input
                  name="name"
                  required
                  value={formState.name}
                  onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))}
                />
              </label>
              <label>
                Email Address
                <input
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
                />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
                />
              </label>
              <div className="form-actions">
                <button className="primary-button" type="submit" disabled={submitStatus === 'submitting'}>
                  {submitStatus === 'submitting' ? 'Submitting…' : 'Submit'}
                </button>
              </div>
              {submitStatus === 'success' && <p className="form-success">Thank you! We&apos;ll contact you soon.</p>}
              {submitStatus === 'error' && <p className="form-error">Unable to send right now. Please email us directly.</p>}
            </form>
          </div>
          <div className="card">
            <h3>Business information</h3>
            <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)' }}>
              We do Brandz operates under <strong>IMAGICITY</strong>, a proprietorship firm in India, run by Dewesh Karan.
            </p>
            <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)' }}>
              Address: Kolghatti, Near Black Water Tank, Reformatory School, Hazaribagh, Jharkhand, 825301, India.
            </p>
            <p style={{ marginTop: '0.8rem', color: 'var(--text-muted)' }}>Registered GST Number: 20JVPPK2424H1ZM</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
