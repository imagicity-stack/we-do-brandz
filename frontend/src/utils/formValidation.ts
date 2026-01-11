export const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

const normalizePhone = (value: string) => value.replace(/[^\d]/g, '');

export const isValidInternationalPhone = (dialCode: string, value: string) => {
  const normalized = normalizePhone(value);
  const safeDialCode = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return /^\+\d{8,15}$/.test(`${safeDialCode}${normalized}`);
};

export const getBasicValidationError = (name: string, phone: string, dialCode: string, email: string) => {
  if (!name.trim()) {
    return 'Please enter your name.';
  }

  if (!isValidInternationalPhone(dialCode, phone)) {
    return 'Please enter a valid phone number with the selected country code.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
};
