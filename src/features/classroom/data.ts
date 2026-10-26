import type { IconName } from '@/components/ui';

export interface ClassroomFeature {
  icon: IconName;
  title: string;
  body: string;
}

export const leftFeatures: ClassroomFeature[] = [
  { icon: 'book', title: 'Shared mushaf', body: "Each ayah highlighted as it's read." },
  { icon: 'pen', title: 'Tajweed whiteboard', body: 'Makharij and rules drawn out, colour-coded.' },
];

export const rightFeatures: ClassroomFeature[] = [
  { icon: 'record', title: 'Lesson recordings', body: 'On request, to practise along at home.' },
  { icon: 'whatsapp', title: 'Homework on WhatsApp', body: 'Practice notes and audio after each class.' },
];

export const tajweedTags = [
  { label: 'Ikhfa', className: 'bg-mint text-brand' },
  { label: 'Madd · 2 counts', className: 'bg-sand text-earth' },
  { label: 'Qalqalah', className: 'bg-[#fbe7e5] text-[#8e2f2b]' },
] as const;

export const setupChecklist = ['Camera', 'Microphone', 'Zoom app'] as const;
