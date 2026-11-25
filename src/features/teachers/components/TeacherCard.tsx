import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, Icon, PlayGlyph, Star } from '@/components/ui';
import { openingHours } from '@/config/hours';
import { anchors } from '@/config/site';
import { hoursList, visitorTimeZone } from '@/lib/timezone';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { Teacher } from '../data';

const ARCH = 'rounded-t-[999px] rounded-b-[30px]';
const ARCH_INNER = 'rounded-t-[999px] rounded-b-[20px]';

/**
 * Cut-out portrait set into a mihrab arch. The photo was cut out from a white background, so its hair and beard
 * edges carry faint light fringes: it sits on a warm parchment backdrop (where those fringes disappear) inside a
 * deep emerald arch with a gold hairline, like a framed miniature. The shoulders dissolve into a dark base, so the
 * photo's straight bottom crop is never seen, and the sides fade into the backdrop.
 */
function Portrait({ teacher }: { teacher: Teacher }) {
  return (
    <div className="relative mx-auto w-full max-w-[380px] pr-4 pb-8">
      <div
        aria-hidden
        className={`absolute inset-0 top-5 bottom-3 left-5 bg-[linear-gradient(160deg,#fff4dc,#f6d999)] ${ARCH}`}
      />

      <div className="relative aspect-[4/5]">
        {/* Emerald frame */}
        <div
          aria-hidden
          className={`bg-abyss absolute inset-0 overflow-hidden shadow-[0_44px_80px_-36px_rgb(4_21_15/0.9)] ${ARCH}`}
        >
          <GirihPattern tone="dark" className="opacity-60" />
        </div>

        {/* Parchment backdrop, inset like a mount, with the photo inside */}
        <div
          className={`absolute inset-3 overflow-hidden bg-[radial-gradient(ellipse_80%_65%_at_50%_38%,#fffbf2_0%,#f8eed6_45%,#ead6a8_100%)] outline outline-1 outline-offset-[3px] outline-[#e2c071]/70 ${ARCH_INNER}`}
        >
          <GirihPattern className="opacity-70" />
          {teacher.photo ? (
            <>
              <img
                src={teacher.photo}
                alt={`Portrait of ${teacher.name}`}
                width={1000}
                height={1236}
                loading="lazy"
                className="absolute -bottom-[7%] left-1/2 w-[98%] max-w-none -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
              />
              {/* Shoulders melt into a dark base, hiding the straight crop of the photo. */}
              <div
                aria-hidden
                className="from-abyss via-abyss/35 absolute inset-x-0 bottom-0 h-[13%] bg-gradient-to-t to-transparent"
              />
            </>
          ) : (
            <span className="text-bronze absolute inset-0 flex items-center justify-center text-sm font-bold">
              [Your photo]
            </span>
          )}
        </div>
      </div>
      <p
        lang="ar"
        dir="rtl"
        className="font-calligraphy text-brand border-line shadow-card absolute bottom-0 left-[calc(50%-0.5rem)] -translate-x-1/2 rounded-full border bg-white px-6 text-[27px] leading-[1.8] font-bold whitespace-nowrap shadow-[0_14px_30px_-14px_rgb(10_42_36/0.8)]"
      >
        قارئ ومعلّم القرآن
      </p>

      {teacher.acceptingStudents && (
        <span className="glass text-ink absolute top-[16%] -left-3 inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-extrabold sm:-left-7">
          <span className="animate-pulse-ring bg-whatsapp size-2 rounded-full" />
          Taking new students
        </span>
      )}
      <span className="text-abyss absolute right-0 bottom-[24%] flex flex-col items-center rounded-2xl bg-[linear-gradient(180deg,#fbe2a6,#e9b45a)] px-4 py-2.5 text-center shadow-[inset_0_1px_0_rgb(255_255_255/0.7),0_14px_30px_-14px_rgb(10_42_36/0.6)] sm:-right-3">
        <span className="font-display text-[26px] leading-none font-extrabold">{teacher.years}</span>
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
    <article className="card spotlight grid items-center gap-10 rounded-[36px] p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 [&>*]:relative [&>*]:z-10">
      <Portrait teacher={teacher} />

      <div className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-brand text-[12.5px] font-bold tracking-[0.16em] uppercase">{teacher.role}</p>
          <h3 className="text-[clamp(32px,3.4vw,46px)] leading-tight font-[700]">{teacher.name}</h3>
        </div>
        <p className="text-muted text-[17px]">{teacher.bio}</p>

        <dl className="border-line divide-line grid grid-cols-3 divide-x border-y py-4">
          {[
            { label: 'Years teaching', value: String(teacher.years) },
            { label: 'Students', value: teacher.students },
            ...(teacher.rating
              ? [{ label: `${teacher.rating.count} reviews`, value: teacher.rating.score }]
              : [{ label: 'Lesson minutes', value: '30–45' }]),
          ].map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-1 px-4 first:pl-0">
              <dt className="text-muted text-[12px] font-bold tracking-[0.08em] uppercase">{s.label}</dt>
              <dd className="font-display text-ink m-0 inline-flex items-center gap-1.5 text-[26px] leading-none font-[600] tracking-[-0.04em] whitespace-nowrap sm:text-[30px]">
                {teacher.rating && s.value === teacher.rating.score && <Star />}
                {s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="flex flex-wrap gap-2" aria-label="Subjects">
          {teacher.subjects.map((s) => (
            <li
              key={s}
              className="border-line text-ink rounded-full border bg-white px-3.5 py-1.5 text-[13px] font-semibold"
            >
              {s}
            </li>
          ))}
          <li className="text-bronze rounded-full bg-[#fdf0d5] px-3.5 py-1.5 text-[13px] font-semibold">
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
              <span key={h.days} className="bg-mint text-brand rounded-full px-3.5 py-1.5">
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
            className="max-sm:flex-1"
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
