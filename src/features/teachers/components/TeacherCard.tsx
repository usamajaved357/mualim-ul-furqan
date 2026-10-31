import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, Icon, PlayGlyph, Star } from '@/components/ui';
import { openingHours } from '@/config/hours';
import { anchors } from '@/config/site';
import { hoursList, visitorTimeZone } from '@/lib/timezone';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { Teacher } from '../data';

const ARCH = 'rounded-t-[999px] rounded-b-[30px]';

/**
 * Cut-out portrait set into a mihrab arch: mint-to-emerald backdrop with a soft halo behind the head and an offset
 * sand arch behind for depth. The cut-out stands upright inside the arch with headroom; it runs past the arch bottom
 * and its sides fade out, so the photo's shoulder and chest crop is never visible.
 */
function Portrait({ teacher }: { teacher: Teacher }) {
  return (
    <div className="relative mx-auto w-full max-w-[380px] pr-4 pb-8">
      <div aria-hidden className={`bg-sand absolute inset-0 top-5 bottom-3 left-5 ${ARCH}`} />

      <div className="relative aspect-[4/5]">
        <div
          className={`via-brand-light to-brand absolute inset-0 overflow-hidden bg-gradient-to-b from-[#bfe8d6] shadow-[0_44px_80px_-36px_rgb(10_42_36/0.85)] ${ARCH}`}
        >
          <GirihPattern tone="dark" className="opacity-60" />
          <div
            aria-hidden
            className="absolute top-[10%] left-1/2 aspect-square w-[90%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.6)_0%,rgb(255_255_255/0.2)_40%,transparent_66%)]"
          />
          <div aria-hidden className={`absolute inset-2.5 border border-white/40 ${ARCH}`} />
        </div>

        {teacher.photo ? (
          <div className={`absolute inset-0 overflow-hidden ${ARCH}`}>
            <img
              src={teacher.photo}
              alt={`Portrait of ${teacher.name}`}
              width={1000}
              height={1236}
              loading="lazy"
              className="absolute -bottom-[4%] left-1/2 w-[92%] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] drop-shadow-[0_22px_28px_rgb(10_42_36/0.35)]"
            />
            <div
              aria-hidden
              className="from-brand-dark/30 absolute inset-x-0 bottom-0 h-[10%] bg-gradient-to-t to-transparent"
            />
          </div>
        ) : (
          <span className="text-gold absolute inset-0 flex items-center justify-center text-sm font-bold">
            [Your photo]
          </span>
        )}
      </div>
      <p
        lang="ar"
        dir="rtl"
        className="font-naskh text-brand border-line shadow-card absolute bottom-0 left-[calc(50%-0.5rem)] -translate-x-1/2 rounded-full border bg-white px-6 text-[19px] leading-[2] font-bold whitespace-nowrap shadow-[0_14px_30px_-14px_rgb(10_42_36/0.8)]"
      >
        قارئ ومعلّم القرآن
      </p>

      {teacher.acceptingStudents && (
        <span className="text-ink absolute top-[16%] -left-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-extrabold shadow-[0_14px_30px_-14px_rgb(10_42_36/0.6)] sm:-left-7">
          <span className="animate-pulse-ring bg-whatsapp size-2 rounded-full" />
          Taking new students
        </span>
      )}
      <span className="bg-gold-deep absolute right-0 bottom-[24%] flex flex-col items-center rounded-2xl px-4 py-2.5 text-center text-white shadow-[0_14px_30px_-14px_rgb(10_42_36/0.6)] sm:-right-3">
        <span className="text-[26px] leading-none font-extrabold">{teacher.years}</span>
        <span className="text-[11px] font-extrabold tracking-[0.08em] uppercase">years</span>
      </span>
      {teacher.recitation && (
        <a
          href={teacher.recitation}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Play a recitation sample by ${teacher.name}`}
          className="bg-gold text-night absolute bottom-16 left-[calc(50%-1rem)] flex size-14 -translate-x-1/2 items-center justify-center rounded-full transition hover:scale-105"
        >
          <PlayGlyph />
        </a>
      )}
    </div>
  );
}

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="border-line shadow-card grid items-center gap-10 rounded-[36px] border bg-white p-6 sm:p-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
      <Portrait teacher={teacher} />

      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-brand text-sm font-bold">{teacher.role}</p>
          <h3 className="text-[clamp(32px,3.4vw,46px)] leading-tight">{teacher.name}</h3>
        </div>
        <p className="text-muted text-[17px]">{teacher.bio}</p>

        <dl className="grid grid-cols-3 gap-3">
          {[
            { label: 'Years teaching', value: String(teacher.years) },
            { label: 'Students', value: teacher.students },
            ...(teacher.rating
              ? [{ label: `${teacher.rating.count} reviews`, value: teacher.rating.score }]
              : [{ label: 'Lesson minutes', value: '30–45' }]),
          ].map((s) => (
            <div key={s.label} className="bg-parchment rounded-[20px] px-4 py-3.5">
              <dt className="text-muted text-xs font-bold">{s.label}</dt>
              <dd className="font-display text-brand m-0 inline-flex items-center gap-1.5 text-[22px] font-bold tracking-[-0.03em] whitespace-nowrap sm:text-[26px]">
                {teacher.rating && s.value === teacher.rating.score && <Star />}
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Subjects">
          {teacher.subjects.map((s) => (
            <li key={s} className="bg-mint text-brand rounded-full px-3.5 py-1.5 text-[13px] font-bold">
              {s}
            </li>
          ))}
          <li className="bg-cream text-muted rounded-full px-3.5 py-1.5 text-[13px] font-bold">
            {teacher.languages}
          </li>
        </ul>

        <div className="flex flex-col gap-2">
          <span className="text-muted inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[0.08em] uppercase">
            <Icon name="clock" size={14} strokeWidth={2.2} />
            Availability (your time)
          </span>
          <div className="flex flex-wrap gap-2 text-sm font-bold">
            {hoursList(openingHours, visitorTimeZone(), new Date()).map((h) => (
              <span key={h.days} className="border-line rounded-full border bg-white px-3.5 py-1.5">
                {h.days} · {h.time}
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
