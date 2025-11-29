import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { findSubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { useRazorpay } from '../hooks/useRazorpay';
import { formatCurrency, getCheckoutAmount, localizePriceLabel } from '../utils/currency';
import { useMetaPageEvents } from '../hooks/useMetaPageEvents';
import { trackMetaEvent } from '../utils/metaPixel';
import './ServiceDetail.css';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://brandz-back.onrender.com';
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID ?? 'rzp_live_ReprOUvcLlsQpx';

type RazorpayOrderResponse = {
  id: string;
  amount: number;
  currency: string;
  key?: string;
};

const REELS_VFX_ADD_ON_INR = 400;

const ServiceDetail = () => {
  const locale = useLocale();
  const buildPath = useLocalePath();
  const params = useParams<{ serviceSlug: string; subServiceSlug: string }>();
  const navigate = useNavigate();
  const { serviceSlug = '', subServiceSlug = '' } = params;
  const match = useMemo(() => findSubService(serviceSlug, subServiceSlug), [serviceSlug, subServiceSlug]);
  const isIndia = locale === 'in';
  const isUS = locale === 'us';
  const { openCheckout, isLoaded } = useRazorpay(isIndia);
  const [form, setForm] = useState<BookingFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addVfx, setAddVfx] = useState(false);
  const isReelsEditing = match?.subService.slug === 'reels-editing';
  const totalAmountInINR = (match?.subService.priceInINR ?? 0) + (isReelsEditing && addVfx ? REELS_VFX_ADD_ON_INR : 0);
  const totalAmountLabel = formatCurrency(locale, totalAmountInINR);
  const addOnLabel = formatCurrency(locale, REELS_VFX_ADD_ON_INR);
  const {
    amount: checkoutAmount,
    currency: checkoutCurrency,
    displayAmount: checkoutDisplayAmount,
    displayCurrency: checkoutDisplayCurrency
  } = getCheckoutAmount(locale, totalAmountInINR);
  const metaValue = locale === 'in' ? totalAmountInINR : checkoutDisplayAmount ?? totalAmountInINR;
  const metaCurrency = locale === 'in' ? 'INR' : 'USD';

  useMetaPageEvents(match?.subService.name ?? 'Service detail', {
    params: {
      content_category: match?.category.name ?? 'Service detail',
      ...(match ? { value: metaValue, currency: metaCurrency } : {})
    }
  });

  if (!match) {
    return (
      <main className="service-detail">
        <section className="section">
          <div className="main-container">
            <div className="card">
              <h1>Service not found</h1>
              <p>The service you are looking for is unavailable or has been moved.</p>
              <button className="primary-button" onClick={() => navigate(buildPath('/services'))}>
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
  const paymentButtonLabel = isReelsEditing ? `Pay ${totalAmountLabel}` : `Pay ${localizedPriceLabel}`;
  const actionButtonLabel = isUS ? 'Connect now' : paymentButtonLabel;
  const isActionDisabled = isSubmitting || (isIndia && !isLoaded);
  const showEmiNote = isIndia && subService.priceInINR > 1000;
  const metaValue = locale === 'in' ? totalAmountInINR : checkoutDisplayAmount ?? totalAmountInINR;
  const metaCurrency = locale === 'in' ? 'INR' : 'USD';

  useEffect(() => {
    setAddVfx(false);
  }, [subService.id]);

  useEffect(() => {
    trackMetaEvent('ViewContent', {
      content_name: subService.name,
      content_category: category.name,
      value: metaValue,
      currency: metaCurrency
    });
  }, [category.name, metaCurrency, metaValue, subService.name]);

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
      checkoutAmount,
      checkoutCurrency,
      checkoutDisplayAmount,
      checkoutDisplayCurrency,
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
      trackMetaEvent('Lead', {
        content_name: subService.name,
        content_category: category.name,
        value: metaValue,
        currency: metaCurrency
      });

      if (isUS) {
        trackMetaEvent('Contact', {
          content_name: subService.name,
          content_category: category.name
        });
        setSuccess('Thanks! Our team will connect with you shortly to complete your booking.');
        setForm(initialFormState);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          contactNumber: form.contactNumber,
          email: form.email,
          brand: form.brand,
          message: form.message,
          serviceId: subService.id,
          serviceName: subService.name,
          categoryName: category.name,
          amount: checkoutAmount,
          currency: checkoutCurrency
        })
      });

      if (!response.ok) {
        throw new Error('Unable to initiate payment. Please try again later.');
      }

      const order: RazorpayOrderResponse = await response.json();

      if (!order?.id || !order?.amount || !order?.currency) {
        throw new Error('Received an invalid order response. Please try again later.');
      }

      const displayOptions =
        checkoutDisplayCurrency && checkoutDisplayAmount
          ? {
              display_currency: checkoutDisplayCurrency,
              display_amount: checkoutDisplayAmount
            }
          : {};

      trackMetaEvent('InitiateCheckout', {
        content_name: subService.name,
        content_category: category.name,
        value: metaValue,
        currency: metaCurrency
      });

      openCheckout({
        key: order.key ?? RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'We do Brandz',
        description: subService.name,
        order_id: order.id,
        ...displayOptions,
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.contactNumber
        },
        notes: {
          brand: form.brand,
          message: form.message,
          serviceId: subService.id,
          addVfx: isReelsEditing && addVfx ? 'yes' : 'no'
        },
        theme: {
          color: '#1f4bff'
        }
      });
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Unexpected error occurred.');
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
            <h2>Book this service</h2>
            <p>
              {isIndia
                ? 'Fill in your details and continue to secure payment via Razorpay checkout.'
                : 'Share your details and we will connect with you to finalize payment and onboarding.'}
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
              {showEmiNote && <p className="form-note">EMI options available.</p>}
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
