import type { CurrencyCode } from '@/types/domain';
import { currencies, exchangeRates, type Plan } from '../data';

export function currencySymbol(code: CurrencyCode): string {
  return currencies.find((c) => c.value === code)?.symbol ?? '';
}

/** "$49.99", or "$49" for whole amounts unless `cents` asks for "$49.00". */
export function formatPrice(amount: number, code: CurrencyCode, cents = false): string {
  return `${currencySymbol(code)}${Number.isInteger(amount) && !cents ? amount : amount.toFixed(2)}`;
}

/**
 * Converts a USD amount and rounds it to a .99 price point (37.31 → 36.99, 74.63 → 74.99).
 * USD is returned exactly as set.
 */
export function convertPrice(usd: number, code: CurrencyCode): number {
  if (code === 'USD') return usd;
  return Math.max(Math.round(usd * exchangeRates[code]), 1) - 0.01;
}

/** A plan's monthly price in the chosen currency. */
export function planPrice(plan: Plan, code: CurrencyCode): number {
  return convertPrice(plan.usd, code);
}

/** Price of a single class on a plan, to 2 decimals. */
export function pricePerClass(plan: Plan, code: CurrencyCode): string {
  return formatPrice(Math.round((planPrice(plan, code) / plan.classesPerMonth) * 100) / 100, code, true);
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
