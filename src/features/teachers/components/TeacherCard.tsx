import { GirihPattern } from '@/components/decor/GirihPattern';
import { ButtonLink, PlayGlyph, Star } from '@/components/ui';
import { anchors } from '@/config/site';
import { buildWhatsAppLink, whatsappMessages } from '@/lib/whatsapp';
import type { Teacher } from '../data';

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <article className="lift border-line flex flex-1 flex-col overflow-hidden rounded-[28px] border bg-white">
      <div className="bg-night relative h-[210px] overflow-hidden">
        <GirihPattern tone="dark" />
        {teacher.acceptingStudents && (
          <span className="absolute top-5 left-5.5 inline-flex items-center gap-1.5 rounded-full bg-white/12 px-2.5 py-1 text-xs font-extrabold text-white">
            <span className="animate-pulse-ring bg-live size-1.75 rounded-full" />
            Taking new students
          </span>
        )}
        <button
          type="button"
          aria-label={`Play a recitation sample by ${teacher.name}`}
          className="bg-gold text-night absolute right-5.5 bottom-5.5 flex size-14 cursor-pointer items-center justify-center rounded-full transition hover:scale-105"
        >
          <PlayGlyph />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-7 pb-7">
        <div className="relative -mt-12 flex items-end gap-4">
          {teacher.photo ? (
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="size-26 shrink-0 rounded-[26px] border-4 border-white object-cover shadow-[0_10px_24px_-14px_rgb(10_42_36/0.5)]"
            />
          ) : (
            <span className="bg-sand text-earth flex size-26 shrink-0 items-center justify-center rounded-[26px] border-4 border-white text-center text-xs font-bold shadow-[0_10px_24px_-14px_rgb(10_42_36/0.5)]">
              [Your
              <br />
              photo]
            </span>
          )}
          <div className="pb-1.5">
            <h3 className="text-[23px] font-extrabold tracking-[-0.02em]">{teacher.name}</h3>
            <p className="text-muted text-sm">{teacher.role}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-bold">
          {teacher.rating && (
            <span className="inline-flex items-center gap-1.5">
              <Star />
              {teacher.rating.score} · {teacher.rating.count} reviews
            </span>
          )}
          <span className="text-muted">{teacher.years} yrs teaching</span>
          <span className="text-muted">{teacher.students} students</span>
        </div>
        <p className="text-muted text-[15px]">{teacher.bio}</p>
        <ul className="flex flex-wrap gap-2" aria-label="Subjects">
          {teacher.subjects.map((s) => (
            <li key={s} className="bg-mint text-brand rounded-lg px-2.5 py-1 text-[13px] font-bold">
              {s}
            </li>
          ))}
          <li className="bg-cream text-muted rounded-lg px-2.5 py-1 text-[13px] font-bold">
            {teacher.languages}
          </li>
        </ul>
        <div className="bg-parchment flex flex-col gap-1.5 rounded-[14px] p-3.5">
          <span className="text-muted text-xs font-extrabold tracking-[0.08em] uppercase">
            Usual availability (UK time)
          </span>
          <div className="flex flex-wrap gap-1.5 text-[13px] font-bold">
            {teacher.availability.map((a) => (
              <span key={a} className="border-line rounded-lg border bg-white px-2.5 py-1">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2.5">
          <ButtonLink href={anchors.book} trackAs="Lead" className="flex-1">
            Book a free trial
          </ButtonLink>
          <ButtonLink href={buildWhatsAppLink(whatsappMessages.general)} variant="soft" trackAs="Contact">
            Message
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
