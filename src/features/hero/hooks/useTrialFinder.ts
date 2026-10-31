import { useMemo, useState } from 'react';
import { timeZoneLabel, visitorTimeZone } from '@/lib/timezone';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { trialMessage, trialSlots, trialSummary, type TrialSelection } from '../lib/trialSummary';

export function useTrialFinder(initial: TrialSelection = { course: 'nazra', learner: 'child' }) {
  const [selection, setSelection] = useState<TrialSelection>(initial);
  const timeZone = useMemo(() => visitorTimeZone(), []);

  const update =
    <K extends keyof TrialSelection>(key: K) =>
    (value: TrialSelection[K]) =>
      setSelection((prev) => ({ ...prev, [key]: value }));

  const derived = useMemo(() => {
    const now = new Date();
    return {
      summary: trialSummary(selection),
      slots: trialSlots(timeZone, now),
      zone: timeZoneLabel(timeZone, now),
      whatsappHref: buildWhatsAppLink(trialMessage(selection, timeZone)),
    };
  }, [selection, timeZone]);

  return {
    selection,
    setCourse: update('course'),
    setLearner: update('learner'),
    ...derived,
  };
}
