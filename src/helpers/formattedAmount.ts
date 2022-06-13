import currencyFormatter from 'currency-formatter';

export const formattedAmount = (
  amount: number = 0,
  currency: string = 'USD',
) => {
  const formatter = currencyFormatter.format(amount, {
    locale: 'en-US',
    code: currency,
    symbol: '$',
    decimal: '.',
    thousand: ',',
    precision: 0,
  });
  return formatter;
};
