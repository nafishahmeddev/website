import React from 'react';
import type { Phase } from '../types';

interface PhaseHeaderProps {
  phase: Phase;
  completedCount: number;
  isCollapsed: boolean;
  onToggle: () => void;
}

/**
 * Phase header with title, progress, and collapse toggle
 */
export const PhaseHeader: React.FC<PhaseHeaderProps> = ({
  phase,
  completedCount,
  isCollapsed,
  onToggle
}) => {
  return (
    <div
      className={`phase-header${isCollapsed ? ' collapsed-header' : ''}`}
      onClick={onToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      aria-expanded={!isCollapsed}
      aria-label={`${phase.title} - ${completedCount} of ${phase.topics.length} topics completed`}
    >
      <div
        className="phase-num w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
        style={{
          background: phase.color + '15',
          border: `1px solid ${phase.color}30`,
          color: phase.color
        }}
        aria-hidden="true"
      >
        {phase.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="mono text-xs" style={{ color: phase.color }}>
            {phase.label}
          </span>
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            // {phase.duration}
          </span>
        </div>
        <div
          className="phase-title text-base font-semibold truncate"
          style={{ color: 'var(--text)' }}
        >
          {phase.title}
        </div>
        <div
          className="text-xs mt-0.5 truncate"
          style={{ color: 'var(--muted)', fontWeight: 400 }}
        >
          {phase.desc}
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="text-right">
          <div className="mono text-sm font-bold" style={{ color: phase.color }}>
            {completedCount}/{phase.topics.length}
          </div>
          <div className="mono text-xs" style={{ color: 'var(--muted)' }}>
            done
          </div>
        </div>
        <svg
          className="chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M4 6l4 4 4-4"
            stroke={phase.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

PhaseHeader.displayName = 'PhaseHeader';
