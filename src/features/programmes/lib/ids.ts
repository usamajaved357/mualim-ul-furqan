import type { CourseId } from '@/types/domain';

/** Element ids linking each programme tab to the shared tab panel. */
export const tabId = (id: CourseId) => `programme-tab-${id}`;
export const PANEL_ID = 'programme-panel';
