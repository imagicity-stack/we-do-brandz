const USD_FORMATTER = new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export const formatCurrency = (amountInUSD: number) => `$${USD_FORMATTER.format(Math.round(amountInUSD))}`;

export const localizePriceLabel = (label: string) => label;
