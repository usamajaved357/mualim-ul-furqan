import type { IconName } from '@/components/ui';

export interface ClassroomFeature {
  icon: IconName;
  /** Gradient for the app-style icon tile. */
  tint: string;
  title: string;
  body: string;
}

export const leftFeatures: ClassroomFeature[] = [
  {
    icon: 'book',
    tint: 'from-brand-light to-brand',
    title: 'Shared mushaf',
    body: "Each ayah highlighted as it's read.",
  },
  {
    icon: 'pen',
    tint: 'from-amber to-gold-deep',
    title: 'Tajweed rules, colour-coded',
    body: 'Makharij and rules marked on the shared page.',
  },
  {
    icon: 'captions',
    tint: 'from-call-blue to-sky-ink',
    title: 'Live captions',
    body: 'Every correction written on screen as it is said.',
  },
];

export const rightFeatures: ClassroomFeature[] = [
  {
    icon: 'video',
    tint: 'from-brand-light to-brand',
    title: 'Private Google Meet',
    body: 'Your own link for every class, sent by email.',
  },
  {
    icon: 'whatsapp',
    tint: 'from-live to-whatsapp',
    title: 'Homework on WhatsApp',
    body: 'Practice notes and audio after each class.',
  },
  {
    icon: 'record',
    tint: 'from-rec to-rose-ink',
    title: 'Lesson recordings',
    body: 'On request, to practise along at home.',
  },
];

export const tajweedTags = [
  { label: 'Ikhfa', className: 'bg-mint text-brand' },
  { label: 'Madd · 2 counts', className: 'bg-sand text-earth' },
  { label: 'Qalqalah', className: 'bg-[#fbe7e5] text-[#8e2f2b]' },
] as const;

/** Example call shown in the classroom mockup (illustrative names and code). */
export const classroomCall = {
  lesson: 'Tajweed lesson',
  code: 'mqf-tjwd-nun',
  time: '5:30 PM',
  student: 'Aisha',
  parent: 'Mum',
  caption: 'Beautiful! Now hold the ghunnah for two counts on the noon.',
} as const;

export const setupChecklist = ['Camera', 'Microphone', 'Google Meet'] as const;
