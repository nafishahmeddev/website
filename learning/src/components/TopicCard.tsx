import type { Topic } from '../data/roadmap';
import { TAG_COLORS, DIFF_COLORS, DIFF_LABELS } from '../data/roadmap';

interface TopicCardProps {
  topic: Topic;
  completed: boolean;
  onToggle: () => void;
  onViewDetail?: () => void;
}

export function TopicCard({ topic, completed, onToggle, onViewDetail }: TopicCardProps) {
  const tagColor = TAG_COLORS[topic.tag];
  const diffColor = DIFF_COLORS[topic.diff - 1];
  const diffLabel = DIFF_LABELS[topic.diff - 1];

  return (
    <div
      className={`topic-card ${completed ? 'done' : ''}`}
      data-tid={topic.id}
      onClick={onViewDetail}
      style={{ cursor: 'pointer' }}
    >
      <div className="flex gap-3 mb-2">
        <div
          className="cb mt-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          style={{ cursor: 'pointer' }}
        >
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
          <p className="text-xs leading-snug" style={{ color: 'var(--muted)' }}>
            {topic.desc}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Difficulty indicator */}
        <div className="flex items-center gap-1.5 text-xs">
          <div className="diff w-1.5 h-1.5 rounded-full" style={{ backgroundColor: diffColor }} />
          <span style={{ color: 'var(--muted)' }}>{diffLabel}</span>
        </div>

        {/* Tag */}
        <span
          className="pill ml-auto text-xs px-1.5 py-0.5 rounded-lg font-mono"
          style={{
            backgroundColor: tagColor.bg,
            color: tagColor.color,
            border: `1px solid ${tagColor.border}`,
          }}
        >
          {topic.tag}
        </span>
      </div>
    </div>
  );
}
