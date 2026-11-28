import { hifzPlan, plans } from '../data';
import {
  convertPrice,
  currencyForCountry,
  formatPrice,
  guessCountry,
  planPrice,
  priceLength,
  pricePerClass,
  usd,
  type LocalCurrency,
} from './pricing';

const [starter, regular, intensive] = plans;
const all = [...plans, hifzPlan];
/** Fixed rates so the tests don't move with the market. */
const gbp: LocalCurrency = { code: 'GBP', rate: 0.74633 };
const eur: LocalCurrency = { code: 'EUR', rate: 0.89509 };
const cad: LocalCurrency = { code: 'CAD', rate: 1.3969 };
const pkr: LocalCurrency = { code: 'PKR', rate: 280.1 };
const idr: LocalCurrency = { code: 'IDR', rate: 16_230 };
/** Intl puts a no-break space between a currency code and the amount. */
const plain = (s: string) => s.replace(/\s/g, ' ');

describe('formatPrice', () => {
  it('drops decimals for whole prices and keeps them otherwise', () => {
    expect(formatPrice(49, 'USD')).toBe('$49');
    expect(formatPrice(49.99, 'USD')).toBe('$49.99');
    expect(formatPrice(5, 'USD', true)).toBe('$5.00');
    expect(formatPrice(51.99, 'GBP')).toBe('£51.99');
    expect(formatPrice(44.99, 'EUR')).toBe('€44.99');
    expect(formatPrice(97.99, 'CAD')).toBe('CA$97.99');
  });

  it('writes large amounts whole, with thousands separators', () => {
    expect(plain(formatPrice(13_999, 'PKR'))).toBe('PKR 13,999');
    expect(plain(formatPrice(810_999, 'IDR'))).toBe('IDR 810,999');
  });
});

describe('convertPrice', () => {
  it('keeps US dollars exactly as set', () => {
    expect(convertPrice(49.99, 1)).toBe(49.99);
  });

  it('rounds small prices to .99', () => {
    expect(convertPrice(49.99, gbp.rate)).toBeCloseTo(36.99, 2);
    expect(convertPrice(49.99, eur.rate)).toBeCloseTo(44.99, 2);
  });

  it('rounds large prices to three figures minus one', () => {
    expect(convertPrice(49.99, pkr.rate)).toBe(13_999); // 14,002
    expect(convertPrice(149.99, pkr.rate)).toBe(41_999); // 42,012
    expect(convertPrice(49.99, idr.rate)).toBe(810_999); // 811,338
  });
});

describe('plan prices', () => {
  it('converts every plan', () => {
    expect(all.map((p) => planPrice(p, usd))).toEqual([49.99, 69.99, 99.99, 149.99]);
    expect(all.map((p) => planPrice(p, gbp).toFixed(2))).toEqual(['36.99', '51.99', '74.99', '111.99']);
    expect(all.map((p) => planPrice(p, cad).toFixed(2))).toEqual(['69.99', '97.99', '139.99', '209.99']);
    expect(all.map((p) => planPrice(p, pkr))).toEqual([13_999, 19_599, 27_999, 41_999]);
  });

  it('prices each class: to the cent while small, whole once large', () => {
    expect(pricePerClass(starter!, usd)).toBe('$6.25');
    expect(pricePerClass(regular!, gbp)).toBe('£4.33');
    expect(pricePerClass(intensive!, eur)).toBe('€4.50');
    expect(pricePerClass(hifzPlan, usd)).toBe('$7.50');
    expect(plain(pricePerClass(starter!, pkr))).toBe('PKR 1,750');
  });

  it('gets cheaper per class on bigger plans, in any currency', () => {
    for (const currency of [usd, gbp, eur, cad, pkr, idr]) {
      const per = plans.map((p) => planPrice(p, currency) / p.classesPerMonth);
      expect(per[0]).toBeGreaterThan(per[1]!);
      expect(per[1]).toBeGreaterThan(per[2]!);
    }
  });

  it('sizes long prices down', () => {
    expect(priceLength('$49.99')).toBe('short');
    expect(priceLength('CA$139.99')).toBe('long');
    expect(priceLength('PKR 41,999')).toBe('longer');
  });
});

describe('country and currency', () => {
  it('picks the currency a country uses', () => {
    expect(currencyForCountry('GB')).toBe('GBP');
    expect(currencyForCountry('pk')).toBe('PKR');
    expect(currencyForCountry('AE')).toBe('AED');
    expect(currencyForCountry('DE')).toBe('EUR');
    expect(currencyForCountry('IN')).toBe('INR');
    expect(currencyForCountry(undefined)).toBe('USD');
    expect(currencyForCountry('ZZ')).toBe('USD');
  });

  it('guesses the country from the time zone before the locale', () => {
    // A UK family with a US-English browser.
    expect(guessCountry('Europe/London', 'en-US')).toBe('GB');
    expect(guessCountry('America/Toronto', 'en-US')).toBe('CA');
    expect(guessCountry('Australia/Sydney', 'en-US')).toBe('AU');
    expect(guessCountry('Asia/Karachi', 'en-US')).toBe('PK');
    expect(guessCountry('America/New_York', 'en-US')).toBe('US');
    expect(guessCountry(undefined, 'de-DE')).toBe('DE');
    expect(guessCountry('Asia/Tokyo', 'ja')).toBeUndefined();
  });
});
