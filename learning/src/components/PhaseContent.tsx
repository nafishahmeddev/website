import React from 'react';
import type { Phase } from '../types';
import { TopicCard } from './TopicCard';

interface PhaseContentProps {
  phase: Phase;
  isCollapsed: boolean;
  completedTopicIds: Set<string>;
  completedSubtopicIds: Set<string>;
  onTopicToggle: (topicId: string) => void;
  onSubtopicToggle: (subtopicId: string) => void;
  onMarkAllDone: () => void;
}

/**
 * Phase content with topics grid and mark-all button
 */
export const PhaseContent: React.FC<PhaseContentProps> = ({
  phase,
  isCollapsed,
  completedTopicIds,
  completedSubtopicIds,
  onTopicToggle,
  onSubtopicToggle,
  onMarkAllDone
}) => {
  return (
    <div
      className={`phase-content${isCollapsed ? ' collapsed' : ''}`}
      style={{ maxHeight: isCollapsed ? '0' : '2000px' }}
      role="region"
      aria-label={`${phase.title} topics`}
    >
      <div className="px-5 pb-5 pt-1">
        <div className="mb-4 h-px" style={{ background: 'var(--border)' }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {phase.topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              isCompleted={completedTopicIds.has(topic.id)}
              onToggle={onTopicToggle}
              onSubtopicToggle={onSubtopicToggle}
              completedSubtopicIds={completedSubtopicIds}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMarkAllDone();
            }}
            className="mono text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: phase.color + '10',
              border: `1px solid ${phase.color}25`,
              color: phase.color
            }}
            aria-label={`Mark all topics in ${phase.title} as done`}
          >
            mark all done ✓
          </button>
        </div>
      </div>
    </div>
  );
};

PhaseContent.displayName = 'PhaseContent';
