import type { CurrencyCode } from '@/types/domain';

export interface Plan {
  id: 'starter' | 'regular' | 'intensive' | 'hifz';
  name: string;
  classesPerWeek: number;
  classesPerMonth: number;
  /** Length of each lesson. */
  minutes: number;
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
    minutes: 30,
    price: { USD: 34, GBP: 27, EUR: 31 },
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'A steady, gentle pace'],
  },
  {
    id: 'regular',
    name: 'Regular',
    classesPerWeek: 3,
    classesPerMonth: 12,
    minutes: 30,
    price: { USD: 49, GBP: 39, EUR: 45 },
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'The best pace for most children'],
    featured: true,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    classesPerWeek: 5,
    classesPerMonth: 20,
    minutes: 30,
    price: { USD: 72, GBP: 57, EUR: 66 },
    perks: [
      'Live 1-on-1 with your teacher',
      'Monthly progress report',
      'Fastest progress, lowest price per class',
    ],
  },
];

/**
 * Hifz: daily 45-minute lessons (new lesson + two kinds of revision). Priced a little below the Intensive plan's
 * per-minute rate. Proposed price: confirm before launch.
 */
export const hifzPlan: Plan = {
  id: 'hifz',
  name: 'Hifz programme',
  classesPerWeek: 5,
  classesPerMonth: 20,
  minutes: 45,
  price: { USD: 99, GBP: 79, EUR: 89 },
  perks: [
    'Sabaq, sabqi and manzil in every lesson',
    'Monthly progress report',
    'Daily home-revision routine',
    'Same teacher, every lesson',
  ],
};

/** Placeholders: confirm these policies before launch. */
export const pricingPerks = [
  { icon: 'users', text: 'Brothers & sisters: [10]% off' },
  { icon: 'calendar', text: 'Pay monthly, [cancel anytime]' },
] as const;
