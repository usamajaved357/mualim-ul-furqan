import { useMemo, useState } from 'react';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { trialMessage, trialSlots, trialSummary, type TrialSelection } from '../lib/trialSummary';

export function useTrialFinder(
  initial: TrialSelection = { course: 'nazra', learner: 'child', region: 'uk' },
) {
  const [selection, setSelection] = useState<TrialSelection>(initial);

  const update =
    <K extends keyof TrialSelection>(key: K) =>
    (value: TrialSelection[K]) =>
      setSelection((prev) => ({ ...prev, [key]: value }));

  const derived = useMemo(
    () => ({
      summary: trialSummary(selection),
      slots: trialSlots(selection),
      whatsappHref: buildWhatsAppLink(trialMessage(selection)),
    }),
    [selection],
  );

  return {
    selection,
    setCourse: update('course'),
    setLearner: update('learner'),
    setRegion: update('region'),
    ...derived,
  };
}
