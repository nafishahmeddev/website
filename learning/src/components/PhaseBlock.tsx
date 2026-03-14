import React from 'react';
import type { Phase } from '../types';
import { PhaseHeader } from './PhaseHeader';
import { PhaseContent } from './PhaseContent';
import { getPhaseCompletedCount, getPhaseTopicIds, getPhaseCompletedSubtopicCount, getPhaseSubtopicCount } from '../utils/phase';

interface PhaseBlockProps {
  phase: Phase;
  completedTopicIds: Set<string>;
  completedSubtopicIds: Set<string>;
  isCollapsed: boolean;
  animationDelay: number;
  onTogglePhase: (phaseId: string) => void;
  onToggleTopic: (topicId: string) => void;
  onToggleSubtopic: (subtopicId: string) => void;
}

/**
 * Complete phase block including header and collapsible content
 */
export const PhaseBlock: React.FC<PhaseBlockProps> = ({
  phase,
  completedTopicIds,
  completedSubtopicIds,
  isCollapsed,
  animationDelay,
  onTogglePhase,
  onToggleTopic,
  onToggleSubtopic
}) => {
  const completedCount = getPhaseCompletedCount(phase, completedTopicIds);
  const completedSubCount = getPhaseCompletedSubtopicCount(phase, completedSubtopicIds);
  const totalSubCount = getPhaseSubtopicCount(phase);
  const topicIds = getPhaseTopicIds(phase);

  const handleMarkAllDone = (): void => {
    const allDone = topicIds.every(id => completedTopicIds.has(id));
    topicIds.forEach(id => {
      if (allDone && completedTopicIds.has(id)) {
        onToggleTopic(id);
      } else if (!allDone && !completedTopicIds.has(id)) {
        onToggleTopic(id);
      }
    });
  };

  return (
    <div
      className="phase-block anim-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <PhaseHeader
        phase={phase}
        completedCount={completedCount}
        completedSubtopicCount={completedSubCount}
        totalSubtopicCount={totalSubCount}
        isCollapsed={isCollapsed}
        onToggle={() => onTogglePhase(phase.id)}
      />
      <PhaseContent
        phase={phase}
        isCollapsed={isCollapsed}
        completedTopicIds={completedTopicIds}
        completedSubtopicIds={completedSubtopicIds}
        onTopicToggle={onToggleTopic}
        onSubtopicToggle={onToggleSubtopic}
        onMarkAllDone={handleMarkAllDone}
      />
    </div>
  );
};

PhaseBlock.displayName = 'PhaseBlock';
