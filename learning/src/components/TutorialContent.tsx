import { useState, lazy, Suspense } from 'react';
// Lazy load syntax highlighter
const SyntaxHighlighterFull = lazy(() => import('react-syntax-highlighter').then(m => ({ default: m.Prism })));
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { InteractiveViz, type VizType } from './InteractiveViz';

export interface Lesson {
  title: string;
  content: string;
  noobDefinition?: string;
  realWorldExample?: string;
  videoUrl?: string;
  codeExample?: { language: string; code: string };
  vizType?: VizType;
  keyPoints?: string[];
  formula?: string;
}

interface TutorialContentProps {
  color: string;
  lessons: Lesson[];
}

export function TutorialContent({ color, lessons }: TutorialContentProps) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);

  const lesson = lessons[activeLesson];

  const copyCode = () => {
    if (lesson.codeExample) {
      navigator.clipboard.writeText(lesson.codeExample.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
      {/* Sidebar - Lesson Navigation */}
      <div className="lg:col-span-3">
        <div className="sticky top-32">
          <div className="flex items-center gap-2 mb-8 opacity-50">
            <div className="w-1 h-1 rounded-full bg-(--accent)"></div>
            <span className="mono text-[10px] uppercase tracking-widest font-bold">Curriculum</span>
          </div>
          <div className="space-y-1">
            {lessons.map((l, idx) => (
              <button
                key={idx}
                onClick={() => setActiveLesson(idx)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  activeLesson === idx 
                    ? 'text-white' 
                    : 'text-(--muted) hover:text-(--text) hover:bg-white/5'
                }`}
              >
                {activeLesson === idx && (
                  <div className="absolute inset-0 bg-linear-to-r from-(--accent)/20 to-transparent"></div>
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <span className={`mono text-[10px] font-bold ${activeLesson === idx ? 'text-(--accent)' : 'opacity-30'}`}>
                    0{idx + 1}
                  </span>
                  <span className="text-sm font-medium tracking-tight">
                    {l.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-(--accent)/5 border border-(--accent)/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <span className="text-4xl">🚀</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-2 text-(--accent)">Quick Tip</h4>
            <p className="text-[11px] leading-relaxed text-(--muted)">
              Complete each lesson to unlock the full potential of this module.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-9">
        <div className="fade-up">
          {/* Lesson Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-(--accent) border border-(--accent)/20 mono text-[10px] font-bold uppercase tracking-widest">
                Lesson {activeLesson + 1}
              </span>
              <div className="h-px flex-1 bg-white/5"></div>
            </div>
            <h2 className="text-5xl font-extrabold mb-8 tracking-tighter leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              {lesson.title}
            </h2>
          </div>

          {/* Main Lesson Content */}
          <div className="mb-12 relative">
            <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-linear-to-b from-(--accent) via-(--accent)/20 to-transparent"></div>
            <div className="prose prose-invert max-w-none mb-8">
              <p className="text-lg leading-relaxed text-(--text)/90 whitespace-pre-wrap font-medium tracking-tight">
                {lesson.content}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lesson.noobDefinition && (
                <div className="p-6 rounded-2xl bg-(--accent)/5 border border-(--accent)/20 relative overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <span className="text-6xl font-black">?</span>
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-(--accent) flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent)"></span>
                    Explain like I'm 5
                  </h4>
                  <p className="text-sm leading-relaxed text-(--text)/80 italic">
                    "{lesson.noobDefinition}"
                  </p>
                </div>
              )}
              {lesson.realWorldExample && (
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
                  <div className="absolute -right-2 -bottom-2 opacity-5 pointer-events-none group-hover:scale-110 transition-transform">
                    <span className="text-6xl font-black">💡</span>
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3 text-(--muted) flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--muted)"></span>
                    Real World Example
                  </h4>
                  <p className="text-sm leading-relaxed text-(--text)/80">
                    {lesson.realWorldExample}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
            {/* Left Column: Media & Key Points */}
            <div className="space-y-8">
              {/* Interactive Visualization */}
              {lesson.vizType && (
                <div className="p-1 rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
                  <InteractiveViz type={lesson.vizType} color={color} />
                </div>
              )}

              {/* Formula if available */}
              {lesson.formula && (
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">∑</div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 text-(--muted)">Mathematical Foundation</h4>
                  <p className="text-2xl font-bold mono tracking-tighter text-white">
                    {lesson.formula}
                  </p>
                </div>
              )}

              {/* Key Points */}
              {lesson.keyPoints && lesson.keyPoints.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-(--accent) flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-(--accent) animate-pulse"></span>
                    Key Takeaways
                  </h3>
                  <div className="grid gap-3">
                    {lesson.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-(--accent)/30 transition-colors flex gap-4 items-start"
                      >
                        <span className="text-(--accent) mt-0.5">✦</span>
                        <span className="text-sm text-(--muted) leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Code & Video */}
            <div className="space-y-8">
              {/* Code Example */}
              {lesson.codeExample && (
                <div className="rounded-3xl bg-[#0a0a0f] border border-white/5 overflow-hidden flex flex-col h-full shadow-2xl">
                  <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/2">
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                      </div>
                      <span className="mono text-[10px] uppercase tracking-widest text-(--muted)">
                        {lesson.codeExample.language} implementation
                      </span>
                    </div>
                    <button
                      onClick={copyCode}
                      className="px-3 py-1 rounded-lg text-[10px] mono transition-all border border-white/10 bg-white/5 hover:bg-white/10"
                      style={{ color }}
                    >
                      {codeCopied ? 'COPIED' : 'COPY'}
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <Suspense fallback={<div className="p-6 mono text-[10px] text-(--muted)">Initializing code viewer...</div>}>
                      <SyntaxHighlighterFull
                        language={lesson.codeExample.language.toLowerCase()}
                        style={vscDarkPlus}
                        customStyle={{
                          margin: 0,
                          padding: '24px',
                          fontSize: '0.875rem',
                          lineHeight: '1.6',
                          background: 'transparent',
                          height: '100%',
                        }}
                        codeTagProps={{
                          style: {
                            fontFamily: 'inherit',
                          }
                        }}
                      >
                        {lesson.codeExample.code}
                      </SyntaxHighlighterFull>
                    </Suspense>
                  </div>
                </div>
              )}

              {/* Video Embed */}
              {lesson.videoUrl && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-(--muted) flex items-center gap-2 px-1">
                    Visionary Brief
                  </h3>
                  <div className="aspect-video rounded-3xl bg-(--bg3) border border-white/5 flex items-center justify-center relative group overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                      </div>
                      <p className="mono text-[10px] uppercase tracking-widest">Load Stream</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="pt-12 border-t border-white/5 flex gap-4">
            <button
              onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
              disabled={activeLesson === 0}
              className="flex-1 py-5 rounded-2xl transition-all disabled:opacity-20 border border-white/5 bg-white/5 hover:bg-white/10 font-bold uppercase tracking-widest text-[11px] mono disabled:cursor-not-allowed"
            >
              PREVIOUS
            </button>
            <button
              onClick={() => setActiveLesson(Math.min(lessons.length - 1, activeLesson + 1))}
              disabled={activeLesson === lessons.length - 1}
              className="flex-1 py-5 rounded-2xl transition-all disabled:opacity-20 bg-(--accent) hover:brightness-110 text-black font-bold uppercase tracking-widest text-[11px] mono shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] disabled:cursor-not-allowed"
            >
              NEXT LESSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
