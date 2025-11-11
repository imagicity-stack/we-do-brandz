import { FormEvent, useState } from 'react';
import './ContactForm.css';

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

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialState);
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
          <input name="phone" value={form.phone} onInput={handleChange} required placeholder="+91 98765 43210" />
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
      <button className="primary-button" type="submit">
        Submit inquiry
      </button>
      {submitted && <p className="form-success">Thank you! We&apos;ll get in touch within one business day.</p>}
    </form>
  );
};

export default ContactForm;
