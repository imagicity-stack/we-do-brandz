import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { findSubService } from '../data/services';
import { useLocalePath } from '../hooks/useLocalePath';
import { useRazorpay } from '../hooks/useRazorpay';
import { formatCurrency, getCheckoutAmount, localizePriceLabel } from '../utils/currency';
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
  const { openCheckout, isLoaded } = useRazorpay();
  const [form, setForm] = useState<BookingFormState>(initialFormState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addVfx, setAddVfx] = useState(false);

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
  const isReelsEditing = subService.slug === 'reels-editing';
  const localizedPriceLabel = localizePriceLabel(locale, subService.priceLabel);
  const localizedPriceNote = subService.priceNote ? localizePriceLabel(locale, subService.priceNote) : null;

  useEffect(() => {
    setAddVfx(false);
  }, [subService.id]);

  const totalAmountInINR = subService.priceInINR + (isReelsEditing && addVfx ? REELS_VFX_ADD_ON_INR : 0);
  const totalAmountLabel = formatCurrency(locale, totalAmountInINR);
  const paymentButtonLabel = isReelsEditing ? `Pay ${totalAmountLabel}` : `Pay ${localizedPriceLabel}`;
  const addOnLabel = formatCurrency(locale, REELS_VFX_ADD_ON_INR);
  const { amount: checkoutAmount, currency: checkoutCurrency } = getCheckoutAmount(locale, totalAmountInINR);

  const handleChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = event.currentTarget as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.acceptedTerms) {
      setError('Please accept the terms and conditions to continue.');
      return;
    }

    setIsSubmitting(true);

    try {
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

      openCheckout({
        key: order.key ?? RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'We do Brandz',
        description: subService.name,
        order_id: order.id,
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
            <p>Fill in your details and continue to secure payment via Razorpay checkout.</p>
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
              <button className="primary-button" type="submit" disabled={!isLoaded || isSubmitting}>
                {isSubmitting ? 'Processing…' : paymentButtonLabel}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetail;
