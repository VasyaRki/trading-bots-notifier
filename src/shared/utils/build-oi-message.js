import { capitalizeFirstLetter } from './capitalize-first-letter.js';

const logos = {
  binance: '🟠',
  bybit: '⚫️',
};

export const buildOIMessage = (data) => {
  const {
    symbol,
    signalsCountPerDay,
    openClosePercentageDifference,
    openInterestPercentageDifference,
  } = data;

  const logo = logos[data.provider];
  const provider = capitalizeFirstLetter(data.provider);
  const formattedSymbolLink = `[${symbol}](https://www.coinglass.com/tv/${provider}_${symbol})`;

  return `${logo} ${provider} - 20m - ${formattedSymbolLink}\n📈 OI change by ${openInterestPercentageDifference}%\n💲 Price change: ${openClosePercentageDifference}%\n🔉 Number of signals within 24 hours: ${signalsCountPerDay}`;
};
