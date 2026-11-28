export interface Plan {
  id: 'starter' | 'regular' | 'intensive' | 'hifz';
  name: string;
  classesPerWeek: number;
  classesPerMonth: number;
  /** Length of each lesson. */
  minutes: number;
  /** Monthly price in US dollars, the billing currency. Other currencies are a guide, converted at live rates. */
  usd: number;
  perks: string[];
  featured?: boolean;
}

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

/** Policies as set out in the terms of service (src/pages/TermsPage.tsx). */
export const pricingPerks = [
  {
    icon: 'users',
    tint: 'from-brand-light to-brand',
    title: 'Sibling discount',
    body: 'Brothers & sisters: 10% off each',
  },
  {
    icon: 'calendar',
    tint: 'from-amber to-gold-deep',
    title: 'Simple monthly billing',
    body: 'Pay monthly by Payoneer, cancel anytime',
  },
] as const;
