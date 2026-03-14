import React from 'react';

interface HomeProps {
  onSelectRoadmap: (roadmap: 'ml' | 'frontend') => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectRoadmap }) => {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
      {/* Background blobs */}
      <div
        className="blob w-96 h-96 opacity-10"
        style={{
          background: '#00ff9d',
          top: -100,
          left: -100,
          position: 'fixed'
        }}
        aria-hidden="true"
      />
      <div
        className="blob w-80 h-80 opacity-5"
        style={{
          background: '#ff6b35',
          top: '40%',
          right: -80,
          position: 'fixed',
          animationDelay: '3s'
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div className="text-center mb-16 anim-in" style={{ animationDelay: '0.1s' }}>
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ color: 'var(--text)' }}
        >
          Learning Roadmaps
        </h1>
        <p
          className="text-lg md:text-xl"
          style={{ color: 'var(--muted)', fontWeight: 400 }}
        >
          Choose your learning path and track your progress
        </p>
      </div>

      {/* Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* ML Roadmap Card */}
        <button
          onClick={() => onSelectRoadmap('ml')}
          className="group anim-in"
          style={{ animationDelay: '0.2s' }}
        >
          <div
            className="h-full rounded-16 p-8 cursor-pointer transition-all duration-300 border"
            style={{
              background: 'var(--bg2)',
              borderColor: 'var(--border)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(0,255,157,0.3)';
              el.style.background = '#111118';
              el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--border)';
              el.style.background = 'var(--bg2)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <div className="text-5xl mb-4">🤖</div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text)' }}
            >
              ML Engineer
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--muted)' }}
            >
              From Math fundamentals to production ML deployment
            </p>

            <div
              className="space-y-2 text-sm mb-6"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>5 Phases • 34 Topics • 170+ Subtopics</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>15-21 weeks of learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Topics: Math, ML, Deep Learning, LLMs, MLOps</span>
              </div>
            </div>

            <button
              className="w-full py-2 rounded-lg font-semibold transition-all mono text-sm"
              style={{
                background: '#00ff9d20',
                color: '#00ff9d',
                border: '1px solid #00ff9d40',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00ff9d30';
                e.currentTarget.style.borderColor = '#00ff9d60';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#00ff9d20';
                e.currentTarget.style.borderColor = '#00ff9d40';
              }}
            >
              Start Learning →
            </button>
          </div>
        </button>

        {/* Frontend Roadmap Card */}
        <button
          onClick={() => onSelectRoadmap('frontend')}
          className="group anim-in"
          style={{ animationDelay: '0.3s' }}
        >
          <div
            className="h-full rounded-16 p-8 cursor-pointer transition-all duration-300 border"
            style={{
              background: 'var(--bg2)',
              borderColor: 'var(--border)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'rgba(255, 107, 53, 0.3)';
              el.style.background = '#111118';
              el.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = 'var(--border)';
              el.style.background = 'var(--bg2)';
              el.style.transform = 'translateY(0)';
            }}
          >
            <div className="text-5xl mb-4">🎨</div>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: 'var(--text)' }}
            >
              Frontend Engineer
            </h2>
            <p
              className="text-sm mb-6"
              style={{ color: 'var(--muted)' }}
            >
              From HTML/CSS basics to advanced React applications
            </p>

            <div
              className="space-y-2 text-sm mb-6"
              style={{ color: 'var(--muted)' }}
            >
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>5 Phases • 32 Topics • 160+ Subtopics</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>15-21 weeks of learning</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Topics: HTML/CSS, JS, React, Next.js, DevOps</span>
              </div>
            </div>

            <button
              className="w-full py-2 rounded-lg font-semibold transition-all mono text-sm"
              style={{
                background: '#ff6b3520',
                color: '#ff6b35',
                border: '1px solid #ff6b3540',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#ff6b3530';
                e.currentTarget.style.borderColor = '#ff6b3560';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ff6b3520';
                e.currentTarget.style.borderColor = '#ff6b3540';
              }}
            >
              Start Learning →
            </button>
          </div>
        </button>
      </div>

      {/* Features */}
      <div
        className="border rounded-16 p-8 anim-in"
        style={{
          background: 'var(--bg2)',
          borderColor: 'var(--border)',
          animationDelay: '0.4s'
        }}
      >
        <h3
          className="text-xl font-bold mb-6"
          style={{ color: 'var(--text)' }}
        >
          ✨ Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="mono text-sm mb-2" style={{ color: 'var(--accent)' }}>
              Track Progress
            </p>
            <p style={{ color: 'var(--muted)' }}>
              Check off topics and subtopics as you learn. Your progress is saved locally.
            </p>
          </div>
          <div>
            <p className="mono text-sm mb-2" style={{ color: '#ff6b35' }}>
              Structured Learning
            </p>
            <p style={{ color: 'var(--muted)' }}>
              Projects and resources at each phase to reinforce concepts practically.
            </p>
          </div>
          <div>
            <p className="mono text-sm mb-2" style={{ color: '#00ccff' }}>
              Curated Resources
            </p>
            <p style={{ color: 'var(--muted)' }}>
              Hand-picked learning materials and tools for each topic.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="mt-12 text-center text-sm"
        style={{ color: 'var(--muted)' }}
      >
        <p>
          Created to help developers master their craft from zero to expert
        </p>
        <p style={{ opacity: 0.5 }}>
          March 2026
        </p>
      </div>
    </div>
  );
};

export default Home;
