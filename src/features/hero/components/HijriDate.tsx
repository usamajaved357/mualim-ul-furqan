import { useMemo } from 'react';
import { Icon } from '@/components/ui';
import { hijriDate } from '@/lib/hijri';
import { visitorTimeZone } from '@/lib/timezone';

/**
 * Today's Islamic date, in the visitor's own time zone: a small glass pill beside the Bismillah, with the
 * month also in Arabic calligraphy. Hidden if the browser has no Islamic calendar.
 */
export function HijriDate() {
  const date = useMemo(() => hijriDate(new Date(), visitorTimeZone()), []);
  if (!date) return null;
  return (
    <p
      className="glass-dark text-mist inline-flex w-fit items-center gap-2.5 rounded-full py-1.5 pr-4 pl-2 text-[13px] font-semibold"
      title="Umm al-Qura calendar. It can differ by a day from local moon sighting."
    >
      <span className="bg-gold/15 text-gold flex size-7 items-center justify-center rounded-full">
        <Icon name="moon" size={14} strokeWidth={2.2} />
      </span>
      <span>
        <span className="text-white">
          {date.day} {date.monthName}
        </span>{' '}
        {date.year} AH
      </span>
      <span aria-hidden className="h-4 w-px bg-white/20" />
      <span lang="ar" dir="rtl" className="font-calligraphy text-gold text-[19px] leading-none">
        {date.monthArabic}
      </span>
    </p>
  );
}
