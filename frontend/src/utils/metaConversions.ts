import type { MetaPixelEventParams } from './metaPixel';

type MetaActionSource =
  | 'website'
  | 'app'
  | 'phone_call'
  | 'chat'
  | 'email'
  | 'physical_store'
  | 'system_generated'
  | 'other';

type MetaUserData = {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  externalId?: string;
  fbc?: string;
  fbp?: string;
  subscriptionId?: string;
  clickId?: string;
};

type SendMetaConversionOptions = {
  eventSourceUrl?: string;
  actionSource?: MetaActionSource;
  customData?: MetaPixelEventParams;
  userData?: MetaUserData;
};

const getCookieValue = (key: string) => {
  if (typeof document === 'undefined') return undefined;

  const cookieMatch = document.cookie
    ?.split(';')
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${key}=`));

  return cookieMatch ? cookieMatch.split('=')[1] : undefined;
};

const normalizeUserData = (userData?: MetaUserData) => {
  if (!userData) return undefined;

  const normalized = {
    em: userData.email,
    ph: userData.phone,
    fn: userData.firstName,
    ln: userData.lastName,
    ge: userData.gender,
    db: userData.dateOfBirth,
    ct: userData.city,
    st: userData.state,
    zp: userData.zip,
    country: userData.country,
    external_id: userData.externalId,
    fbc: userData.fbc ?? getCookieValue('_fbc'),
    fbp: userData.fbp ?? getCookieValue('_fbp'),
    subscription_id: userData.subscriptionId,
    click_id: userData.clickId
  } as Record<string, unknown>;

  return Object.fromEntries(Object.entries(normalized).filter(([, value]) => value !== undefined && value !== ''));
};

export const sendMetaConversionEvent = async (
  eventName: string,
  { eventSourceUrl, actionSource = 'website', customData, userData }: SendMetaConversionOptions = {}
) => {
  if (typeof window === 'undefined') return;

  const payload = {
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_source_url: eventSourceUrl ?? window.location.href,
    action_source: actionSource,
    custom_data: customData,
    user_data: normalizeUserData(userData)
  };

  try {
    await fetch('/api/meta-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to send Meta conversion event', error);
  }
};

export type { MetaUserData };
