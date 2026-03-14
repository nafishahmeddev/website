import type { TopicTutorial } from './phase1';

export type { TopicTutorial };

export async function getTutorial(topicId: string): Promise<TopicTutorial | null> {
  const phaseMatch = topicId.match(/^t(\d+)_/);
  const phase = phaseMatch ? parseInt(phaseMatch[1]) : 1;
  
  let data: Record<string, TopicTutorial>;
  
  if (phase === 1) {
    data = (await import('./phase1')).phase1Tutorials;
  } else if (phase === 2) {
    data = (await import('./phase2')).phase2Tutorials;
  } else if (phase === 3) {
    data = (await import('./phase3')).phase3Tutorials;
  } else if (phase === 4) {
    data = (await import('./phase4')).phase4Tutorials;
  } else if (phase === 5) {
    data = (await import('./phase5')).phase5Tutorials;
  } else {
    return null;
  }
  
  return data[topicId] || null;
}
