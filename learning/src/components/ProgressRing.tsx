import React from 'react';

interface ProgressRingProps {
  completed: number;
  total: number;
  color: string;
}

/**
 * Progress ring with animated SVG circle
 */
export const ProgressRing: React.FC<ProgressRingProps> = ({ completed, total, color }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.round((completed / total) * 100);
  const offset = circumference - (circumference * percentage) / 100;

  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-label={`${percentage}% complete`}>
      <circle
        className="ring-track"
        cx="18"
        cy="18"
        r={radius}
        strokeWidth="2.5"
      />
      <circle
        className="ring-fill"
        cx="18"
        cy="18"
        r={radius}
        strokeWidth="2.5"
        style={{
          stroke: color,
          strokeDasharray: circumference,
          strokeDashoffset: offset,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center'
        }}
      />
      <text
        x="18"
        y="22"
        textAnchor="middle"
        fontSize="9"
        fill={color}
        fontFamily="Space Mono"
      >
        {percentage}%
      </text>
    </svg>
  );
};

ProgressRing.displayName = 'ProgressRing';
