import React from 'react';
import type { Subtopic } from '../types';

interface SubtopicCardProps {
  subtopic: Subtopic;
  isCompleted: boolean;
  onToggle: (subtopicId: string) => void;
}

/**
 * Individual subtopic card
 */
export const SubtopicCard: React.FC<SubtopicCardProps> = ({
  subtopic,
  isCompleted,
  onToggle
}) => {
  return (
    <div
      className="subtopic-card"
      onClick={() => onToggle(subtopic.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle(subtopic.id);
        }
      }}
      aria-pressed={isCompleted}
      aria-label={`${subtopic.title}${isCompleted ? ' (completed)' : ''}`}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggle(subtopic.id)}
          className="subtopic-checkbox"
          aria-label={`Mark ${subtopic.title} as complete`}
        />
        <span className="subtopic-text">{subtopic.title}</span>
      </div>
    </div>
  );
};

SubtopicCard.displayName = 'SubtopicCard';
