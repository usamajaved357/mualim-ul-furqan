import { plans } from '../data';
import { detectCurrency, formatPrice, pricePerClass } from './pricing';

const [starter, regular, intensive] = plans;

describe('pricing', () => {
  it('formats whole prices without decimals', () => {
    expect(formatPrice(49, 'USD')).toBe('$49');
    expect(formatPrice(39, 'GBP')).toBe('£39');
  });

  it('calculates the price per class', () => {
    expect(pricePerClass(starter!, 'USD')).toBe('$4.25');
    expect(pricePerClass(regular!, 'GBP')).toBe('£3.25');
    expect(pricePerClass(intensive!, 'EUR')).toBe('€3.30');
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
