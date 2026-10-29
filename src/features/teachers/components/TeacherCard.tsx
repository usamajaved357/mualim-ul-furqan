import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, Icon, PlayGlyph, Star } from '@/components/ui';
import { anchors } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { Teacher } from '../data';

/** Portrait in a mihrab-arch frame. */
function Portrait({ teacher }: { teacher: Teacher }) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="bg-night relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] p-2.5 shadow-[0_40px_80px_-40px_rgb(10_42_36/0.8)]">
        <GirihPattern tone="dark" />
        <div className="border-gold/60 relative size-full overflow-hidden rounded-t-[999px] rounded-b-[20px] border-2">
          {teacher.photo ? (
            <img
              src={teacher.photo}
              alt={`Portrait of ${teacher.name}`}
              className="size-full object-cover object-[50%_20%]"
            />
          ) : (
            <span className="bg-sand text-earth flex size-full items-center justify-center text-sm font-bold">
              [Your photo]
            </span>
          )}
          <div className="from-night/80 absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t to-transparent" />
        </div>
      </div>
      {teacher.acceptingStudents && (
        <span className="text-ink absolute top-[14%] -left-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-extrabold shadow-[0_14px_30px_-14px_rgb(10_42_36/0.6)] sm:-left-6">
          <span className="animate-pulse-ring bg-whatsapp size-2 rounded-full" />
          Taking new students
        </span>
      )}
      <span className="bg-gold text-night absolute -right-2 bottom-[18%] flex flex-col items-center rounded-2xl px-4 py-2.5 text-center shadow-[0_14px_30px_-14px_rgb(10_42_36/0.6)] sm:-right-5">
        <span className="text-[26px] leading-none font-extrabold">{teacher.years}</span>
        <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase">years</span>
      </span>
      {teacher.recitation && (
        <a
          href={teacher.recitation}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play a recitation sample by ${teacher.name}`}
          className="bg-gold text-night absolute bottom-6 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full transition hover:scale-105"
        >
          <PlayGlyph />
        </a>
      )}
    </div>
  );
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="border-line grid items-center gap-10 rounded-[34px] border bg-white p-6 shadow-[0_40px_80px_-60px_rgb(10_42_36/0.5)] sm:p-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <Portrait teacher={teacher} />

      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-bronze text-[13px] font-extrabold tracking-[0.12em] uppercase">{teacher.role}</p>
          <h3 className="text-[clamp(30px,3vw,40px)] leading-tight font-extrabold tracking-[-0.03em]">
            {teacher.name}
          </h3>
        </div>
        <p className="text-muted text-[17px]">{teacher.bio}</p>

        <dl className="grid grid-cols-3 gap-3">
          {[
            { label: 'Years teaching', value: String(teacher.years) },
            { label: 'Students', value: teacher.students },
            ...(teacher.rating
              ? [{ label: `${teacher.rating.count} reviews`, value: teacher.rating.score }]
              : [{ label: 'Lesson length', value: '30 min' }]),
          ].map((s) => (
            <div key={s.label} className="bg-parchment border-line rounded-2xl border px-4 py-3.5">
              <dt className="text-muted text-xs font-bold">{s.label}</dt>
              <dd className="m-0 inline-flex items-center gap-1.5 text-[22px] font-extrabold tracking-[-0.02em]">
                {teacher.rating && s.value === teacher.rating.score && <Star />}
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Subjects">
          {teacher.subjects.map((s) => (
            <li key={s} className="bg-mint text-brand rounded-lg px-3 py-1.5 text-[13px] font-bold">
              {s}
            </li>
          ))}
          <li className="bg-cream text-muted rounded-lg px-3 py-1.5 text-[13px] font-bold">
            {teacher.languages}
          </li>
        </ul>

        <div className="flex flex-col gap-2">
          <span className="text-muted inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.08em] uppercase">
            <Icon name="clock" size={14} strokeWidth={2.2} />
            Usual availability (UK time)
          </span>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            {teacher.availability.map((a) => (
              <span key={a} className="border-line rounded-xl border bg-white px-3 py-1.5">
                {a}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <ButtonLink href={anchors.book} trackAs="Lead" size="lg" iconRight="arrow-right" className="flex-1">
            Book a free trial class
          </ButtonLink>
          <ButtonLink
            href={buildWhatsAppLink(whatsappMessages.general)}
            variant="soft"
            size="lg"
            iconLeft="whatsapp"
            trackAs="Contact"
          >
            Message
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
