import { PHASES } from '../data/roadmap';

const TOTAL = 34;

interface ProgressBarProps {
  completed: Set<string>;
}

export function ProgressBar({ completed }: ProgressBarProps) {
  const n = completed.size;
  const pct = Math.round((n / TOTAL) * 100);

  return (
    <div className="phase-block mb-8 anim-in">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold uppercase tracking-widest mono" style={{ color: 'var(--muted)' }}>
            Overall Progress
          </span>
          <span className="mono text-sm" id="master-count" style={{ color: 'var(--accent)' }}>
            {n} / {TOTAL}
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="master-bar-fill"
            id="master-bar"
            style={{ width: `${pct}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            Start
          </span>
          <span className="mono text-xs" style={{ color: 'var(--muted)' }} id="master-pct">
            {pct}%
          </span>
          <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
            ML Engineer
          </span>
        </div>
      </div>

      {/* Phase mini progress row */}
      <div className="border-t flex divide-x" style={{ borderColor: 'var(--border)' }} id="phase-mini-row">
        {PHASES.map((phase) => {
          const d = phase.topics.filter((t) => completed.has(t.id)).length;
          const total = phase.topics.length;
          const p = Math.round((d / total) * 100);
          const r = 14;
          const circ = 2 * Math.PI * r;
          const offset = circ - (circ * p) / 100;

          return (
            <div
              key={phase.id}
              className="flex-1 flex flex-col items-center justify-center py-4 gap-1"
              style={{ minWidth: '0' }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <circle
                  className="ring-track"
                  cx="18"
                  cy="18"
                  r={r}
                  strokeWidth="2.5"
                />
                <circle
                  className="ring-fill"
                  id={`ring-${phase.id}`}
                  cx="18"
                  cy="18"
                  r={r}
                  strokeWidth="2.5"
                  style={{
                    stroke: phase.color,
                    strokeDasharray: circ,
                    strokeDashoffset: offset,
                  }}
                />
                <text
                  x="18"
                  y="22"
                  textAnchor="middle"
                  fontSize="9"
                  fill={phase.color}
                  fontFamily="Space Mono"
                >
                  {p}%
                </text>
              </svg>
              <span
                className="mono text-center"
                style={{
                  fontSize: '9px',
                  color: 'var(--muted)',
                  lineHeight: '1.3',
                }}
                id={`mini-${phase.id}`}
              >
                {d}/{total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
