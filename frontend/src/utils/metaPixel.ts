export type MetaPixelEventParams = Record<string, unknown> | undefined;

type FbqFunction = ((command: 'track', event: string, params?: MetaPixelEventParams) => void) &
  ((command: string, event: string, params?: MetaPixelEventParams) => void);

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

export const trackMetaEvent = (event: string, params?: MetaPixelEventParams) => {
  if (typeof window === 'undefined') {
    return;
  }

  const { fbq } = window;

  if (typeof fbq === 'function') {
    if (params) {
      fbq('track', event, params);
    } else {
      fbq('track', event);
    }
  }
};
