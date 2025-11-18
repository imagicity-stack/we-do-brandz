import type { Locale } from './locale';

const USD_EXCHANGE_RATE = 83;
const INR_FORMATTER = new Intl.NumberFormat('en-IN');
const USD_FORMATTER = new Intl.NumberFormat('en-US');

export const formatCurrency = (locale: Locale, amountInINR: number) => {
  if (locale === 'in') {
    return `₹${INR_FORMATTER.format(amountInINR)}`;
  }
  const approxUSD = Math.max(1, Math.round(amountInINR / USD_EXCHANGE_RATE));
  return `$${USD_FORMATTER.format(approxUSD)}`;
};

export const localizePriceLabel = (locale: Locale, label: string) => {
  if (locale === 'in') {
    return label;
  }

  return label.replace(/₹([\d,]+)/g, (_, rawAmount: string) => {
    const amountInINR = Number(rawAmount.replace(/,/g, ''));
    if (Number.isNaN(amountInINR)) {
      return rawAmount;
    }
    return formatCurrency('us', amountInINR);
  });
};
