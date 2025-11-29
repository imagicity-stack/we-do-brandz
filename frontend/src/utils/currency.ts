import type { Locale } from './locale';

const USD_EXCHANGE_RATE = 83;
const USD_MARKUP = 20;
const INR_FORMATTER = new Intl.NumberFormat('en-IN');
const USD_FORMATTER = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const convertInrToAdjustedUsd = (amountInINR: number) => {
  const baseUSD = amountInINR / USD_EXCHANGE_RATE;
  const roundedUSD = Math.round(baseUSD);
  return Math.max(1, roundedUSD + USD_MARKUP);
};

export const formatCurrency = (locale: Locale, amountInINR: number) => {
  if (locale === 'in') {
    return `₹${INR_FORMATTER.format(amountInINR)}`;
  }
  const adjustedUSD = convertInrToAdjustedUsd(amountInINR);
  return `$${USD_FORMATTER.format(adjustedUSD)}`;
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
  const approxUSD = convertInrToAdjustedUsd(amountInINR);
  return {
    amount: Math.round(approxUSD * 100),
    currency: 'USD' as const,
    displayAmount: Number(approxUSD.toFixed(2)),
    displayCurrency: 'USD' as const
  };
};
