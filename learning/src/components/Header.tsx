import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

/**
 * Main page header
 */
export const Header: React.FC<HeaderProps> = ({
  title = 'Machine Learning',
  subtitle = 'Roadmap',
  description = 'A structured path from zero to deployment — built for Node.js & PHP developers who think in APIs, not notebooks.'
}) => {
  return (
    <div className="mb-12 anim-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="pill bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/20">
          v1.0
        </span>
        <span className="pill bg-white/5 text-[#6b6b80] border border-white/10">
          FOR WEB DEVS
        </span>
      </div>
      <h1
        className="text-5xl font-extrabold leading-none mb-3"
        style={{ letterSpacing: '-0.03em' }}
      >
        {title}<br />
        <span style={{ color: 'var(--accent)' }}>{subtitle}</span>
      </h1>
      <p
        className="text-[var(--muted)] text-lg max-w-xl"
        style={{ fontWeight: 400 }}
      >
        {description}
      </p>
    </div>
  );
};

Header.displayName = 'Header';
