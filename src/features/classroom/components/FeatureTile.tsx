import { IconSeal, Reveal } from '@/components/ui';
import type { ClassroomFeature } from '../data';

export function FeatureTile({ feature, delay = 0 }: { feature: ClassroomFeature; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className="card-veil spotlight flex items-start gap-3.5 rounded-[22px] p-4 [--spotlight-color:rgb(247_213_139/0.12)] sm:flex-col sm:gap-2 sm:p-5 [&>*]:relative [&>*]:z-10"
    >
      <IconSeal icon={feature.icon} tone="night" className="size-12 sm:-ml-1" />
      <div className="flex min-w-0 flex-col gap-1 sm:gap-2">
        <h3 className="font-display text-[17px] font-[700] text-white">{feature.title}</h3>
        <p className="text-mist text-[14px] leading-snug">{feature.body}</p>
      </div>
    </Reveal>
  );
}
