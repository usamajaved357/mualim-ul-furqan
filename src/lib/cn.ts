import { clsx, type ClassValue } from 'clsx';

/** Merge conditional class names. */
export const cn = (...inputs: ClassValue[]): string => clsx(inputs);
