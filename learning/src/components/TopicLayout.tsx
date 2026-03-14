import { useState } from 'react';
import { Link, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import { PHASES, DIFF_LABELS, DIFF_COLORS } from '../data/roadmap';
import { LessonSidebar } from './LessonSidebar';
import { getTutorial } from '../data/tutorials/index';

export function TopicLayout() {
  const { topicSlug, topicId } = useParams<{ topicSlug?: string; topicId?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const urlParts = location.pathname.split('/').filter(Boolean);
  const urlTopicSlug = urlParts[0] === 'topic' ? urlParts[1] : undefined;

  const effectiveIdOrSlug = topicSlug || urlTopicSlug || topicId;

  // Find topic and phase data
  const currentTopicData = PHASES.flatMap(p => p.topics).find(t => t.id === effectiveIdOrSlug || t.slug === effectiveIdOrSlug);
  const currentPhase = PHASES.find(p => p.topics.some(t => t.id === effectiveIdOrSlug || t.slug === effectiveIdOrSlug));

  const tutorial = effectiveIdOrSlug ? getTutorial(effectiveIdOrSlug) : null;
  const lessons = tutorial?.lessons || [];

  // Local state for completion (lifted from Roadmap.tsx eventually)
  const [completed, setCompleted] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('ml-roadmap-v2');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  const isCompleted = currentTopicData ? completed.has(currentTopicData.id) : false;

  const handleToggle = () => {
    if (!currentTopicData) return;
    setCompleted((prev) => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(currentTopicData.id)) {
        newCompleted.delete(currentTopicData.id);
      } else {
        newCompleted.add(currentTopicData.id);
      }
      localStorage.setItem('ml-roadmap-v2', JSON.stringify([...newCompleted]));
      return newCompleted;
    });
  };

  if (!currentTopicData || !currentPhase) {
    return <div className="p-20 text-center">Topic not found</div>;
  }

  // Determine active lesson index from URL
  const pathParts = location.pathname.split('/');
  const lessonSlug = pathParts[pathParts.length - 1];
  const activeLesson = lessons.findIndex(l => l.id === lessonSlug);
  const currentActiveIndex = activeLesson !== -1 ? activeLesson : 0;

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
              <span className="text-[10px] font-bold text-white uppercase tracking-wider" style={{ color: currentPhase.color }}>{currentPhase.title}</span>
            </div>
            <div className="h-8 w-px bg-white/5"></div>
            <button
              onClick={handleToggle}
              className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all duration-300 mono text-[9px] font-bold uppercase tracking-widest ${
                isCompleted 
                  ? 'bg-(--accent)/10 border-(--accent)/30 text-(--accent)' 
                  : 'bg-white/5 border-white/10 text-(--muted) hover:text-white hover:border-white/20'
              }`}
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-(--accent) animate-pulse' : 'bg-white/20'}`}></div>
              {isCompleted ? 'Module Verified' : 'Mark Complete'}
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
            style={{ background: currentPhase.color }}
          ></div>
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="flex-1 max-w-3xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="mono text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">Phase Context //</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 uppercase tracking-widest">
                  {currentPhase.label}
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.85] text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {currentTopicData.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {currentPhase.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[9px] uppercase tracking-widest text-(--muted) font-bold">Category</span>
                    <span className="text-[13px] font-bold text-white uppercase tracking-wide">{currentTopicData.tag}</span>
                  </div>
                </div>

                <div className="w-px h-8 bg-white/5"></div>

                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((d) => (
                      <div 
                        key={d}
                        className={`w-1.5 h-3 rounded-xs transition-colors ${d <= currentTopicData.diff ? '' : 'bg-white/5 opacity-20'}`}
                        style={{ backgroundColor: d <= currentTopicData.diff ? DIFF_COLORS[currentTopicData.diff - 1] : undefined }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <span className="mono text-[9px] uppercase tracking-widest text-(--muted) font-bold">Complexity</span>
                    <span className="text-[13px] font-bold uppercase tracking-wide" style={{ color: DIFF_COLORS[currentTopicData.diff - 1] }}>
                      {DIFF_LABELS[currentTopicData.diff - 1]}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-72">
              <p className="text-lg text-(--muted) leading-relaxed font-medium italic opacity-80 border-l-2 border-white/5 pl-6 py-2">
                "{currentTopicData.desc}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content area with Sidebar */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0px 24px 40px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-3">
            <LessonSidebar 
              lessons={lessons} 
              activeLesson={currentActiveIndex} 
              onLessonClick={(idx) => {
                const lessonId = lessons[idx]?.id || 'overview';
                navigate(`/topic/${currentTopicData.slug}/${lessonId}`);
                window.scrollTo(0, 0);
              }}
              color={currentPhase.color}
            />
          </aside>
          <main className="lg:col-span-9">
             <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
