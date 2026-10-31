import { Icon, Reveal } from '@/components/ui';
import type { ClassroomFeature } from '../data';

export function FeatureTile({ feature, delay = 0 }: { feature: ClassroomFeature; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex items-start gap-3.5 rounded-[22px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur sm:flex-col sm:gap-2 sm:p-5"
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-[13px] bg-gradient-to-br text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] ${feature.tint}`}
      >
        <Icon name={feature.icon} size={19} strokeWidth={2.1} />
      </span>
      <div className="flex min-w-0 flex-col gap-1 sm:gap-2">
        <h3 className="font-display text-[17px] font-semibold text-white">{feature.title}</h3>
        <p className="text-mist text-[14px] leading-snug">{feature.body}</p>
      </div>
    </Reveal>
  );
}
