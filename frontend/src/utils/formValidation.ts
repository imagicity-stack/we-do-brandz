export const isValidEmail = (value: string) => /.+@.+\..+/.test(value.trim());

export const isValidIndianPhone = (value: string) => {
  const normalized = value.replace(/[\s-]/g, '');
  return /^(\+91)?[6-9]\d{9}$/.test(normalized);
};

export const getBasicValidationError = (name: string, phone: string, email: string) => {
  if (!name.trim()) {
    return 'Please enter your name.';
  }

  if (!isValidIndianPhone(phone)) {
    return 'Please enter a valid Indian phone number.';
  }

  if (!isValidEmail(email)) {
    return 'Please enter a valid email address.';
  }

  return null;
};
