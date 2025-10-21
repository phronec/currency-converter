import React from 'react';
import { RateContainer, RateLabel, RateText } from '../styles/common';
import { Currency } from '../types/currency';

interface ExchangeRateDisplayProps {
  isLoading: boolean;
  isError: boolean;
  date?: string;
  exchangeRate?: number;
  toCurrency: Currency;
}

const ExchangeRateDisplay = ({
  isLoading,
  isError,
  date,
  exchangeRate,
  toCurrency,
}: ExchangeRateDisplayProps) => {
  const getRateLabel = () => {
    if (isLoading) return 'Loading rates from CNB...';
    if (isError) return "Can't get data from CNB";
    return `CNB daily rates (${date})`;
  };

  return (
    <RateContainer>
      <RateLabel>{getRateLabel()}</RateLabel>
      {exchangeRate !== undefined && (
        <RateText>{`1 CZK = ${(1 / exchangeRate).toFixed(4)} ${toCurrency.code}`}</RateText>
      )}
    </RateContainer>
  );
};

export default ExchangeRateDisplay;
