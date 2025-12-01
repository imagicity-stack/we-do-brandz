import { FormEvent, useState } from 'react';
import { trackMetaEvent } from '../utils/metaPixel';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
};

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ formType: 'contact', ...form })
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Unable to send your message. Please try again.');
      }

      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      const lastName = rest.length ? rest.join(' ') : undefined;
      const userData = {
        email: form.email,
        phone: form.phone,
        firstName,
        lastName
      };

      setSubmitted(true);
      setForm(initialState);
      trackMetaEvent('Lead', undefined, userData);
      trackMetaEvent('Contact', undefined, userData);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Something went wrong while sending your request. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" value={form.name} onInput={handleChange} required placeholder="Aditi Sharma" />
        </label>
        <label>
          Email Address
          <input name="email" type="email" value={form.email} onInput={handleChange} required placeholder="aditi@brand.com" />
        </label>
        <label>
          Phone Number
          <input name="phone" value={form.phone} onInput={handleChange} required placeholder="+91 91222 89578" />
        </label>
        <label>
          Company / Brand
          <input name="company" value={form.company} onInput={handleChange} required placeholder="Brandz Labs" />
        </label>
      </div>
      <label>
        How can we help?
        <textarea name="message" value={form.message} onInput={handleChange} required rows={4} placeholder="Tell us about your goals" />
      </label>
      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Submit inquiry'}
      </button>
      {error && <p className="form-error">{error}</p>}
      {submitted && <p className="form-success">Thank you! We&apos;ll get in touch within one business day.</p>}
    </form>
  );
};

export default ContactForm;
