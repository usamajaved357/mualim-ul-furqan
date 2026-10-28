import type { CurrencyCode } from '@/types/domain';

export interface Plan {
  id: 'starter' | 'regular' | 'intensive';
  name: string;
  classesPerWeek: number;
  classesPerMonth: number;
  /** Monthly price per currency. ~10–15% below the market average. */
  price: Record<CurrencyCode, number>;
  perks: string[];
  featured?: boolean;
}

export const currencies: { value: CurrencyCode; label: string; symbol: string }[] = [
  { value: 'USD', label: 'USD', symbol: '$' },
  { value: 'GBP', label: 'GBP', symbol: '£' },
  { value: 'EUR', label: 'EUR', symbol: '€' },
];

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    classesPerWeek: 2,
    classesPerMonth: 8,
    price: { USD: 34, GBP: 27, EUR: 31 },
    perks: ['One-on-one with your teacher', 'Monthly progress report', 'Steady weekly progress'],
  },
  {
    id: 'regular',
    name: 'Regular',
    classesPerWeek: 3,
    classesPerMonth: 12,
    price: { USD: 49, GBP: 39, EUR: 45 },
    perks: ['One-on-one with your teacher', 'Monthly progress report', 'The best pace for most children'],
    featured: true,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    classesPerWeek: 5,
    classesPerMonth: 20,
    price: { USD: 72, GBP: 57, EUR: 66 },
    perks: ['One-on-one with your teacher', 'Monthly progress report', 'Fastest progress, best value'],
  },
];

/** Placeholders: confirm these policies before launch. */
export const pricingPerks = [
  { icon: 'users', text: 'Brothers & sisters: [10]% off' },
  { icon: 'calendar', text: 'Pay monthly, [cancel anytime]' },
] as const;
