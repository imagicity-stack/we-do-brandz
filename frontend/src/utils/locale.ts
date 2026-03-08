export type Locale = 'default';

export const SUPPORTED_LOCALES: Locale[] = ['default'];

export const isLocale = (value?: string | null): value is Locale => value === 'default';

export const detectLocale = (): Locale => 'default';

export const buildLocalePath = (_locale: Locale, path = '/') => {
  if (!path || path === '') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
};
