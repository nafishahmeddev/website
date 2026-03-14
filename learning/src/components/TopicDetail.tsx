import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Topic, Phase } from '../data/roadmap';
import { TutorialContent } from './TutorialContent';
import { getTutorial, type TopicTutorial } from '../data/tutorials/index';
import { DIFF_LABELS } from '../data/roadmap';

interface TopicDetailProps {
  topic: Topic;
  phase: Phase;
  completed: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function TopicDetail({ 
  topic, 
  phase, 
  completed,
  onToggle,
  onNext, 
  onPrev, 
  isFirst, 
  isLast 
}: TopicDetailProps) {
  const [tutorial, setTutorial] = useState<TopicTutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    
    getTutorial(topic.id).then(data => {
      if (isMounted) {
        setTutorial(data);
        setIsLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [topic.id]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/85 backdrop-filter-xl border-b border-[#1E1E2E]/70 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link 
            to="/" 
            className="text-[10px] uppercase font-bold tracking-[0.2em] text-(--accent) hover:opacity-70 transition-opacity flex items-center gap-2 mono"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Roadmap
          </Link>

          <div className="flex items-center gap-4">
            <div className="h-1.5 w-1.5 rounded-full bg-(--accent) animate-pulse shadow-[0_0_8px_rgba(110,231,183,0.4)]"></div>
            <span className="mono text-[10px] font-bold uppercase tracking-widest text-(--muted) opacity-60">System Active</span>
          </div>
        </div>
      </header>

      {/* Hero section for the topic */}
      <div className="pt-32 pb-16 border-b border-[#1E1E2E]/50 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="pill bg-white/5 text-[#64748B] border border-white/10 uppercase tracking-tighter font-bold py-1 px-3">
                {topic.tag}
              </span>
              <span className="pill bg-(--accent)/10 text-(--accent) border border-(--accent)/20 uppercase tracking-tighter font-bold py-1 px-3">
                {DIFF_LABELS[topic.diff - 1]}
              </span>
            </div>

            <button
              onClick={onToggle}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 mono text-[10px] font-bold uppercase tracking-widest ${
                completed 
                  ? 'bg-(--accent)/10 border-(--accent)/30 text-(--accent)' 
                  : 'bg-white/5 border-white/10 text-(--muted) hover:border-white/20'
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${completed ? 'bg-(--accent) animate-pulse' : 'bg-white/20'}`}></div>
              {completed ? 'Deployment Ready' : 'Initialize Status'}
            </button>
          </div>
          <h1 className="text-6xl font-extrabold leading-[0.9] mb-6 tracking-tighter" style={{ fontFamily: 'Syne, sans-serif' }}>
            {topic.title}
          </h1>
          <p className="text-(--muted) text-lg max-w-xl leading-relaxed" style={{ fontWeight: 400 }}>
            {topic.desc}
          </p>
        </div>
      </div>

      {/* Content area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
        {isLoading ? (
          <div className="space-y-8 animate-pulse">
            <div className="h-64 rounded-3xl bg-white/5 border border-white/5" />
            <div className="space-y-4">
              <div className="h-4 w-1/4 bg-white/5 rounded" />
              <div className="h-4 w-3/4 bg-white/5 rounded" />
              <div className="h-4 w-1/2 bg-white/5 rounded" />
            </div>
          </div>
        ) : tutorial ? (
          <TutorialContent color={phase.color} lessons={tutorial.lessons} />
        ) : (
          <div>
            <p className="mono font-bold text-[10px] uppercase tracking-widest text-(--muted) mb-6 opacity-60">
              {">"} topics_covered
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
              {topic.subtopics?.map((sub, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white/2 border border-white/5 flex gap-3 items-start hover:bg-white/5 transition-colors"
                >
                  <span className="mono text-[10px] text-(--accent) opacity-50 font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-(--text)/80 leading-relaxed font-medium">{sub}</span>
                </div>
              ))}
            </div>
            <div className="p-16 rounded-3xl border border-dashed border-white/10 text-center bg-white/2">
              <p className="mono text-[10px] uppercase tracking-[0.2em] text-(--muted) font-bold">
                Building interactive lessons for {topic.title}...
              </p>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div 
          style={{ 
            marginTop: '100px', 
            paddingTop: '40px', 
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '24px',
            paddingBottom: '60px'
          }}
        >
          <button
            onClick={onPrev}
            disabled={isFirst}
            className="group"
            style={{
              flex: 1,
              padding: '32px 24px',
              borderRadius: '20px',
              border: '1px solid var(--border)',
              background: 'var(--bg2)',
              color: isFirst ? 'var(--muted)' : 'var(--text)',
              cursor: isFirst ? 'not-allowed' : 'pointer',
              opacity: isFirst ? 0.3 : 1,
              textAlign: 'left',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {!isFirst && (
              <div 
                className="absolute inset-0 bg-(--accent) opacity-0 group-hover:opacity-[0.03] transition-opacity"
              ></div>
            )}
            <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '8px', fontFamily: 'Space Mono', letterSpacing: '0.1em' }}>
              PREVIOUS
            </div>
            <div style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>
              {isFirst ? 'Start' : 'Backtrack'}
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={isLast}
            className="group"
            style={{
              flex: 1,
              padding: '32px 24px',
              borderRadius: '20px',
              border: `1px solid ${isLast ? 'var(--border)' : 'var(--glass-border)'}`,
              background: isLast ? 'var(--bg2)' : 'var(--bg3)',
              color: isLast ? 'var(--muted)' : 'var(--text)',
              cursor: isLast ? 'not-allowed' : 'pointer',
              opacity: isLast ? 0.3 : 1,
              textAlign: 'right',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: isLast ? 'none' : '0 10px 40px -10px rgba(0,0,0,0.5)'
            }}
          >
            {!isLast && (
              <div 
                className="absolute inset-0 bg-(--accent) opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
              ></div>
            )}
            <div style={{ fontSize: '11px', color: isLast ? 'var(--muted)' : 'var(--accent)', marginBottom: '8px', fontFamily: 'Space Mono', letterSpacing: '0.1em' }}>
              NEXT →
            </div>
            <div style={{ fontWeight: 700, fontSize: '18px', fontFamily: 'Syne, sans-serif' }}>
              {isLast ? 'Finish' : 'Advance'}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
