import React from 'react';

interface FooterProps {
  onResetProgress: () => void;
}

/**
 * Page footer with reset button
 */
export const Footer: React.FC<FooterProps> = ({ onResetProgress }) => {
  const handleReset = (): void => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      onResetProgress();
    }
  };

  return (
    <div
      className="mt-16 pt-8 border-t flex items-center justify-between"
      style={{ borderColor: 'var(--border)' }}
    >
      <span className="mono text-xs" style={{ color: 'var(--muted)' }}>
        // progress saved in localStorage
      </span>
      <button
        onClick={handleReset}
        className="mono text-xs px-4 py-2 rounded-lg transition-all hover:text-red-400"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--border)',
          color: 'var(--muted)'
        }}
        aria-label="Reset all progress"
      >
        reset progress
      </button>
    </div>
  );
};

Footer.displayName = 'Footer';
