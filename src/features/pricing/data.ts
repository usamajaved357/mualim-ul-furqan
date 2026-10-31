import type { CurrencyCode } from '@/types/domain';

export interface Plan {
  id: 'starter' | 'regular' | 'intensive' | 'hifz';
  name: string;
  classesPerWeek: number;
  classesPerMonth: number;
  /** Length of each lesson. */
  minutes: number;
  /** Monthly price per currency. Set in USD by the academy; GBP and EUR converted (≈0.79 and ≈0.92) and rounded to .99. */
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
    price: { USD: 49.99, GBP: 38.99, EUR: 45.99 },
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'A steady, gentle pace'],
  },
  {
    id: 'regular',
    name: 'Regular',
    classesPerWeek: 3,
    classesPerMonth: 12,
    minutes: 30,
    price: { USD: 69.99, GBP: 54.99, EUR: 63.99 },
    perks: ['Live 1-on-1 with your teacher', 'Monthly progress report', 'The best pace for most children'],
    featured: true,
  },
  {
    id: 'intensive',
    name: 'Intensive',
    classesPerWeek: 5,
    classesPerMonth: 20,
    minutes: 30,
    price: { USD: 99.99, GBP: 78.99, EUR: 91.99 },
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
  price: { USD: 149.99, GBP: 117.99, EUR: 137.99 },
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
