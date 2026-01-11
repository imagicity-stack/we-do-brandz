import { FormEvent, useState } from 'react';
import { CallRequestPayload } from '../utils/callRequest';
import { getBasicValidationError } from '../utils/formValidation';
import { trackMetaEvent } from '../utils/metaPixel';
import { formatInternationalPhone, PHONE_COUNTRY_OPTIONS } from '../utils/phone';

interface FormState {
  name: string;
  email: string;
  phoneCountry: string;
  phoneNumber: string;
  company: string;
  message: string;
}

const initialState: FormState = {
  name: '',
  email: '',
  phoneCountry: PHONE_COUNTRY_OPTIONS[0]?.dialCode ?? '+1',
  phoneNumber: '',
  company: '',
  message: ''
};

export const ContactForm = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callSuccess, setCallSuccess] = useState<string | null>(null);
  const [callError, setCallError] = useState<string | null>(null);
  const [submittingAction, setSubmittingAction] = useState<null | 'email' | 'call'>(null);
  const isSubmitting = submittingAction !== null;

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formattedPhone = formatInternationalPhone(form.phoneCountry, form.phoneNumber);

  const buildCallPayload = (): CallRequestPayload => ({
    name: form.name,
    phone: formattedPhone,
    email: form.email,
    category: 'General',
    sub_category: 'General',
    message: form.message,
    form_source: 'Website Contact Form',
    page_url: window.location.href
  });

  const validateForm = () => getBasicValidationError(form.name, form.phoneNumber, form.phoneCountry, form.email);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);
    setCallSuccess(null);
    setCallError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmittingAction('email');

    try {
      const payload = {
        formType: 'contact',
        name: form.name,
        email: form.email,
        phone: formattedPhone,
        company: form.company,
        message: form.message
      };

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.error || 'Unable to send your message. Please try again.');
      }

      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      const lastName = rest.length ? rest.join(' ') : undefined;
      const userData = {
        email: form.email,
        phone: formattedPhone,
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
      setSubmittingAction(null);
    }
  };

  const handleCallRequest = async () => {
    setError(null);
    setSubmitted(false);
    setCallSuccess(null);
    setCallError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_GET_CALL_URL;
    if (!webhookUrl) {
      setCallError('Unable to request a call right now. Please try again.');
      return;
    }

    setSubmittingAction('call');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildCallPayload())
      });

      if (!response.ok) {
        throw new Error('Unable to request a call right now. Please try again.');
      }

      setCallSuccess('Thank you. We will call you shortly.');
      setForm(initialState);
    } catch (submissionError) {
      setCallError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to request a call right now. Please try again.'
      );
    } finally {
      setSubmittingAction(null);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Full Name
          <input name="name" value={form.name} onInput={handleChange} required placeholder="Taylor Johnson" />
        </label>
        <label>
          Email Address
          <input name="email" type="email" value={form.email} onInput={handleChange} required placeholder="taylor@brand.com" />
        </label>
        <label>
          Phone Number
          <div className="phone-input">
            <div className="phone-code">
              <span aria-hidden="true">{form.phoneCountry}</span>
              <select name="phoneCountry" value={form.phoneCountry} onChange={handleChange} aria-label="Country">
                {PHONE_COUNTRY_OPTIONS.map((option) => (
                  <option key={option.code} value={option.dialCode}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              name="phoneNumber"
              value={form.phoneNumber}
              onInput={handleChange}
              required
              inputMode="tel"
              placeholder="555 123 4567"
            />
          </div>
        </label>
        <label>
          Company / Brand
          <input name="company" value={form.company} onInput={handleChange} required placeholder="Brandz Labs" />
        </label>
      </div>
      <label>
        How can we help?
        <textarea name="message" value={form.message} onInput={handleChange} rows={4} placeholder="Tell us about your goals" />
      </label>
      <p className="form-helper">Message is optional but recommended.</p>
      <div className="form-actions">
        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {submittingAction === 'email' ? 'Processing…' : 'Inquire Now'}
        </button>
        <button className="secondary-button" type="button" onClick={handleCallRequest} disabled={isSubmitting}>
          {submittingAction === 'call' ? 'Requesting…' : 'Get a CALL'}
        </button>
      </div>
      {error && <p className="form-error">{error}</p>}
      {submitted && <p className="form-success">Thank you! We&apos;ll get in touch within one business day.</p>}
      {callError && <p className="form-error">{callError}</p>}
      {callSuccess && <p className="form-success">{callSuccess}</p>}
    </form>
  );
};

export default ContactForm;
