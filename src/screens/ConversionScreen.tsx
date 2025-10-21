import React, { useMemo, useState } from 'react';
import { czkPerUnit, rateMapByCode, useCnbRates } from '../hooks/useCnbRates';
import { currencies } from '../data/currencies';
import { Currency } from '../types/currency';
import CurrencySelector from '../components/CurrencySelector';
import SwapButton from '../components/SwapButton';
import ExchangeRateDisplay from '../components/ExchangeRateDisplay';
import {
  Container,
  Title,
  Subtitle,
  Label,
  CurrencyRow,
  Flag,
  Code,
  AmountInput,
  ConvertedAmount,
} from '../styles/common';

const ConversionScreen: React.FC = () => {
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[6]); // Default to EUR
  const [amount, setAmount] = useState('1000.00');
  const [isReversed, setIsReversed] = useState(false);

  const { data, isLoading, isError } = useCnbRates();

  // Build a map of currency -> CZK per 1 unit from CNB
  const liveMap = useMemo(() => {
    if (!data) return null;
    const byCode = rateMapByCode(data.rates);
    const toCzk: Record<string, number> = {};
    Object.keys(byCode).forEach(code => {
      const r = byCode[code];
      toCzk[code] = czkPerUnit(r);
    });
    return toCzk;
  }, [data]);

  const handleSwap = () => {
    if (converted !== '-' && converted !== '0.00') {
      setAmount(converted);
      setIsReversed(!isReversed);
    }
  };

  const parsedAmount = parseFloat(amount) || 0;
  // When isReversed=true, treat the CZK input as if it's the target currency amount
  // and convert it to CZK (which will be displayed in the bottom field)
  const exchangeRate =
    liveMap && liveMap[toCurrency.code]
      ? isReversed
        ? liveMap[toCurrency.code] // Treat input as target currency, convert to CZK
        : 1 / liveMap[toCurrency.code] // Normal: convert CZK to target currency
      : undefined;

  const converted =
    exchangeRate !== undefined ? (parsedAmount / exchangeRate).toFixed(2) : '-';

  return (
    <Container>
      <Title>Currency Converter</Title>
      <Subtitle>
        Convert between CZK and world currencies using live CNB exchange rates.
      </Subtitle>

      <Label>Amount</Label>
      <CurrencyRow>
        <Flag>🇨🇿</Flag>
        <Code>CZK</Code>
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </CurrencyRow>

      <SwapButton onPress={handleSwap} />

      <Label>Converted Amount</Label>
      <CurrencyRow>
        <CurrencySelector
          value={toCurrency}
          onChange={setToCurrency}
          currencies={currencies}
        />
        <ConvertedAmount>{converted}</ConvertedAmount>
      </CurrencyRow>

      <ExchangeRateDisplay
        isLoading={isLoading}
        isError={isError}
        date={data?.date}
        exchangeRate={exchangeRate}
        isReversed={isReversed}
        toCurrency={toCurrency}
      />
    </Container>
  );
};

export default ConversionScreen;
