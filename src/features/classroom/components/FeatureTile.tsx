import { Icon, Reveal } from '@/components/ui';
import type { ClassroomFeature } from '../data';

export function FeatureTile({ feature, delay = 0 }: { feature: ClassroomFeature; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="flex flex-col gap-2 rounded-[22px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur"
    >
      <span className="bg-gold/15 text-gold flex size-10 items-center justify-center rounded-full">
        <Icon name={feature.icon} size={20} strokeWidth={1.8} />
      </span>
      <h3 className="font-display text-[17px] font-semibold text-white">{feature.title}</h3>
      <p className="text-mist text-[14px] leading-snug">{feature.body}</p>
    </Reveal>
  );
}
