import crypto from 'crypto';
import { logNote } from './notes.js';

const HASHED_FIELDS = new Set(['em', 'ph', 'fn', 'ln', 'ge', 'db', 'ct', 'st', 'zp', 'country', 'external_id']);
const PASSTHROUGH_FIELDS = new Set(['client_ip_address', 'client_user_agent', 'fbc', 'fbp', 'subscription_id', 'click_id']);
const ALLOWED_EVENTS = new Set([
  'AddPaymentInfo',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent',
  'PageView'
]);

const META_API_VERSION = process.env.META_API_VERSION || 'v21.0';
const META_PIXEL_ID = process.env.META_PIXEL_ID;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

const toSha256 = (value) => crypto.createHash('sha256').update(String(value).trim().toLowerCase()).digest('hex');

const normalizeArray = (value) => {
  if (Array.isArray(value)) return value.filter((entry) => entry !== undefined && entry !== null);
  if (value === undefined || value === null || value === '') return [];
  return [value];
};

const normalizeUserData = (userData = {}, req) => {
  const normalized = {};

  const ipFromHeader = req.headers['x-forwarded-for'];
  const clientIp =
    (Array.isArray(ipFromHeader) ? ipFromHeader[0] : ipFromHeader)?.split(',')[0]?.trim() || req.socket?.remoteAddress;
  const userAgent = req.get('user-agent');

  if (clientIp) normalized.client_ip_address = clientIp;
  if (userAgent) normalized.client_user_agent = userAgent;

  Object.entries(userData).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;

    if (PASSTHROUGH_FIELDS.has(key)) {
      const entries = normalizeArray(value);
      if (entries.length) normalized[key] = entries.length === 1 ? entries[0] : entries;
      return;
    }

    if (HASHED_FIELDS.has(key)) {
      const entries = normalizeArray(value).map(toSha256);
      if (entries.length) normalized[key] = entries.length === 1 ? entries[0] : entries;
      return;
    }

    const entries = normalizeArray(value);
    if (entries.length) normalized[key] = entries.length === 1 ? entries[0] : entries;
  });

  return normalized;
};

const cleanObject = (value = {}) =>
  Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined && entry !== null && entry !== ''));

export const isMetaConfigured = () => Boolean(META_PIXEL_ID && META_ACCESS_TOKEN);

export const buildMetaPayload = (eventBody = {}, req) => {
  const { event_name: eventName, event_time: eventTime, event_source_url: eventSourceUrl, action_source: actionSource } =
    eventBody;

  if (!eventName) throw new Error('event_name is required');
  if (!ALLOWED_EVENTS.has(eventName)) throw new Error(`event_name "${eventName}" is not allowed`);
  if (!eventSourceUrl) throw new Error('event_source_url is required');

  const parsedEventTime = Number(eventTime);
  const eventTimestamp = Number.isFinite(parsedEventTime) && parsedEventTime > 0
    ? Math.floor(parsedEventTime)
    : Math.floor(Date.now() / 1000);
  const user_data = normalizeUserData(eventBody.user_data, req);
  if (!user_data.client_user_agent) throw new Error('client_user_agent is required');

  const event = {
    event_name: eventName,
    event_time: eventTimestamp,
    event_source_url: eventSourceUrl,
    action_source: actionSource || 'website',
    user_data,
    event_id: eventBody.event_id,
    opt_out: eventBody.opt_out,
    data_processing_options: eventBody.data_processing_options,
    data_processing_options_country: eventBody.data_processing_options_country,
    data_processing_options_state: eventBody.data_processing_options_state,
    custom_data: cleanObject(eventBody.custom_data),
    attribution_data: cleanObject(eventBody.attribution_data),
    original_event_data: cleanObject(eventBody.original_event_data)
  };

  return { data: [cleanObject(event)] };
};

export const sendMetaEvent = async (payload, req) => {
  const url = `https://graph.facebook.com/${META_API_VERSION}/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`;

  const body = buildMetaPayload(payload, req);

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    logNote('Meta event delivery failed', { status: response.status, error: errorText });
    throw new Error('Unable to forward event to Meta Conversions API');
  }

  return response.json();
};
