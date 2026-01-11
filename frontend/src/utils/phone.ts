export type PhoneCountryOption = {
  code: string;
  name: string;
  dialCode: string;
};

export const PHONE_COUNTRY_OPTIONS: PhoneCountryOption[] = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'DE', name: 'Germany', dialCode: '+49' }
];

const normalizePhoneNumber = (value: string) => value.replace(/[^\d]/g, '');

export const formatInternationalPhone = (dialCode: string, value: string) => {
  const normalized = normalizePhoneNumber(value);
  const safeDialCode = dialCode.startsWith('+') ? dialCode : `+${dialCode}`;
  return `${safeDialCode}${normalized}`;
};
