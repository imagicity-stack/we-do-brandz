import { useRouter } from 'next/router';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { findSubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { formatCurrency, localizePriceLabel } from '../utils/currency';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';
import { trackMetaEvent } from '../utils/metaPixel';

type BookingFormState = {
  name: string;
  contactNumber: string;
  email: string;
  brand: string;
  message: string;
  acceptedTerms: boolean;
};

const initialFormState: BookingFormState = {
  name: '',
  contactNumber: '',
  email: '',
  brand: '',
  message: '',
  acceptedTerms: false
};

const REELS_VFX_ADD_ON_INR = 400;

const ServiceDetail = () => {
  const locale = useLocale();
  const buildPath = useLocalePath();
  const router = useRouter();
  const serviceSlugParam = router.query.serviceSlug;
  const subServiceSlugParam = router.query.subServiceSlug;
  const serviceSlug = typeof serviceSlugParam === 'string' ? serviceSlugParam : '';
  const subServiceSlug = typeof subServiceSlugParam === 'string' ? subServiceSlugParam : '';
  const isReady = router.isReady && Boolean(serviceSlug) && Boolean(subServiceSlug);
  const match = useMemo(
    () => (isReady ? findSubService(serviceSlug, subServiceSlug) : null),
    [isReady, serviceSlug, subServiceSlug]
  );
  const [form, setForm] = useState<BookingFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addVfx, setAddVfx] = useState(false);
  const isReelsEditing = match?.subService.slug === 'reels-editing';
  const totalAmountInINR = (match?.subService.priceInINR ?? 0) + (isReelsEditing && addVfx ? REELS_VFX_ADD_ON_INR : 0);
  const totalAmountLabel = formatCurrency(locale, totalAmountInINR);
  const addOnLabel = formatCurrency(locale, REELS_VFX_ADD_ON_INR);
  const metaEventValue = totalAmountInINR;
  const metaEventCurrency = locale === 'in' ? 'INR' : 'USD';

  useEffect(() => {
    if (isReady) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [isReady, serviceSlug, subServiceSlug]);

  useMetaPageEvents(match?.subService.name ?? 'Service detail', {
    params: {
      content_category: match?.category.name ?? 'Service detail',
      ...(match ? { value: metaEventValue, currency: metaEventCurrency } : {})
    }
  });

  if (!isReady) {
    return (
      <main className="service-detail">
        <section className="section">
          <div className="main-container">Loading...</div>
        </section>
      </main>
    );
  }

  if (!match) {
    return (
      <main className="service-detail">
        <section className="section">
          <div className="main-container">
            <div className="card">
              <h1>Service not found</h1>
              <p>The service you are looking for is unavailable or has been moved.</p>
              <button className="primary-button" onClick={() => router.push(buildPath('/services'))}>
                Back to services
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const { category, subService } = match;
  const localizedPriceLabel = localizePriceLabel(locale, subService.priceLabel);
  const localizedPriceNote = subService.priceNote ? localizePriceLabel(locale, subService.priceNote) : null;
  const actionButtonLabel = 'Inquire now';
  const isActionDisabled = isSubmitting;

  useEffect(() => {
    setAddVfx(false);
  }, [subService.id]);

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.currentTarget as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const sendEmailSubmission = async () => {
    const payload = {
      formType: 'service-booking',
      locale,
      serviceSlug,
      subServiceSlug,
      serviceName: subService.name,
      categoryName: category.name,
      totalAmountLabel,
      addVfx: isReelsEditing ? (addVfx ? 'yes' : 'no') : undefined,
      ...form
    };

    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.error || 'Unable to submit your booking request. Please try again.');
    }
  };

  const buildMetaUserData = () => {
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const lastName = rest.length ? rest.join(' ') : undefined;

    return {
      email: form.email || undefined,
      phone: form.contactNumber || undefined,
      firstName,
      lastName
    };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.acceptedTerms) {
      setError('Please accept the terms and conditions to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmailSubmission();
      const userData = buildMetaUserData();

      trackMetaEvent(
        'Lead',
        {
          content_name: subService.name,
          content_category: category.name,
          value: metaEventValue,
          currency: metaEventCurrency
        },
        userData
      );

      trackMetaEvent('Contact', {
        content_name: subService.name,
        content_category: category.name
      }, userData);

      setSuccess('Thanks! Our team will connect with you shortly to continue.');
      setForm(initialFormState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="service-detail">
      <section className="detail-hero">
        <div className="main-container">
          <span className="tag">{category.name}</span>
          <h1>{subService.name}</h1>
          <p>{subService.description}</p>
          <div className="detail-meta">
            <div>
              <span className="meta-label">Investment</span>
              <span className="meta-value">{localizedPriceLabel}</span>
            </div>
            <div>
              <span className="meta-label">Timeline</span>
              <span className="meta-value">{subService.deliveryTimeline.replace('Delivery: ', '')}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="main-container detail-layout">
          <div className="card detail-list">
            <h2>What&apos;s included</h2>
            <ul>
              {subService.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {localizedPriceNote && <p className="detail-note">{localizedPriceNote}</p>}
          </div>
          <div className="card detail-form-card">
            <h2>Inquire about this service</h2>
            <p>
              Share your details and we will connect with you to plan the next steps.
            </p>
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  Full Name
                  <input
                    name="name"
                    value={form.name}
                    onInput={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </label>
                <label>
                  Contact Number
                  <input
                    name="contactNumber"
                    value={form.contactNumber}
                    onInput={handleChange}
                    required
                    placeholder="Mobile or WhatsApp"
                  />
                </label>
                <label>
                  Email ID
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onInput={handleChange}
                    required
                    placeholder="name@company.com"
                  />
                </label>
                <label>
                  Brand / Company / Person
                  <input
                    name="brand"
                    value={form.brand}
                    onInput={handleChange}
                    required
                    placeholder="Business or personal brand"
                  />
                </label>
              </div>
              <label>
                Special message
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onInput={handleChange}
                  placeholder="Share goals, context, or campaign ideas"
                  required
                />
              </label>
              {isReelsEditing && (
                <label className="checkbox">
                  <input
                    type="checkbox"
                    name="addVfx"
                    checked={addVfx}
                    onChange={(event) => setAddVfx(event.currentTarget.checked)}
                  />
                  <span>Add VFX (+{addOnLabel})</span>
                </label>
              )}
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={form.acceptedTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the{' '}
                  <a href={buildPath('/terms-and-conditions')} target="_blank" rel="noreferrer">
                    terms and conditions
                  </a>{' '}
                  and{' '}
                  <a href={buildPath('/privacy-policy')} target="_blank" rel="noreferrer">
                    privacy policy
                  </a>
                  .
                </span>
              </label>
              {error && <p className="form-error">{error}</p>}
              <button className="primary-button" type="submit" disabled={isActionDisabled}>
                {isSubmitting ? 'Processing…' : actionButtonLabel}
              </button>
              {success && <p className="form-success">{success}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
