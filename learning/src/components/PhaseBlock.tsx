import type { Phase } from '../data/roadmap';
import { TopicCard } from './TopicCard';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface PhaseProps {
  phase: Phase;
  completed: Set<string>;
  collapsed: Set<string>;
  onToggleTopic: (topicId: string) => void;
  onTogglePhase: (phaseId: string) => void;
  onViewTopic?: (topicId: string) => void;
}

export function PhaseBlock({
  phase,
  completed,
  collapsed,
  onToggleTopic,
  onTogglePhase,
  onViewTopic,
}: PhaseProps) {
  const isCollapsed = collapsed.has(phase.id);
  const doneCt = phase.topics.filter((t) => completed.has(t.id)).length;
  const total = phase.topics.length;

  return (
    <div className="phase-block anim-in" style={{ borderColor: 'var(--border)', borderWidth: '1px', borderRadius: '16px', backgroundColor: 'var(--bg2)' }}>
      {/* Phase header */}
      <div
        className={`phase-header ${isCollapsed ? 'collapsed-header' : ''}`}
        id={`header-${phase.id}`}
        onClick={() => onTogglePhase(phase.id)}
        style={{
          padding: '20px 24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          userSelect: 'none',
        }}
      >
        <div
          className="phase-num w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{
            backgroundColor: `${phase.color}15`,
            border: `1px solid ${phase.color}30`,
            color: phase.color,
          }}
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
          <div className="phase-title text-base font-semibold truncate" style={{ color: 'var(--text)' }}>
            {phase.title}
          </div>
          <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--muted)', fontWeight: '400' }}>
            {phase.desc}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="mono text-sm font-bold" style={{ color: phase.color }}>
              {doneCt}/{total}
            </div>
            <div className="mono text-xs" style={{ color: 'var(--muted)' }}>
              done
            </div>
          </div>
          <ChevronDownIcon color={phase.color} className="chevron" />
        </div>
      </div>

      {/* Topics grid */}
      <div
        className={`phase-content ${isCollapsed ? 'collapsed' : ''}`}
        id={`content-${phase.id}`}
        style={{
          maxHeight: isCollapsed ? '0' : '2000px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s',
        }}
      >
        <div style={{ padding: '0 20px 20px 20px', paddingTop: 4 }}>
          {/* divider */}
          <div className="mb-4 h-px" style={{ background: 'var(--border)' }}></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {phase.topics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                completed={completed.has(topic.id)}
                onToggle={() => onToggleTopic(topic.id)}
                onViewDetail={() => onViewTopic?.(topic.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
