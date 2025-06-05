import { capitalizeFirstLetter } from './capitalize-first-letter.js';

const logos = {
  binance: '🟠',
  bybit: '⚫️',
};

export const buildPumpMessage = (data) => {
  const { symbol, percentageChange } = data;

  const logo = logos[data.provider];
  const provider = capitalizeFirstLetter(data.provider);
  const formattedSymbolLink = `[${symbol}](https://www.coinglass.com/tv/${provider}_${symbol})`;

  return `${logo} ${provider} - 20m - ${formattedSymbolLink}\n📈 Price change by ${percentageChange}%\n🔉 Number of signals within 24 hours: 1`;
};
