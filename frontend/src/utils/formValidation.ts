import type { Locale } from './locale';

export const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

const normalizePhone = (value: string) => value.replace(/[\s()-]/g, '');

export const isValidIndianPhone = (value: string) => {
  const normalized = normalizePhone(value);
  return /^\+91\d{10}$/.test(normalized);
};

export const isValidUsPhone = (value: string) => {
  const normalized = normalizePhone(value);
  return /^\+1\d{10}$/.test(normalized);
};

export const getBasicValidationError = (name: string, phone: string, email: string, locale: Locale) => {
  if (!name.trim()) {
    return 'Please enter your name.';
  }

  if (locale === 'us') {
    if (!isValidUsPhone(phone)) {
      return 'Please enter a valid U.S. phone number in the format +1XXXXXXXXXX.';
    }
  } else if (!isValidIndianPhone(phone)) {
    return 'Please enter a valid Indian phone number in the format +91XXXXXXXXXX.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
};
