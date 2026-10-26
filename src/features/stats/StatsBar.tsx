import { Container, Icon, Reveal, type IconName } from '@/components/ui';
import { site } from '@/config/site';

/** Replace the [placeholders] with real numbers as soon as you have them. */
const stats: { icon: IconName; value: string; label: string }[] = [
  { icon: 'book', value: `${site.teacher.yearsTeaching} years`, label: 'teaching Quran' },
  { icon: 'users', value: '[XXX]+', label: 'students taught' },
  { icon: 'video', value: '[X,XXX]+', label: 'live classes taught' },
  { icon: 'globe', value: 'UK · US · EU', label: 'time zones covered' },
];

export function StatsBar() {
  return (
    <section aria-label="At a glance">
      <Container className="pt-2 pb-10">
        <Reveal as="ul" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="border-line bg-parchment flex flex-col items-start gap-3 rounded-[20px] border p-4 sm:flex-row sm:items-center sm:gap-4 sm:p-6"
            >
              <span className="bg-brand text-gold flex size-11 shrink-0 items-center justify-center rounded-[14px] sm:size-13">
                <Icon name={s.icon} size={24} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block text-[21px] leading-tight font-extrabold tracking-[-0.03em] sm:text-[30px]">
                  {s.value}
                </span>
                <span className="text-muted block text-sm font-semibold">{s.label}</span>
              </span>
            </li>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
