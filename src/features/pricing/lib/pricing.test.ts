import { hifzPlan, plans } from '../data';
import { convertPrice, detectCurrency, formatPrice, planPrice, pricePerClass } from './pricing';

const [starter, regular, intensive] = plans;

describe('pricing', () => {
  it('formats whole prices without decimals', () => {
    expect(formatPrice(49, 'USD')).toBe('$49');
    expect(formatPrice(39, 'GBP')).toBe('£39');
  });

  it('shows pence and cents when a price has them', () => {
    expect(formatPrice(49.99, 'USD')).toBe('$49.99');
    expect(formatPrice(51.99, 'GBP')).toBe('£51.99');
  });

  it('keeps USD exactly as set and converts other currencies to a .99 price', () => {
    expect(convertPrice(49.99, 'USD')).toBe(49.99);
    expect(convertPrice(49.99, 'GBP')).toBeCloseTo(36.99, 2);
    expect(convertPrice(49.99, 'EUR')).toBeCloseTo(44.99, 2);
  });

  it('converts every plan from its USD price', () => {
    expect([...plans, hifzPlan].map((p) => planPrice(p, 'USD'))).toEqual([49.99, 69.99, 99.99, 149.99]);
    const gbp = [...plans, hifzPlan].map((p) => planPrice(p, 'GBP').toFixed(2));
    const eur = [...plans, hifzPlan].map((p) => planPrice(p, 'EUR').toFixed(2));
    expect(gbp).toEqual(['36.99', '51.99', '74.99', '111.99']);
    expect(eur).toEqual(['44.99', '62.99', '89.99', '133.99']);
  });

  it('calculates the price per class', () => {
    expect(pricePerClass(starter!, 'USD')).toBe('$6.25');
    expect(pricePerClass(regular!, 'GBP')).toBe('£4.33');
    expect(pricePerClass(intensive!, 'EUR')).toBe('€4.50');
    expect(pricePerClass(intensive!, 'USD')).toBe('$5.00');
  });

  it('gets cheaper per class on bigger plans', () => {
    for (const code of ['USD', 'GBP', 'EUR'] as const) {
      const per = plans.map((p) => planPrice(p, code) / p.classesPerMonth);
      expect(per[0]).toBeGreaterThan(per[1]!);
      expect(per[1]).toBeGreaterThan(per[2]!);
    }
  });

  it('detects currency from the locale', () => {
    expect(detectCurrency('en-GB')).toBe('GBP');
    expect(detectCurrency('de-DE')).toBe('EUR');
    expect(detectCurrency('en-US')).toBe('USD');
    expect(detectCurrency('ur')).toBe('USD');
    expect(detectCurrency(undefined)).toBe('USD');
  });
});

describe('Hifz plan', () => {
  it('prices each 45-minute lesson', () => {
    expect(pricePerClass(hifzPlan, 'USD')).toBe('$7.50');
    expect(pricePerClass(hifzPlan, 'GBP')).toBe('£5.60');
  });
});
