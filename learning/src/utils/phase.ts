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

/**
 * Get total subtopic count in a phase
 */
export function getPhaseSubtopicCount(phase: Phase): number {
  return phase.topics.reduce((sum, topic) => sum + topic.subtopics.length, 0);
}

/**
 * Get completed subtopic count in a phase
 */
export function getPhaseCompletedSubtopicCount(phase: Phase, completedSubtopicIds: Set<string>): number {
  let count = 0;
  phase.topics.forEach(topic => {
    topic.subtopics.forEach(subtopic => {
      if (completedSubtopicIds.has(subtopic.id)) {
        count++;
      }
    });
  });
  return count;
}

/**
 * Get total subtopic count across all phases
 */
export function getTotalSubtopicCount(phases: Phase[]): number {
  return phases.reduce((sum, phase) => sum + getPhaseSubtopicCount(phase), 0);
}
