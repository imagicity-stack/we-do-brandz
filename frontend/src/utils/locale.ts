export type Locale = 'us';

export const SUPPORTED_LOCALES: Locale[] = ['us'];

export const isLocale = (value?: string | null): value is Locale => value === 'us';

export const detectLocale = (): Locale => 'us';

export const buildLocalePath = (locale: Locale, path = '/') => {
  if (!path || path === '/' || path === '') {
    return `/${locale}`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
};
