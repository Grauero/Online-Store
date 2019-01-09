export default function (amount) {
  if (typeof amount !== 'number' || amount < 0) {
    return 'Incorrect format, provide a positive number value as argument';
  }

  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  };

  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }
  const formatter = new Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
