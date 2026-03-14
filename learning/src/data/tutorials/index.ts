import { TUTORIALS, type TopicTutorial } from '../tutorials';
import { PHASES } from '../roadmap';

export type { TopicTutorial };

export function getTutorial(idOrSlug: string): TopicTutorial | null {
  // Try direct ID lookup
  if (TUTORIALS[idOrSlug]) return TUTORIALS[idOrSlug];

  // Try slug lookup
  const topic = PHASES.flatMap(p => p.topics).find(t => t.slug === idOrSlug);
  if (topic && TUTORIALS[topic.id]) {
    return TUTORIALS[topic.id];
  }

  return null;
}
