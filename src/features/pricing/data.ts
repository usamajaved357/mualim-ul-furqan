import type { CurrencyCode } from '@/types/domain';

export interface Plan {
  id: 'starter' | 'regular' | 'intensive' | 'hifz';
  name: string;
  classesPerWeek: number;
  classesPerMonth: number;
  /** Length of each lesson. */
  minutes: number;
  /** Monthly price in US dollars. Other currencies are converted from it (see exchangeRates). */
  usd: number;
  perks: string[];
  featured?: boolean;
}

/**
 * How many units of each currency one US dollar buys: ECB reference rates (frankfurter.dev), 30 October 2026.
 * Update these now and then; every plan price follows automatically.
 */
export const exchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.74633,
  EUR: 0.89509,
};

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
    usd: 49.99,
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'A steady, gentle pace'],
  },
  {
    id: 'regular',
    name: 'Regular',
    classesPerWeek: 3,
    classesPerMonth: 12,
    minutes: 30,
    usd: 69.99,
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'The best pace for most children'],
    featured: true,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    classesPerWeek: 5,
    classesPerMonth: 20,
    minutes: 30,
    usd: 99.99,
    perks: [
      'Live 1-on-1 with your teacher',
      'Monthly progress report',
      'Fastest progress, lowest price per class',
    ],
  },
];

/** Hifz: daily 45-minute lessons (new lesson + two kinds of revision). */
export const hifzPlan: Plan = {
  id: 'hifz',
  name: 'Hifz programme',
  classesPerWeek: 5,
  classesPerMonth: 20,
  minutes: 45,
  usd: 149.99,
  perks: [
    'Sabaq, sabqi and manzil in every lesson',
    'Monthly progress report',
    'Daily home-revision routine',
    'Same teacher, every lesson',
  ],
};

/** Placeholders: confirm these policies before launch. */
export const pricingPerks = [
  {
    icon: 'users',
    tint: 'from-brand-light to-brand',
    title: 'Sibling discount',
    body: 'Brothers & sisters: [10]% off',
  },
  {
    icon: 'calendar',
    tint: 'from-amber to-gold-deep',
    title: 'Simple monthly billing',
    body: 'Pay monthly, [cancel anytime]',
  },
] as const;
