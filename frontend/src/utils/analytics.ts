export type AnalyticsEventParams = Record<string, unknown> | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, event: string, params?: AnalyticsEventParams) => void;
  }
}

export const trackAnalyticsEvent = (event: string, params?: AnalyticsEventParams) => {
  if (typeof window === 'undefined') return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
};
