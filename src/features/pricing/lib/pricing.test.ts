import { hifzPlan, plans } from '../data';
import { detectCurrency, formatPrice, pricePerClass } from './pricing';

const [starter, regular, intensive] = plans;

describe('pricing', () => {
  it('formats whole prices without decimals', () => {
    expect(formatPrice(49, 'USD')).toBe('$49');
    expect(formatPrice(39, 'GBP')).toBe('£39');
  });

  it('shows pence and cents when a price has them', () => {
    expect(formatPrice(49.99, 'USD')).toBe('$49.99');
    expect(formatPrice(54.99, 'GBP')).toBe('£54.99');
  });

  it('calculates the price per class', () => {
    expect(pricePerClass(starter!, 'USD')).toBe('$6.25');
    expect(pricePerClass(regular!, 'GBP')).toBe('£4.58');
    expect(pricePerClass(intensive!, 'EUR')).toBe('€4.60');
  });

  it('gets cheaper per class on bigger plans', () => {
    const per = plans.map((p) => p.price.USD / p.classesPerMonth);
    expect(per[0]).toBeGreaterThan(per[1]!);
    expect(per[1]).toBeGreaterThan(per[2]!);
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
    expect(pricePerClass(hifzPlan, 'GBP')).toBe('£5.90');
  });
});
