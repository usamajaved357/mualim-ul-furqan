/** Sample data for the portal preview. Replace with real API data when the portal is built. */
export type PortalTab = 'overview' | 'schedule' | 'progress' | 'homework' | 'certificates';

export const portalTabs: { value: PortalTab; label: string }[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'schedule', label: 'Schedule' },
  { value: 'progress', label: 'Progress' },
  { value: 'homework', label: 'Homework' },
  { value: 'certificates', label: 'Certificates' },
];

export const sampleStudent = { name: '[Student name]' };

export const nextClass = { when: 'Today, 5:30 PM', what: 'Nazra · Juz 4' };

export const homework = [
  { task: 'Read page 62 twice, slowly', due: 'Mon', done: true },
  { task: 'Listen to the audio and repeat ayah 6', due: 'Wed', done: false },
  { task: 'Learn the dua before sleeping', due: 'Fri', done: false },
];

export const progress = [
  { label: 'Noorani Qaida', value: 1, detail: 'Completed ✓' },
  { label: 'Nazra reading', value: 4 / 30, detail: 'Juz 4 of 30' },
  { label: 'Tajweed rules', value: 9 / 28, detail: '9 of 28' },
  { label: 'Duas memorised', value: 14 / 40, detail: '14 of 40' },
];

export const teacherNote =
  'Reading is getting smoother. This month, focus on stretching the madd letters for two counts.';

export const week = [
  { day: 'Mon', time: '5:30 PM', what: 'Nazra' },
  { day: 'Tue', time: '5:30 PM', what: 'Nazra' },
  { day: 'Wed', time: '—', what: 'Homework' },
  { day: 'Thu', time: '5:30 PM', what: 'Nazra + Duas' },
  { day: 'Sat', time: '11:00 AM', what: 'Review' },
];

export const attendance = { attended: 12, scheduled: 12 };

export const certificates = [
  { course: 'Noorani Qaida', earned: true, awardedOn: '[Date]' },
  { course: 'Nazra', earned: false, note: 'Unlocks at Juz 30 · 13% there' },
];
