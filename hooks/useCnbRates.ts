import { useQuery } from '@tanstack/react-query';

export type CnbRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type CnbRatesResponse = {
  date: string;
  rates: CnbRate[];
};

function parseCnbDaily(text: string): CnbRatesResponse {
  // CNB daily.txt format:
  // 0: header line like: "20 Oct 2025 #202"
  // 1: second header: "Country|Currency|Amount|Code|Rate"
  // subsequent lines pipe-separated values.
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 3) {
    throw new Error('Unexpected CNB format: not enough lines');
  }
  const header = lines[0];
  const date = header.split('#')[0].trim();
  const dataLines = lines.slice(2);
  const rates: CnbRate[] = dataLines
    .filter(l => l.trim().length > 0)
    .map(line => {
      const [country, currency, amountStr, code, rateStr] = line.split('|');
      const amount = Number(amountStr.replace(/\s+/g, ''));
      // CNB rate uses comma as decimal separator
      const rate = Number(rateStr.replace(/\s+/g, '').replace(',', '.'));
      if (Number.isNaN(amount) || Number.isNaN(rate)) {
        throw new Error(`Invalid numeric fields in CNB line: ${line}`);
      }
      return { country, currency, amount, code, rate } as CnbRate;
    });
  return { date, rates };
}

async function fetchCnbDaily(): Promise<CnbRatesResponse> {
  const url =
    'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CNB fetch failed: ${res.status}`);
  const text = await res.text();
  return parseCnbDaily(text);
}

export function useCnbRates() {
  return useQuery({
    queryKey: ['cnb', 'daily'],
    queryFn: fetchCnbDaily,
    staleTime: 1000 * 60 * 15, // 15 mintes
  });
}

export function czkPerUnit(r: CnbRate): number {
  return r.amount / r.rate;
}

export function rateMapByCode(rates: CnbRate[]): Record<string, CnbRate> {
  return rates.reduce(
    (acc, r) => {
      acc[r.code] = r;
      return acc;
    },
    {} as Record<string, CnbRate>,
  );
}

export { parseCnbDaily };
