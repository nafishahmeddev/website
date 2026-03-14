import type { Phase } from '../types';

/**
 * Calculate count of completed topics in a phase
 */
export function getPhaseCompletedCount(phase: Phase, completedTopicIds: Set<string>): number {
  return phase.topics.filter(topic => completedTopicIds.has(topic.id)).length;
}

/**
 * Get all topic IDs in a phase
 */
export function getPhaseTopicIds(phase: Phase): string[] {
  return phase.topics.map(topic => topic.id);
}

/**
 * Check if all topics in a phase are completed
 */
export function isPhaseFullyCompleted(phase: Phase, completedTopicIds: Set<string>): boolean {
  const topicIds = getPhaseTopicIds(phase);
  return topicIds.length > 0 && topicIds.every(id => completedTopicIds.has(id));
}
