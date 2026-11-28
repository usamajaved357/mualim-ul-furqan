import countryToCurrency from 'country-to-currency';
import type { CurrencyCode } from '@/types/domain';
import type { Plan } from '../data';

/** The currency prices are set and billed in. */
export const BASE_CURRENCY = 'USD';

/** A currency to show prices in, with how many of its units one US dollar buys. */
export interface LocalCurrency {
  code: CurrencyCode;
  rate: number;
}

export const usd: LocalCurrency = { code: BASE_CURRENCY, rate: 1 };

const formatters = new Map<string, Intl.NumberFormat>();

/**
 * "$49.99", "£37", "CA$139.99", "PKR 13,999". Whole amounts drop the decimals unless `cents` asks for them;
 * amounts of 1,000 or more never show them.
 */
export function formatPrice(amount: number, code: CurrencyCode, cents = false): string {
  const digits = amount >= 1000 || (Number.isInteger(amount) && !cents) ? 0 : 2;
  const key = `${code}:${digits}`;
  let format = formatters.get(key);
  if (!format) {
    format = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'symbol',
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
    formatters.set(key, format);
  }
  return format.format(amount);
}

/**
 * Converts a US dollar price to a tidy local price: x.99 under 1,000 (37.31 → 36.99), and three significant
 * figures minus one above it (13,997 → 13,999; 811,350 → 810,999). US dollars come back exactly as set.
 */
export function convertPrice(usdAmount: number, rate: number): number {
  if (rate === 1) return usdAmount;
  const raw = usdAmount * rate;
  if (raw < 999.5) return Math.max(Math.round(raw), 1) - 0.01;
  const step = 10 ** (Math.floor(Math.log10(raw)) - 2);
  return Math.round(raw / step) * step - 1;
}

/** A plan's monthly price in the chosen currency. */
export function planPrice(plan: Plan, currency: LocalCurrency): number {
  return convertPrice(plan.usd, currency.rate);
}

/** Price of a single class on a plan: to the cent while small ("£4.62"), whole once large ("PKR 1,750"). */
export function pricePerClass(plan: Plan, currency: LocalCurrency): string {
  const each = planPrice(plan, currency) / plan.classesPerMonth;
  return each < 100
    ? formatPrice(Math.round(each * 100) / 100, currency.code, true)
    : formatPrice(Math.round(each), currency.code);
}

/** How long a formatted price is, so cards can step the font down for "PKR 41,999" or "VND 1,299,999". */
export function priceLength(text: string): 'short' | 'long' | 'longer' {
  const { length } = text;
  return length <= 7 ? 'short' : length <= 9 ? 'long' : 'longer';
}

/** Default currency for a country (two-letter code, e.g. "PK" → "PKR"); US dollars if unknown. */
export function currencyForCountry(country: string | null | undefined): CurrencyCode {
  const code = country?.toUpperCase();
  return (code && (countryToCurrency as Record<string, string>)[code]) || BASE_CURRENCY;
}

/** Time zones that pin down a country, for the first guess before the location lookup answers. */
const ZONE_COUNTRY: Record<string, string> = {
  'Europe/London': 'GB',
  'Europe/Belfast': 'GB',
  'Europe/Dublin': 'IE',
  'Europe/Amsterdam': 'NL',
  'Europe/Berlin': 'DE',
  'Europe/Brussels': 'BE',
  'Europe/Copenhagen': 'DK',
  'Europe/Madrid': 'ES',
  'Europe/Oslo': 'NO',
  'Europe/Paris': 'FR',
  'Europe/Rome': 'IT',
  'Europe/Stockholm': 'SE',
  'Europe/Vienna': 'AT',
  'Europe/Zurich': 'CH',
  'America/Toronto': 'CA',
  'America/Vancouver': 'CA',
  'America/Edmonton': 'CA',
  'America/Winnipeg': 'CA',
  'America/Halifax': 'CA',
  'America/Regina': 'CA',
  'America/St_Johns': 'CA',
  'America/Montreal': 'CA',
  'Asia/Karachi': 'PK',
  'Asia/Dubai': 'AE',
  'Asia/Riyadh': 'SA',
  'Asia/Qatar': 'QA',
  'Asia/Kuwait': 'KW',
  'Asia/Bahrain': 'BH',
  'Asia/Muscat': 'OM',
  'Asia/Kolkata': 'IN',
  'Asia/Dhaka': 'BD',
  'Asia/Kuala_Lumpur': 'MY',
  'Asia/Singapore': 'SG',
  'Africa/Johannesburg': 'ZA',
  'Pacific/Auckland': 'NZ',
};

/**
 * A first guess at the visitor's country, from their time zone (more telling than the browser language, which
 * is often US English everywhere), then the locale's region ("en-GB" → GB).
 */
export function guessCountry(timeZone: string | undefined, locale: string | undefined): string | undefined {
  if (timeZone?.startsWith('Australia/')) return 'AU';
  if (timeZone && ZONE_COUNTRY[timeZone]) return ZONE_COUNTRY[timeZone];
  return locale?.split(/[-_]/)[1]?.toUpperCase();
}
