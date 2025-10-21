export type CurrencyCode =
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

export interface Currency {
  code: CurrencyCode;
  flag: string;
}

export interface CurrencySelectorProps {
  value: Currency;
  onChange: (currency: Currency) => void;
  currencies: Currency[];
}
