import React from 'react';
import { RateContainer, RateLabel, RateText } from '../styles/common';
import { Currency } from '../types/currency';

interface ExchangeRateDisplayProps {
  isLoading: boolean;
  isError: boolean;
  date?: string;
  exchangeRate?: number;
  isReversed: boolean;
  toCurrency: Currency;
}

const ExchangeRateDisplay: React.FC<ExchangeRateDisplayProps> = ({
  isLoading,
  isError,
  date,
  exchangeRate,
  isReversed,
  toCurrency,
}) => {
  const getRateLabel = () => {
    if (isLoading) return 'Loading rates from CNB...';
    if (isError) return "Can't get data from CNB";
    return `CNB daily rates (${date})`;
  };

  const getRateText = () => {
    if (exchangeRate === undefined) return null;

    return isReversed
      ? `1 ${toCurrency.code} = ${(1 / exchangeRate).toFixed(4)} CZK`
      : `1 CZK = ${(1 / exchangeRate).toFixed(4)} ${toCurrency.code}`;
  };

  return (
    <RateContainer>
      <RateLabel>{getRateLabel()}</RateLabel>
      {exchangeRate !== undefined && <RateText>{getRateText()}</RateText>}
    </RateContainer>
  );
};

export default ExchangeRateDisplay;
