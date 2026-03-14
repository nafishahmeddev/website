import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { Topic, Phase } from '../data/roadmap';
import { TutorialContent } from './TutorialContent';
import { LessonSidebar } from './LessonSidebar';
import { getTutorial } from '../data/tutorials/index';
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
  const { lessonId } = useParams<{ lessonId?: string }>();
  const navigate = useNavigate();
  const tutorial = getTutorial(topic.id);
  const lessons = tutorial?.lessons || [];

  // Find index of lesson based on slug from URL
  const initialLessonIndex = useMemo(() => {
    if (!lessonId || !tutorial) return 0;
    const index = tutorial.lessons.findIndex(l => l.id === lessonId);
    return index !== -1 ? index : 0;
  }, [lessonId, tutorial]);

  const [activeLesson, setActiveLesson] = useState(initialLessonIndex);

  // Sync state if URL changes (e.g. browser back/forward)
  useEffect(() => {
    setActiveLesson(initialLessonIndex);
  }, [initialLessonIndex]);

  const handleActiveLessonChange = (index: number) => {
    setActiveLesson(index);
    const lessonSlug = lessons[index]?.id || 'overview';
    navigate(`/topic/${topic.id}/${lessonSlug}`);
    window.scrollTo(0, 0);
  };

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
        {tutorial ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <aside className="lg:col-span-3">
              <LessonSidebar 
                lessons={lessons} 
                activeLesson={activeLesson} 
                onLessonClick={handleActiveLessonChange}
                color={phase.color}
              />
            </aside>
            <main className="lg:col-span-9">
              <TutorialContent 
                color={phase.color} 
                lessons={lessons} 
                activeLesson={activeLesson}
                onActiveLessonChange={handleActiveLessonChange}
                onNextTopic={onNext}
                onPrevTopic={onPrev}
                isLastTopic={isLast}
                nextTopicLabel={nextLabel}
              />
            </main>
          </div>
        ) : (
          <div>
            <p className="mono font-bold text-[10px] uppercase tracking-widest text-(--muted) mb-6 opacity-60">
              // NO CONTENT DEFINITION FOUND
            </p>
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
