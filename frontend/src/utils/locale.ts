export type Locale = 'in' | 'us';

export const SUPPORTED_LOCALES: Locale[] = ['in', 'us'];

export const isLocale = (value?: string | null): value is Locale => {
  return value === 'in' || value === 'us';
};

const AMERICA_TZ_PREFIX = 'America/';
const INDIA_TIMEZONE = 'Asia/Kolkata';

const guessFromTimezone = () => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  if (timezone === INDIA_TIMEZONE) {
    return 'in';
  }
  if (timezone.startsWith(AMERICA_TZ_PREFIX)) {
    return 'us';
  }
  return null;
};

const guessFromLanguage = () => {
  if (typeof navigator === 'undefined' || !navigator.language) {
    return null;
  }
  const language = navigator.language.toLowerCase();
  if (language.includes('en-in') || language.includes('-in') || language.includes('hi-')) {
    return 'in';
  }
  if (language.includes('en-us') || language.includes('-us')) {
    return 'us';
  }
  return null;
};

export const detectLocale = (): Locale => {
  try {
    const timezoneLocale = guessFromTimezone();
    if (timezoneLocale) {
      return timezoneLocale;
    }
    const languageLocale = guessFromLanguage();
    if (languageLocale) {
      return languageLocale;
    }
  } catch (error) {
    console.warn('Unable to detect locale automatically', error);
  }
  return 'in';
};

export const buildLocalePath = (locale: Locale, path = '/') => {
  if (!path || path === '/' || path === '') {
    return `/${locale}`;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalizedPath}`;
};
