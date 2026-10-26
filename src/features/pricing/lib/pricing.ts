import type { CurrencyCode } from '@/types/domain';
import { currencies, type Plan } from '../data';

export function currencySymbol(code: CurrencyCode): string {
  return currencies.find((c) => c.value === code)?.symbol ?? '';
}

export function formatPrice(amount: number, code: CurrencyCode): string {
  return `${currencySymbol(code)}${Number.isInteger(amount) ? amount : amount.toFixed(2)}`;
}

/** Price of a single class on a plan, to 2 decimals. */
export function pricePerClass(plan: Plan, code: CurrencyCode): string {
  return formatPrice(Math.round((plan.price[code] / plan.classesPerMonth) * 100) / 100, code);
}

const EURO_REGIONS = [
  'AT',
  'BE',
  'DE',
  'ES',
  'FI',
  'FR',
  'GR',
  'IE',
  'IT',
  'LU',
  'NL',
  'PT',
  'SK',
  'SI',
  'EE',
  'LV',
  'LT',
  'HR',
  'CY',
  'MT',
];

/** Best-guess default currency from the browser locale (e.g. "en-GB" → GBP). */
export function detectCurrency(locale: string | undefined): CurrencyCode {
  const region = locale?.split(/[-_]/)[1]?.toUpperCase();
  if (region === 'GB') return 'GBP';
  if (region && EURO_REGIONS.includes(region)) return 'EUR';
  return 'USD';
}
