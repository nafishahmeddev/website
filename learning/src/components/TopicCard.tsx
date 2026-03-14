import React, { useState } from 'react';
import type { Topic } from '../types';
import { TAG_COLORS, DIFFICULTY_COLORS, DIFFICULTY_LABELS } from '../constants';
import { SubtopicCard } from './SubtopicCard';

interface TopicCardProps {
  topic: Topic;
  isCompleted: boolean;
  onToggle: (topicId: string) => void;
  onSubtopicToggle: (subtopicId: string) => void;
  completedSubtopicIds: Set<string>;
}

/**
 * Topic card with collapsible subtopics
 */
export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isCompleted,
  onToggle,
  onSubtopicToggle,
  completedSubtopicIds
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const tagConfig = TAG_COLORS[topic.tag];
  const diffColor = DIFFICULTY_COLORS[topic.diff - 1];
  const diffLabel = DIFFICULTY_LABELS[topic.diff - 1];
  
  const completedSubtopicsCount = topic.subtopics.filter(st =>
    completedSubtopicIds.has(st.id)
  ).length;

  return (
    <div
      className={`topic-card${isCompleted ? ' done' : ''}`}
      role="region"
      aria-label={`${topic.title}${isCompleted ? ' (completed)' : ''}`}
    >
      <div
        onClick={() => onToggle(topic.id)}
        className="flex items-start gap-3 mb-2 cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle(topic.id);
          }
        }}
        aria-pressed={isCompleted}
      >
        <div className="cb mt-0.5" aria-hidden="true">
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4l3 3 5-6"
              stroke="#0a0a0f"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm leading-tight mb-1" style={{ color: 'var(--text)' }}>
            {topic.title}
          </div>
          <div className="text-xs leading-relaxed" style={{ color: 'var(--muted)', fontWeight: 400 }}>
            {topic.desc}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 mb-3">
        <span
          className="pill"
          style={{
            background: tagConfig.bg,
            color: tagConfig.color,
            border: `1px solid ${tagConfig.border}`
          }}
        >
          {topic.tag}
        </span>
        <div className="relative has-tooltip">
          <div
            className="diff"
            style={{ background: diffColor, opacity: 0.8 }}
            title={diffLabel}
          />
          <div className="tooltip">{diffLabel}</div>
        </div>
      </div>

      {/* Subtopics section */}
      {topic.subtopics.length > 0 && (
        <div className="subtopics-container">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="subtopics-toggle"
            aria-expanded={isExpanded}
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} subtopics for ${topic.title}`}
          >
            <span className="text-xs font-semibold" style={{ color: 'var(--muted)' }}>
              {isExpanded ? '▼' : '▶'} Subtopics ({completedSubtopicsCount}/{topic.subtopics.length})
            </span>
          </button>

          {isExpanded && (
            <div className="subtopics-list">
              {topic.subtopics.map(subtopic => (
                <SubtopicCard
                  key={subtopic.id}
                  subtopic={subtopic}
                  isCompleted={completedSubtopicIds.has(subtopic.id)}
                  onToggle={onSubtopicToggle}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TopicCard.displayName = 'TopicCard';
