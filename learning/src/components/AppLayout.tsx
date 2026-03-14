import type { ReactNode } from 'react';

interface AppLayoutProps {
  children: ReactNode;
  completedCount: number;
  totalCount: number;
  onHome: () => void;
  breadcrumb?: string;
  phaseColor?: string;
}

export function AppLayout({ children, completedCount, totalCount, onHome, breadcrumb, phaseColor }: AppLayoutProps) {
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const accent = phaseColor || '#00ff9d';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      {/* Sticky Navbar */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--border)',
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(16px)',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          gap: '16px',
        }}
      >
        {/* Logo / Home button */}
        <button
          onClick={onHome}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '8px',
              background: '#00ff9d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '800',
              color: '#0a0a0f',
              fontFamily: 'Syne, sans-serif',
              flexShrink: 0,
            }}
          >
            ML
          </span>
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: '700',
              color: 'var(--text)',
              fontSize: '14px',
              letterSpacing: '-0.01em',
            }}
          >
            Roadmap
          </span>
        </button>

        {/* Breadcrumb */}
        {breadcrumb && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              overflow: 'hidden',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'var(--muted)', cursor: 'pointer' }} onClick={onHome}>
              roadmap
            </span>
            <span style={{ color: 'var(--border)' }}>/</span>
            <span
              style={{
                color: accent,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '260px',
              }}
            >
              {breadcrumb}
            </span>
          </div>
        )}

        {/* Progress indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              color: 'var(--muted)',
            }}
          >
            {completedCount}/{totalCount}
          </span>
          <div
            style={{
              width: '72px',
              height: '4px',
              background: 'var(--bg3)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${pct}%`,
                height: '100%',
                background: `linear-gradient(90deg, #00ff9d, #00ccff)`,
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              color: '#00ff9d',
              minWidth: '32px',
            }}
          >
            {pct}%
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
    </div>
  );
}
