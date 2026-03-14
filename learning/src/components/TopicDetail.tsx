import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { Topic, Phase } from '../data/roadmap';
import { TutorialContent } from './TutorialContent';
import { getTutorial, type TopicTutorial } from '../data/tutorials/index';
import { DIFF_LABELS, DIFF_COLORS } from '../data/roadmap';

interface TopicDetailProps {
  topic: Topic;
  phase: Phase;
  completed: boolean;
  onToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  prevLabel?: string;
  nextLabel?: string;
}

export function TopicDetail({ 
  topic, 
  phase, 
  completed,
  onToggle,
  onNext, 
  onPrev, 
  isFirst, 
  isLast,
  prevLabel,
  nextLabel
}: TopicDetailProps) {
  const [tutorial, setTutorial] = useState<TopicTutorial | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // Use a slight delay or untracked state to avoid cascading render warning if necessary,
    // but the most robust way is to just start the fetch and only set tutorial when ready.
    // However, we want the skeleton to show, so we keep setIsLoading(true).
    
    getTutorial(topic.id).then(data => {
      if (isMounted) {
        setTutorial(data);
        setIsLoading(false);
      }
    });

    return () => { 
      isMounted = false; 
      setIsLoading(true); // Reset for next topic.id change
    };
  }, [topic.id]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/60 backdrop-blur-2xl border-b border-white/5 h-16 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link 
            to="/" 
            className="group flex items-center gap-3 no-underline"
          >
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-(--accent)/50 transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-(--muted) group-hover:text-(--accent) transition-colors">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-(--muted) font-bold leading-none">Back to</span>
              <span className="text-[11px] font-bold text-white tracking-widest uppercase">Platform</span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
              <span className="mono text-[9px] uppercase tracking-[0.2em] text-(--muted) font-bold leading-none mb-1">Current Sector</span>
              <span className="text-[10px] font-bold text-white uppercase tracking-wider" style={{ color: phase.color }}>{phase.title}</span>
            </div>
            <div className="h-8 w-px bg-white/5"></div>
            <button
              onClick={onToggle}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 mono text-[9px] font-bold uppercase tracking-widest ${
                completed 
                  ? 'bg-(--accent)/10 border-(--accent)/30 text-(--accent)' 
                  : 'bg-white/5 border-white/10 text-(--muted) hover:text-white hover:border-white/20'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${completed ? 'bg-(--accent) animate-pulse' : 'bg-white/20'}`}></div>
              {completed ? 'Module Verified' : 'Mark Complete'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
            style={{ background: phase.color }}
          ></div>
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Phase Context //</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 uppercase tracking-widest">
                  {phase.label}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {topic.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {phase.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[9px] uppercase tracking-widest text-(--muted) font-bold">Category</span>
                    <span className="text-[13px] font-bold text-white uppercase tracking-wide">{topic.tag}</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-white/5"></div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((d) => (
                      <div 
                        key={d}
                        className={`w-1.5 h-3 rounded-xs transition-colors ${d <= topic.diff ? '' : 'bg-white/5 opacity-20'}`}
                        style={{ backgroundColor: d <= topic.diff ? DIFF_COLORS[topic.diff - 1] : undefined }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[9px] uppercase tracking-widest text-(--muted) font-bold">Complexity</span>
                    <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: DIFF_COLORS[topic.diff - 1] }}>
                      {DIFF_LABELS[topic.diff - 1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-72">
              <p className="text-lg text-(--muted) leading-relaxed font-medium italic opacity-80 border-l-2 border-white/5 pl-6 py-2">
                "{topic.desc}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0px 24px 40px' }}>
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
          <TutorialContent 
            color={phase.color} 
            lessons={tutorial.lessons} 
            onNextTopic={onNext}
            onPrevTopic={onPrev}
            isLastTopic={isLast}
            nextTopicLabel={nextLabel}
          />
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

        {/* Footer Navigation - Only shown if no tutorial is loaded */}
        {!tutorial && (
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
              {isFirst ? 'Start' : (prevLabel || 'Backtrack')}
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
              {isLast ? 'Finish' : (nextLabel || 'Advance')}
            </div>
          </button>
        </div>
        )}
      </div>
    </div>
  );
}
