import type { CourseId, Rating } from '@/types/domain';
import { env } from './env';

/**
 * Single source of truth for brand and contact details.
 * Replace every value in [brackets] before going live.
 */
export const site = {
  name: 'Mualim Ul Furqan',
  /** Logo lockup: shadda only, so the wordmark stays clean at small sizes. */
  arabicName: 'معلّم الفرقان',
  /** Fully vocalised name for large display (booking card, footer). */
  arabicNameFull: 'مُعَلِّمُ الْفُرْقَان',
  tagline: 'Online Quran Academy',
  description:
    'Live one-on-one Noorani Qaida, Nazra, Tajweed, Hifz and Duas classes for kids and adults in the UK, US and Europe.',
  url: env.siteUrl,

  teacher: {
    name: 'Qari Abu Sufyan',
    /** Cut-out portrait (transparent background) in /public. */
    photo: '/teachers/qari-abu-sufyan-v2.webp',
    role: 'Founder & lead teacher',
    yearsTeaching: 7,
    studentsTaught: '100+',
    lecturesDelivered: '2,000+',
    mosque: '[Your Mosque, City]',
    languages: '[English · Urdu]',
  },

  contact: {
    /** International format, digits only. VITE_WHATSAPP_NUMBER overrides it if set. */
    whatsappNumber: env.whatsappNumber || '923117503005',
    whatsappDisplay: '+92 311 7503005',
    email: 'mualimulfurqan@gmail.com',
  },

  /** Shown as "loved by N families" in the hero. */
  families: '20+',
  /**
   * Real average rating, e.g. from your Google Business profile: { score: '4.9', count: '12' }.
   * Leave null until you have one; stars and review counts stay hidden while it is null.
   */
  rating: null as Rating | null,

  links: {
    googleReviews: '#reviews',
    trustpilot: '#reviews',
    /** Google Meet's green room lets families check camera and mic before joining. */
    meetTest: 'https://meet.google.com/',
  },
} as const;

/** One link per programme tab in the Courses section (header menu, footer). */
export const courseLinks = [
  { id: 'qaida', label: 'Noorani Qaida', note: 'Letters and sounds, from zero', href: '/#qaida' },
  { id: 'nazra', label: 'Nazra', note: 'Read the Quran fluently', href: '/#nazra' },
  { id: 'tajweed', label: 'Tajweed', note: 'Recite with the rules', href: '/#tajweed' },
  { id: 'hifz', label: 'Hifz', note: 'Memorise the Quran', href: '/#hifz' },
  { id: 'duas', label: 'Duas', note: 'Everyday duas, with meaning', href: '/#duas' },
] as const satisfies readonly { id: CourseId; label: string; note: string; href: string }[];

export const navLinks = [
  { label: 'Courses', href: '/#courses' },
  { label: 'How it works', href: '/#how' },
  { label: 'Classroom', href: '/#classroom' },
  { label: 'Teachers', href: '/#teachers' },
  { label: 'Pricing', href: '/#pricing' },
  // Rename to 'Reviews' (here and in Footer) once real reviews are in features/reviews/data.ts.
  { label: 'Track record', href: '/#reviews' },
] as const;

/** In-page anchors used across sections. */
export const anchors = {
  book: '/#book',
  hifz: '/#hifz',
  pricing: '/#pricing',
} as const;
