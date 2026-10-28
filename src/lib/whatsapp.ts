import { site } from '@/config/site';

/**
 * Build a wa.me deep link with an optional pre-filled message.
 * Falls back to the booking anchor when no number is configured.
 */
export function buildWhatsAppLink(message?: string, number: string = site.contact.whatsappNumber): string {
  const digits = number.replace(/\D/g, '');
  if (!digits) return '/#book';
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const whatsappMessages = {
  general: 'Assalamu alaikum, I would like to know more about your Quran classes.',
  trial: 'Assalamu alaikum, I would like to book a free trial class.',
  customPlan: 'Assalamu alaikum, I need a custom plan (1 class a week / siblings).',
} as const;
