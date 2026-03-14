import { STORAGE_KEYS } from '../constants';

/**
 * Safely parse localStorage data with fallback
 */
function safeParseStorage(key: string): string[] {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.warn(`Failed to parse localStorage key "${key}":`, error);
    return [];
  }
}

/**
 * Safely save to localStorage with error handling
 */
export function saveToLocalStorage(key: string, data: Set<string>): void {
  try {
    localStorage.setItem(key, JSON.stringify(Array.from(data)));
  } catch (error) {
    console.error(`Failed to save to localStorage key "${key}":`, error);
  }
}

/**
 * Load initial done topics from localStorage
 */
export function loadDoneTopics(): Set<string> {
  return new Set(safeParseStorage(STORAGE_KEYS.COMPLETED_TOPICS));
}

/**
 * Load initial collapsed phases from localStorage
 */
export function loadCollapsedPhases(): Set<string> {
  return new Set(safeParseStorage(STORAGE_KEYS.COLLAPSED_PHASES));
}

/**
 * Calculate percentage completion
 */
export function calculatePercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}

/**
 * Calculate stroke dash offset for progress ring
 */
export function calculateRingOffset(completed: number, total: number): number {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const percentage = calculatePercentage(completed, total);
  return circumference - (circumference * percentage) / 100;
}
