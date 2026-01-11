import { useRouter } from 'next/router';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { findSubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { formatCurrency, localizePriceLabel } from '../utils/currency';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';
import { trackMetaEvent } from '../utils/metaPixel';
import { CallRequestPayload } from '../utils/callRequest';
import { getBasicValidationError } from '../utils/formValidation';
import { formatInternationalPhone, PHONE_COUNTRY_OPTIONS } from '../utils/phone';

type BookingFormState = {
  name: string;
  phoneCountry: string;
  contactNumber: string;
  email: string;
  brand: string;
  message: string;
  acceptedTerms: boolean;
};

const initialFormState: BookingFormState = {
  name: '',
  phoneCountry: PHONE_COUNTRY_OPTIONS[0]?.dialCode ?? '+1',
  contactNumber: '',
  email: '',
  brand: '',
  message: '',
  acceptedTerms: false
};

const REELS_VFX_ADD_ON_USD = 5;

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
  const [callError, setCallError] = useState<string | null>(null);
  const [callSuccess, setCallSuccess] = useState<string | null>(null);
  const [submittingAction, setSubmittingAction] = useState<null | 'email' | 'call'>(null);
  const isSubmitting = submittingAction !== null;
  const [addVfx, setAddVfx] = useState(false);
  const isReelsEditing = match?.subService.slug === 'reels-editing';
  const totalAmountInUSD = (match?.subService.priceInUSD ?? 0) + (isReelsEditing && addVfx ? REELS_VFX_ADD_ON_USD : 0);
  const totalAmountLabel = formatCurrency(totalAmountInUSD);
  const addOnLabel = formatCurrency(REELS_VFX_ADD_ON_USD);
  const metaEventValue = totalAmountInUSD;
  const metaEventCurrency = 'USD';

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
  const localizedPriceLabel = localizePriceLabel(subService.priceLabel);
  const localizedPriceNote = subService.priceNote ? localizePriceLabel(subService.priceNote) : null;
  const actionButtonLabel = 'Inquire Now';
  const isActionDisabled = isSubmitting;
  const formattedContactNumber = formatInternationalPhone(form.phoneCountry, form.contactNumber);

  useEffect(() => {
    setAddVfx(false);
  }, [subService.id]);

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = event.currentTarget;
    const { name, value } = target;
    const isCheckbox = (target as HTMLInputElement).type === 'checkbox';
    const checked = (target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value
    }));
  };

  const buildCallPayload = (): CallRequestPayload => ({
    name: form.name,
    phone: formattedContactNumber,
    email: form.email,
    category: category?.name ?? 'General',
    sub_category: subService?.name ?? 'General',
    message: form.message,
    form_source: 'Website Service Form',
    page_url: window.location.href
  });

  const validateForm = () => {
    const basicError = getBasicValidationError(form.name, form.contactNumber, form.phoneCountry, form.email);
    if (basicError) {
      return basicError;
    }

    if (!form.acceptedTerms) {
      return 'Please accept the terms and conditions to continue.';
    }

    return null;
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
      contactNumber: formattedContactNumber,
      name: form.name,
      email: form.email,
      brand: form.brand,
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
      const data = await response.json().catch(() => null);
      throw new Error(data?.error || 'Unable to submit your booking request. Please try again.');
    }
  };

  const buildMetaUserData = () => {
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    const lastName = rest.length ? rest.join(' ') : undefined;

    return {
      email: form.email || undefined,
      phone: formattedContactNumber || undefined,
      firstName,
      lastName
    };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setCallError(null);
    setCallSuccess(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmittingAction('email');

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
      setSubmittingAction(null);
    }
  };

  const handleCallRequest = async () => {
    setError(null);
    setSuccess(null);
    setCallError(null);
    setCallSuccess(null);

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
      setForm(initialFormState);
      setAddVfx(false);
    } catch (submitError) {
      setCallError(
        submitError instanceof Error
          ? submitError.message
          : 'Unable to request a call right now. Please try again.'
      );
    } finally {
      setSubmittingAction(null);
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
                  <div className="phone-input">
                    <div className="phone-code">
                      <span aria-hidden="true">{form.phoneCountry}</span>
                      <select
                        name="phoneCountry"
                        value={form.phoneCountry}
                        onChange={handleChange}
                        aria-label="Country"
                      >
                        {PHONE_COUNTRY_OPTIONS.map((option) => (
                          <option key={option.code} value={option.dialCode}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      name="contactNumber"
                      value={form.contactNumber}
                      onInput={handleChange}
                      required
                      inputMode="tel"
                      placeholder="555 123 4567"
                    />
                  </div>
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
                />
              </label>
              <p className="form-helper">Message is optional but recommended.</p>
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
              <div className="form-actions">
                <button className="primary-button" type="submit" disabled={isActionDisabled}>
                  {submittingAction === 'email' ? 'Processing…' : actionButtonLabel}
                </button>
                <button className="secondary-button" type="button" onClick={handleCallRequest} disabled={isActionDisabled}>
                  {submittingAction === 'call' ? 'Requesting…' : 'Get a CALL'}
                </button>
              </div>
              {success && <p className="form-success">{success}</p>}
              {callError && <p className="form-error">{callError}</p>}
              {callSuccess && <p className="form-success">{callSuccess}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
