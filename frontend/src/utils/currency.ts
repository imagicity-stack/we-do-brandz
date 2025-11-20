import type { Locale } from './locale';

const USD_EXCHANGE_RATE = 83;
const INR_FORMATTER = new Intl.NumberFormat('en-IN');
const USD_FORMATTER = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });

const convertInrToApproxUsd = (amountInINR: number) => {
  const approxUSD = amountInINR / USD_EXCHANGE_RATE;
  return Math.max(1, Math.round(approxUSD * 100) / 100);
};

export const formatCurrency = (locale: Locale, amountInINR: number) => {
  if (locale === 'in') {
    return `₹${INR_FORMATTER.format(amountInINR)}`;
  }
  const approxUSD = convertInrToApproxUsd(amountInINR);
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

export const getCheckoutAmount = (locale: Locale, amountInINR: number) => {
  if (locale === 'in') {
    return { amount: amountInINR * 100, currency: 'INR' as const };
  }
  const approxUSD = convertInrToApproxUsd(amountInINR);
  return {
    amount: Math.round(approxUSD * 100),
    currency: 'USD' as const,
    displayAmount: Number(approxUSD.toFixed(2)),
    displayCurrency: 'USD' as const
  };
};
