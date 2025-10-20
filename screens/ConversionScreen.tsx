import { czkPerUnit, rateMapByCode, useCnbRates } from '../hooks/useCnbRates';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

type CurrencyCode =
  | 'CZK'
  | 'AUD'
  | 'BRL'
  | 'BGN'
  | 'CAD'
  | 'CNY'
  | 'DKK'
  | 'EUR'
  | 'HKD'
  | 'HUF'
  | 'ISK'
  | 'XDR'
  | 'INR'
  | 'IDR'
  | 'ILS'
  | 'JPY'
  | 'MYR'
  | 'MXN'
  | 'NZD'
  | 'NOK'
  | 'PHP'
  | 'PLN'
  | 'RON'
  | 'SGD'
  | 'ZAR'
  | 'KRW'
  | 'SEK'
  | 'CHF'
  | 'THB'
  | 'TRY'
  | 'GBP'
  | 'USD';
interface Currency {
  code: CurrencyCode;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'CZK', flag: '🇨🇿' }, // Czech Republic
  { code: 'AUD', flag: '🇦🇺' }, // Australia
  { code: 'BRL', flag: '🇧🇷' }, // Brazil
  { code: 'BGN', flag: '🇧🇬' }, // Bulgaria
  { code: 'CAD', flag: '🇨🇦' }, // Canada
  { code: 'CNY', flag: '🇨🇳' }, // China
  { code: 'DKK', flag: '��' }, // Denmark
  { code: 'EUR', flag: '🇪🇺' }, // EMU (European Monetary Union)
  { code: 'HKD', flag: '🇭🇰' }, // Hong Kong
  { code: 'HUF', flag: '🇭🇺' }, // Hungary
  { code: 'ISK', flag: '🇮🇸' }, // Iceland
  { code: 'XDR', flag: '🏦' }, // IMF Special Drawing Rights
  { code: 'INR', flag: '🇮🇳' }, // India
  { code: 'IDR', flag: '🇮🇩' }, // Indonesia
  { code: 'ILS', flag: '🇮🇱' }, // Israel
  { code: 'JPY', flag: '🇯🇵' }, // Japan
  { code: 'MYR', flag: '🇲🇾' }, // Malaysia
  { code: 'MXN', flag: '🇲🇽' }, // Mexico
  { code: 'NZD', flag: '🇳🇿' }, // New Zealand
  { code: 'NOK', flag: '🇳🇴' }, // Norway
  { code: 'PHP', flag: '🇵🇭' }, // Philippines
  { code: 'PLN', flag: '🇵🇱' }, // Poland
  { code: 'RON', flag: '🇷🇴' }, // Romania
  { code: 'SGD', flag: '🇸🇬' }, // Singapore
  { code: 'ZAR', flag: '🇿🇦' }, // South Africa
  { code: 'KRW', flag: '🇰🇷' }, // South Korea
  { code: 'SEK', flag: '🇸🇪' }, // Sweden
  { code: 'CHF', flag: '🇨🇭' }, // Switzerland
  { code: 'THB', flag: '🇹🇭' }, // Thailand
  { code: 'TRY', flag: '🇹🇷' }, // Turkey
  { code: 'GBP', flag: '🇬🇧' }, // United Kingdom
  { code: 'USD', flag: '🇺🇸' }, // USA
];

// No local fallback: CNB must provide data

const Container = styled.View`
  flex: 1;
  background-color: #f0f4ff;
  padding: 20px;
  align-items: center;
  justify-content: flex-start;
  padding-top: 60px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #00008b;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: #808080;
  text-align: center;
  margin-bottom: 30px;
`;

const Label = styled.Text`
  font-size: 14px;
  color: #808080;
  align-self: flex-start;
  margin-bottom: 5px;
`;

const CurrencyRow = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

const Flag = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;

const Code = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const Arrow = styled.Text`
  font-size: 18px;
  color: #808080;
`;

const AmountInput = styled.TextInput`
  flex: 1;
  text-align: right;
  font-size: 18px;
  color: #000000;
`;

