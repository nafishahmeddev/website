import React from 'react';
import type { Phase } from '../types';
import { ProgressRing } from './ProgressRing';
import { getPhaseCompletedCount, getPhaseCompletedSubtopicCount, getPhaseSubtopicCount, getTotalSubtopicCount } from '../utils/phase';
import { calculatePercentage } from '../utils/storage';

interface OverallProgressBarProps {
  phases: Phase[];
  completedTopicIds: Set<string>;
  completedSubtopicIds: Set<string>;
  totalTopics: number;
}

/**
 * Overall progress bar with per-phase progress rings
 */
export const OverallProgressBar: React.FC<OverallProgressBarProps> = ({
  phases,
  completedTopicIds,
  completedSubtopicIds,
  totalTopics
}) => {
  const completedCount = completedTopicIds.size;
  const percentage = calculatePercentage(completedCount, totalTopics);
  const totalSubtopics = getTotalSubtopicCount(phases);
  const completedSubtopics = completedSubtopicIds.size;
  const subtopicPercentage = calculatePercentage(completedSubtopics, totalSubtopics);

  return (
    <div className="phase-block mb-8 anim-in" style={{ animationDelay: '0.1s' }}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-sm font-semibold uppercase tracking-widest mono"
            style={{ color: 'var(--muted)' }}
          >
            Overall Progress
          </span>
          <span className="mono text-sm" style={{ color: 'var(--accent)' }}>
            {completedCount} / {totalTopics} Topics • {completedSubtopics} / {totalSubtopics} Subtopics
          </span>
        </div>
        <div>
          <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="master-bar-fill"
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={percentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Topics progress ${percentage}%`}
            />
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <div
              className="master-bar-fill"
              style={{ width: `${subtopicPercentage}%` }}
              role="progressbar"
              aria-valuenow={subtopicPercentage}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Subtopics progress ${subtopicPercentage}%`}
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            Start
          </span>
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            Topics: {percentage}% • Subtopics: {subtopicPercentage}%
          </span>
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            ML Engineer
          </span>
        </div>
      </div>

      {/* Phase mini progress row */}
      <div
        className="border-t flex divide-x"
        style={{ borderColor: 'var(--border)' }}
        role="group"
        aria-label="Phase progress indicators"
      >
        {phases.map(phase => {
          const completedTopics = getPhaseCompletedCount(phase, completedTopicIds);
          const completedSubs = getPhaseCompletedSubtopicCount(phase, completedSubtopicIds);
          const totalSubs = getPhaseSubtopicCount(phase);
          return (
            <div
              key={phase.id}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
              style={{ minWidth: 0 }}
            >
              <ProgressRing
                completed={completedTopics}
                total={phase.topics.length}
                color={phase.color}
              />
              <span
                className="mono text-center"
                style={{ fontSize: 8, color: 'var(--muted)', lineHeight: 1.2 }}
              >
                <div>{completedTopics}/{phase.topics.length}</div>
                <div style={{ fontSize: 7, opacity: 0.7 }}>{completedSubs}/{totalSubs}s</div>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

OverallProgressBar.displayName = 'OverallProgressBar';
