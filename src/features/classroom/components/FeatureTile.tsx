import { Icon, Reveal } from '@/components/ui';
import type { ClassroomFeature } from '../data';

export function FeatureTile({ feature, delay = 0 }: { feature: ClassroomFeature; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="border-gold/25 flex flex-col gap-2 rounded-[20px] border bg-white/[0.04] p-5.5"
    >
      <Icon name={feature.icon} size={26} strokeWidth={1.7} className="text-gold" />
      <h3 className="font-extrabold">{feature.title}</h3>
      <p className="text-mist text-[15px]">{feature.body}</p>
    </Reveal>
  );
}
