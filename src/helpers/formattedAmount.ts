import currencyFormatter from 'currency-formatter';

export const formattedAmount = (
  amount: number = 0,
  precision: number = 0,
  currency: string = 'USD',
) => {
  const formatter = currencyFormatter.format(amount, {
    locale: 'en-US',
    code: currency,
    symbol: '$',
    decimal: '.',
    thousand: ',',
    precision,
  });
  return formatter;
};

export const unFormattedAmount = (value: string): number => {
  const unFormatted = currencyFormatter.unformat(value, {
    locale: 'en-US',
    code: 'USD',
    symbol: '$',
    decimal: '.',
    thousand: ',',
    precision: 0,
  });
  return unFormatted;
};