const ConvertedAmount = styled.Text`
  flex: 1;
  text-align: right;
  font-size: 18px;
  color: #000000;
`;

const SwapButton = styled.TouchableOpacity`
  background-color: #4169e1;
  border-radius: 20px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

const SwapIcon = styled.Text`
  font-size: 18px;
  color: #ffffff;
`;

const RateContainer = styled.View`
  align-self: flex-start;
  margin-top: 20px;
`;

const RateLabel = styled.Text`
  font-size: 14px;
  color: #808080;
  margin-bottom: 5px;
`;

const RateText = styled.Text`
  font-size: 16px;
  color: #000000;
`;

const SelectorWrapper = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const Dropdown = styled.View`
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  border-radius: 10px;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 5px;
  elevation: 5;
  width: 150px;
  z-index: 1;
`;

const DropdownItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #f0f0f0;
`;

interface CurrencySelectorProps {
  value: Currency;
  onChange: (c: Currency) => void;
  currencies: Currency[];
}

const CurrencySelector = ({
  value,
  onChange,
  currencies,
}: CurrencySelectorProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <SelectorWrapper>
      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
        <CurrencyRow style={{ width: 'auto', marginBottom: 0 }}>
          <Flag>{value.flag}</Flag>
          <Code>{value.code}</Code>
          <Arrow>▼</Arrow>
        </CurrencyRow>
      </TouchableOpacity>
      {showDropdown && (
        <Dropdown>
          {currencies.map((cur: Currency) => (
            <DropdownItem
              key={cur.code}
              onPress={() => {
                onChange(cur);
                setShowDropdown(false);
              }}
            >
              <Flag>{cur.flag}</Flag>
              <Code>{cur.code}</Code>
            </DropdownItem>
          ))}
        </Dropdown>
      )}
    </SelectorWrapper>
  );
};

const ConversionScreen = () => {
  const [fromCurrency, setFromCurrency] = useState(currencies[0]);
  const [toCurrency, setToCurrency] = useState(currencies[2]); // Default to EUR
  const [amount, setAmount] = useState('1000.00');

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
    // Add CZK itself as baseline 1 CZK = 1 CZK if present elsewhere
    toCzk['CZK'] = 1;
    return toCzk;
  }, [data]);

  const handleSwap = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const parsedAmount = parseFloat(amount) || 0;
  // Compute via CZK triangulation only when CNB data is present
  const exchangeRate =
    liveMap && liveMap[fromCurrency.code] && liveMap[toCurrency.code]
      ? liveMap[toCurrency.code] / liveMap[fromCurrency.code]
      : undefined;
  const converted =
    exchangeRate !== undefined ? (parsedAmount * exchangeRate).toFixed(2) : '-';

  return (
    <Container>
      <Title>Currency Converter</Title>
      <Subtitle>
        Check live rates, set rate alerts, receive notifications and more.
      </Subtitle>
      <Label>Amount</Label>
      <CurrencyRow>
        <CurrencySelector
          value={fromCurrency}
          onChange={setFromCurrency}
          currencies={currencies}
        />
        <AmountInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </CurrencyRow>
      <SwapButton onPress={handleSwap}>
        <SwapIcon>⇅</SwapIcon>
      </SwapButton>
      <Label>Converted Amount</Label>
      <CurrencyRow>
        <CurrencySelector
          value={toCurrency}
          onChange={setToCurrency}
          currencies={currencies}
        />
        <ConvertedAmount>{converted}</ConvertedAmount>
      </CurrencyRow>
      <RateContainer>
        <RateLabel>
          {isLoading
            ? 'Loading rates from CNB…'
            : isError
              ? "Can't get data from CNB"
              : `CNB daily rates (${data?.date})`}
        </RateLabel>
        {exchangeRate !== undefined ? (
          <RateText>
            1 {fromCurrency.code} = {exchangeRate.toFixed(4)} {toCurrency.code}
          </RateText>
        ) : null}
      </RateContainer>
    </Container>
  );
};

export default ConversionScreen;
