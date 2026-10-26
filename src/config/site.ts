import { env } from './env';

/**
 * Single source of truth for brand and contact details.
 * Replace every value in [brackets] before going live.
 */
export const site = {
  name: 'Mulaim-ul-Furqan',
  arabicName: 'معلم الفرقان',
  tagline: 'Online Quran Academy',
  description:
    'Live one-on-one Noorani Qaida, Nazra, Tajweed and Duas classes for kids and adults in the UK, US and Europe.',
  url: env.siteUrl,

  teacher: {
    name: 'Qari [Your Name]',
    role: 'Founder & lead teacher',
    yearsTeaching: 7,
    mosque: '[Your Mosque, City]',
    languages: '[English · Urdu]',
  },

  contact: {
    whatsappNumber: env.whatsappNumber,
    whatsappDisplay: '[+XX XXX XXX XXXX]',
    email: '[hello@yourdomain.com]',
  },

  rating: { score: '[4.9]', count: '[N]' },

  links: {
    googleReviews: '#reviews',
    trustpilot: '#reviews',
    zoomTest: 'https://zoom.us/test',
  },
} as const;

export const navLinks = [
  { label: 'Courses', href: '/#courses' },
  { label: 'How it works', href: '/#how' },
  { label: 'Classroom', href: '/#classroom' },
  { label: 'Teachers', href: '/#teachers' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Reviews', href: '/#reviews' },
] as const;

/** In-page anchors used across sections. */
export const anchors = {
  book: '/#book',
  portal: '/#portal',
} as const;
