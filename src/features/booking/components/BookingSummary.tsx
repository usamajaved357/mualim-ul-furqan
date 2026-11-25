import { ButtonLink, Icon, StarGlyph, type IconName } from '@/components/ui';
import { TeacherAvatar } from '@/components/brand/TeacherAvatar';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { BookingState } from '../hooks/useBooking';
import { formatDayLong, formatTime, timeZoneCity } from '../lib/calendar';

const promises: { icon: IconName; text: string }[] = [
  { icon: 'check', text: 'Free, no card or payment' },
  { icon: 'eye', text: 'Parents are welcome to watch' },
  { icon: 'shield', text: 'Private Google Meet link, just for you' },
];

function Row({ label, value, filled }: { label: string; value: string; filled: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2.5">
      <dt className="text-mist text-[13px] font-semibold">{label}</dt>
      <dd
        className={cn(
          'text-right text-[14px] font-bold transition-colors duration-500',
          filled ? 'text-white' : 'text-white/35',
        )}
      >
        {value}
      </dd>
    </div>
  );
}

/**
 * "Your free class" card beside the booking widget: the teacher, and a live summary of what the visitor has
 * picked so far (time, course, learner), so the choices are always in view.
 */
export function BookingSummary({ booking }: { booking: BookingState }) {
  const { slot, timeZone, form, result } = booking;
  const when = slot ?? (result ? new Date(result.start) : null);
  return (
    <aside className="flex flex-col gap-4" aria-label="Your free class">
      <div className="card-night grain overflow-hidden rounded-[30px] p-6">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-[radial-gradient(circle,rgb(25_162_122/0.5),transparent_65%)]"
        />
        <div className="relative flex items-center gap-4">
          <TeacherAvatar className="h-24 w-[78px] rounded-t-full rounded-b-2xl ring-2 ring-[#e9c77a]/80 ring-offset-2 ring-offset-[#0b3a2d]" />
          <span className="flex flex-col leading-tight">
            <span className="text-gold text-[12px] font-bold tracking-[0.14em] uppercase">Your teacher</span>
            <span className="font-display text-[20px] font-bold tracking-[-0.02em]">{site.teacher.name}</span>
            <span className="text-mist text-[13px]">
              {site.teacher.yearsTeaching} years teaching · {site.teacher.studentsTaught} students
            </span>
          </span>
        </div>

        <dl className="relative mt-5 divide-y divide-white/10 border-y border-white/10">
          <Row label="Date" value={when ? formatDayLong(when, timeZone) : 'Pick a day'} filled={!!when} />
          <Row
            label="Time"
            value={when ? `${formatTime(when, timeZone)} (${timeZoneCity(timeZone)})` : 'Pick a time'}
            filled={!!when}
          />
          <Row label="Course" value={form.course} filled />
          <Row
            label="Learner"
            value={form.learner === 'child' ? (form.studentName ? form.studentName : 'Your child') : 'You'}
            filled
          />
          <Row label="Length" value="30 minutes · Google Meet" filled />
        </dl>

        <ul className="relative mt-5 flex flex-col gap-2.5">
          {promises.map((p) => (
            <li key={p.text} className="flex items-center gap-2.5 text-[14px]">
              <span className="bg-gold/15 text-gold flex size-6 shrink-0 items-center justify-center rounded-full">
                <Icon name={p.icon} size={13} strokeWidth={2.6} />
              </span>
              {p.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="glass flex items-center gap-3 rounded-[22px] p-4">
        <span className="bg-whatsapp flex size-10 shrink-0 items-center justify-center rounded-full text-white">
          <Icon name="whatsapp" size={20} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="text-[14px] font-bold">Prefer to chat first?</span>
          <span className="text-muted text-[13px]">We usually reply within the hour.</span>
        </span>
        <ButtonLink
          href={buildWhatsAppLink(whatsappMessages.trial)}
          variant="outline"
          size="sm"
          trackAs="Contact"
        >
          WhatsApp
        </ButtonLink>
      </div>

      <figure className="m-0 flex items-start gap-3 px-2">
        <StarGlyph className="text-gold-deep mt-1 size-3.5 shrink-0" />
        <blockquote className="text-muted m-0 text-[13.5px] leading-relaxed">
          “The best of you are those who learn the Quran and teach it.”
          <span className="text-bronze block pt-1 text-[12px] font-semibold">Sahih al-Bukhari 5027</span>
        </blockquote>
      </figure>
    </aside>
  );
}
